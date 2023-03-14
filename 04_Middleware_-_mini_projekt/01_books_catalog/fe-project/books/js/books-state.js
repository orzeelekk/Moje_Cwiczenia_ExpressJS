function prepareBookItems(bookList = []) {
    return bookList.reduce((acc, current) => ({
        ...acc,
        [current.id]: { book: current, inEditMode: false }
    }), {});
}

function prepareState(bookList = []) {
    return {
        bookItems: prepareBookItems(bookList),
        isAddBookModalVisible: false,
    }
}

export class BooksState {
    state = {
        isAddBookModalVisible: false,
        bookItems: {},
    };
    onStateChangeCallback = () => {};

    constructor(apiService) {
        this.apiService = apiService;
    }

    registerOnStateChange(callback) {
        this.onStateChangeCallback = callback;
        return this;
    }

    startEdittingBook(id) {
        /* Resets bookItems to its original state (isEditMode = false for all entries) */
        const normalizedBookItems = prepareBookItems(Object.values(this.state.bookItems).map((bookItem) => bookItem.book));
        normalizedBookItems[id].inEditMode = true;

        this.state = {
            ...this.state,
            bookItems: normalizedBookItems,
        }
        this.onStateChangeCallback.call(null, this.state);
    }

    cancelEdittingBook(id) {
        /* Resets bookItems to its original state (isEditMode = false for all entries) */
        const normalizedBookItems = prepareBookItems(Object.values(this.state.bookItems).map((bookItem) => bookItem.book));
        normalizedBookItems[id].inEditMode = false;

        this.state = {
            ...this.state,
            bookItems: normalizedBookItems,
        }
        this.onStateChangeCallback.call(null, this.state);
    }

    addNewBook() {
        this.state = {
            ...this.state,
            isAddBookModalVisible: true,
        };
        this.onStateChangeCallback.call(null, this.state);
    }

    cancelAddingNewBook() {
        this.state = {
            ...this.state,
            isAddBookModalVisible: false,
        }

        this.onStateChangeCallback.call(null, this.state);
    }
    
    fetchBooks() {
        this.apiService.booksGetRequest()
            .then(prepareBookItems)
            .then((bookItems) => {
                this.state = {
                    ...this.state,
                    bookItems,
                };
                this.onStateChangeCallback.call(null, this.state);
            })
            .catch(() => {});
    }

    saveUpdatedBook(book) {
        this.apiService.booksPutRequest(book)
            .then(prepareBookItems)
            .then((bookItems) => {
                this.state = {
                    ...this.state,
                    bookItems,
                };
                this.onStateChangeCallback.call(null, this.state);
            })
            .catch(() => {});
    }

    deleteBook(id) {
        this.apiService.booksDeleteRequest(id)
            .then(prepareBookItems)
            .then((bookItems) => {
                this.state = {
                    ...this.state,
                    bookItems,
                };
                this.onStateChangeCallback.call(null, this.state);
            })
            .catch(() => {});
    }

    postNewBook(book) {
        this.apiService.booksPostRequest(book)
            .then(prepareBookItems)
            .then((bookItems) => {
                this.state = {
                    ...this.state,
                    bookItems,
                    isAddBookModalVisible: false,
                };
                this.onStateChangeCallback.call(null, this.state);
            })
            .catch(() => {});
    }
}
