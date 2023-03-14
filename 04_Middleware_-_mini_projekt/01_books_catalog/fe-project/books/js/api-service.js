export class ApiService {
  constructor(endpointUrl) {
    this.endpointUrl = endpointUrl;
  }

  booksGetRequest() {
    /* ADD CODE HERE */
    return fetch(/* ADD CODE HERE */).then((response) => response.json());
  }

  booksDeleteRequest(id) {
    /* ADD CODE HERE */

    return fetch(/* ADD CODE HERE */).then((response) => response.json());
  }

  booksPutRequest(book) {
    /* ADD CODE HERE */
    return fetch(/* ADD CODE HERE */).then((response) => response.json());
  }

  booksPostRequest(book) {
    /* ADD CODE HERE */

    return fetch(/* ADD CODE HERE */).then((response) => response.json());
  }
}
