import { html, render } from './../node_modules/lit-html/lit-html.js';
import { repeat } from './../node_modules/lit-html/directives/repeat.js';
import { classMap } from './../node_modules/lit-html/directives/class-map.js';

import { BooksState } from './books-state.js';
import { ApiService } from './api-service.js';
import { ModalService } from './modal-service.js';

// APPLICATION BOOTSTRAP
const appElement = document.querySelector('#app');
const modalElement = document.querySelector('#modal-placeholder');

const modalService = new ModalService(modalElement);
const booksState = new BooksState(
  // -----------------------------------------------------------------------
  new ApiService('http://localhost:3000'),
  // -----------------------------------------------------------------------
).registerOnStateChange(({ bookItems, isAddBookModalVisible }) => {
  render(bookListTemlpate(bookItems), appElement);
  isAddBookModalVisible
    ? modalService.showModal(addNewBookTemplate())
    : modalService.closeModal();
});
booksState.fetchBooks();

// MAIN TEMPLATE (attached <div id="app"> element);
const bookListTemlpate = (bookList) => html`
  <main>
    <header>
      <h1 class="section-header">Books</h1>
      <button
        class="new-book-btn"
        @click=${() => booksState.addNewBook()}
        title="Add new book"
      >
        +
      </button>
    </header>
    <ul class="book-items">
      ${repeat(
        Object.values(bookList),
        (bookItem) => bookItem.book.id,
        (bookItem) => html`
          <li class=${classMap({ highlight: bookItem.inEditMode })}>
            ${bookTemplate(bookItem)}
          </li>
        `,
      )}
    </ul>
  </main>
`;

const bookTemplate = ({ book, inEditMode = false }) => html`
  ${inEditMode ? editBookTemplate(book) : displayBookTemplate(book)}
`;

const displayBookTemplate = ({ id, author, title, year }) => html`
  <div id=${id} class="book-item">
    <section class="main">
      <p class="book-title">${title}</p>
      <small class="book-additional-info"
        >by <span class="book-author">${author}</span>
        <span class="book-release-year">(${year})</span></small
      >
    </section>
    <section class="book-actions">
      <button
        class="button button-secondary"
        @click=${() => booksState.startEdittingBook(id)}
      >
        Edit
      </button>
      <button
        class="button button-secondary"
        @click=${() => booksState.deleteBook(id)}
      >
        Delete
      </button>
    </section>
  </div>
`;

const editBookTemplate = (book) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedBook = {
      id: book.id,
      title: formData.get('title'),
      author: formData.get('author'),
      year: formData.get('year'),
    };
    booksState.saveUpdatedBook(updatedBook);
  };

  const onCancel = () => {
    booksState.cancelEdittingBook(book.id);
  };

  return html`
    <div id=${book.id} class="book-item book-item-highlight">
      <form class="book-edit-form" @submit=${onSubmit}>
        ${bookInputsTemplate(book)}
        <section class="book-actions">
          <button class="button button-primary" type="submit">Save</button>
          <button
            class="button button-secondary"
            type="button"
            @click=${onCancel}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  `;
};

const addNewBookTemplate = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBook = {
      id: Math.floor(Math.random() * 1e8).toString(),
      title: formData.get('title'),
      author: formData.get('author'),
      year: formData.get('year'),
    };
    booksState.postNewBook(newBook);
  };

  const onCancel = () => {
    booksState.cancelAddingNewBook();
  };

  return html`
    <div class="book-add-wrapper">
      <h1>Add new Book...</h1>
      <p class="book-modal-instructions">
        Fill in basic information about the book you are trying to add.
      </p>
      <form class="book-add-form" @submit=${onSubmit}>
        ${bookInputsTemplate()}
        <section class="book-add-actions">
          <button class="button button-primary" type="submit">Add book</button>
          <button
            class="button button-secondary"
            type="button"
            @click=${onCancel}
          >
            Cancel
          </button>
        </section>
      </form>
    </div>
  `;
};

const bookInputsTemplate = ({
  title = '',
  author = '',
  year = '',
} = {}) => html`
  <div class="book-form-inputs">
    <label class="book-input-row">
      <span class="book-input-label-text">Title</span
      ><input
        placeholder="Book title"
        required
        type="text"
        name="title"
        .value=${title}
      />
    </label>
    <label class="book-input-row">
      <span class="book-input-label-text">by</span
      ><input
        placeholder="Book author"
        required
        type="text"
        name="author"
        .value=${author}
      />
    </label>
    <label class="book-input-row">
      <span class="book-input-label-text">in</span
      ><input
        placeholder="Book release year"
        required
        type="number"
        name="year"
        .value=${year}
      />
    </label>
  </div>
`;
