import API from './config';

/**
 *
 * @param {MongooseObjectId} productId
 * @param {MongooseObjectId} userId
 */
export function postWishlist(productId, userId) {
  return API.post(`/users/${userId}/wishlist`, { products: [productId] });
}

/**
 *
 * @param {MongooseObjectId} userId
 */
export function getWishlist(userId) {
  return API.get(`/users/${userId}/wishlist`);
}

/**
 *
 * @param {Object: {
 * type: String,
 * productId: MongooseObjectId,
 * wishlistId: MongooseObjectId,
 * userId: MongooseObjectId
 * }} param0
 */
export function updateWishlist({ type, productId, wishlistId, userId }) {
  return API.post(`/users/${userId}/wishlist/${wishlistId}`, {
    type,
    products: [productId],
  });
}

/**
 *
 * @param {MongooseObjectId} wishlistId
 * @param {MongooseObjectId} userId
 */
export function deleteWishlist(wishlistId, userId) {
  return API.delete(`/users/${userId}/wishlist/${wishlistId}`);
}
