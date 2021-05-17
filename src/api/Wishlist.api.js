import axios from "axios";

export async function addToWishlist(productId, userData, dispatchUserData) {
    try {
        const endPointURI = userData && userData.wishlist._id ?
            `https://E-Commerce-backend.sshraddha.repl.co/wishlist/${userData.wishlist._id}` :
            "https://E-Commerce-backend.sshraddha.repl.co/wishlist/";

        const {
            status,
            data: {
                data
            }
        } = await axios.post(endPointURI, {
            productId
        });
        if (status !== 201) throw Error("Post request failed");
        dispatchUserData({
            type: "ADD_TO_WISHLIST",
            payload: {
                wishlist: {
                    _id: data._id,
                    wishlistItems: data.wishlistItems
                }
            }
        });
    } catch (error) {
        console.error("Post request failed: ", error.message);
    }
}