import axios from "axios";

export async function removeFromWishlist(
  wishlistItemId,
  userData,
  dispatchUserData
) {
  try {
    const [endPointURI, type] =
      userData && userData.wishlist.wishlistItems.length === 1
        ? [
            `https://E-Commerce-backend.sshraddha.repl.co/wishlist/${userData.wishlist._id}`,
            "REMOVE_WISHLIST",
          ]
        : [
            `https://E-Commerce-backend.sshraddha.repl.co/wishlist/${userData.wishlist._id}/${wishlistItemId}`,
            "REMOVE_FROM_WISHLIST",
          ];
    const {
      status,
      data: { data },
    } = await axios.delete(endPointURI);
    if (status !== 200) throw Error("Delete request failed");
    dispatchUserData({
      type,
      payload: {
        _id: data._id,
        wishlistItemId,
      },
    });
  } catch (error) {
    console.log("Delete request failed: ", error);
  }
}

export async function addToWishlist(productId, userData, dispatchUserData) {
  try {
    const endPointURI =
      userData && userData.wishlist._id
        ? `https://E-Commerce-backend.sshraddha.repl.co/wishlist/${userData.wishlist._id}`
        : "https://E-Commerce-backend.sshraddha.repl.co/wishlist/";

    const {
      status,
      data: { data },
    } = await axios.post(endPointURI, {
      productId,
    });
    if (status !== 201) throw Error("Post request failed");
    dispatchUserData({
      type: "ADD_TO_WISHLIST",
      payload: {
        wishlist: {
          _id: data._id,
          wishlistItems: data.wishlistItems,
        },
      },
    });
  } catch (error) {
    console.error("Post request failed: ", error.message);
  }
}
