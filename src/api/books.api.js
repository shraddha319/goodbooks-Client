import API from './config';

export function getBooks() {
  return API.get('/products');
}

/**
 *
 * @param {MongooseObjectId} bookId
 */
export function getBook(bookId) {
  return API.get(`/products/${bookId}`);
}
