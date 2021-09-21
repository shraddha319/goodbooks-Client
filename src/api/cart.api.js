import API from './config';

/**
 *
 * @param {MongooseObjectId} productId
 * @param {MongooseObjectId} userId
 */
export function postCart(productId, userId) {
  return API.post(`/users/${userId}/cart`, { products: [productId] });
}

/**
 *
 * @param {MongooseObjectId} userId
 */
export function getCart(userId) {
  return API.get(`/users/${userId}/cart`);
}

/**
 *
 * @param {Object: {
 * type: String,
 * productId: MongooseObjectId,
 * cartId: MongooseObjectId,
 * userId: MongooseObjectId
 * }} param0
 */
export function updateCart({ type, productId, cartId, userId }) {
  return API.post(`/users/${userId}/cart/${cartId}`, {
    type,
    products: [productId],
  });
}

/**
 *
 * @param {MongooseObjectId} cartId
 * @param {MongooseObjectId} userId
 */
export function deleteCart(cartId, userId) {
  return API.delete(`/users/${userId}/cart/${cartId}`);
}
