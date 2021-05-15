import axios from "axios";

export async function addToCart(productId, userData, dispatchUserData) {
    try {
        const endPointURI = userData && userData.cart._id ?
            `https://E-Commerce-backend.sshraddha.repl.co/cart/${userData.cart._id}` :
            "https://E-Commerce-backend.sshraddha.repl.co/cart/";

        const {
            status,
            data: {
                data
            }
        } = await axios.post(endPointURI, {
            productId
        });
        if (status != 201) throw Error("Post request failed");
        dispatchUserData({
            type: "ADD_TO_CART",
            payload: {
                cart: {
                    _id: data._id,
                    cartItems: data.cartItems
                }
            }
        });
    } catch (error) {
        console.error("Post request failed: ", error.message);
    }
}