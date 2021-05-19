import axios from "axios";

export async function updateQuantity(updateType, cartItemId, userData, dispatchUserData) {
    try {
        const endPointURI = `https://E-Commerce-backend.sshraddha.repl.co/cart/${userData.cart._id}/${cartItemId}`;

        const {
            status,
            data: {
                data
            }
        } = await axios.post(endPointURI, {
            quantityUpdate: updateType
        });
        if (status !== 200) throw Error("Quantity update failed");
        dispatchUserData({
            type: "UPDATE_QUANTITY",
            payload: {
                _id: data._id,
                cartItemId,
                updateType
            }
        });
    } catch (error) {
        console.log("Quantity update request failed: ", error);
    }
}


export async function removeFromCart(cartItemId, userData, dispatchUserData) {
    try {
        const [endPointURI, type] =
        userData && userData.cart.cartItems.length === 1 ? [
            `https://E-Commerce-backend.sshraddha.repl.co/cart/${userData.cart._id}`,
            "REMOVE_CART",
        ] : [
            `https://E-Commerce-backend.sshraddha.repl.co/cart/${userData.cart._id}/${cartItemId}`,
            "REMOVE_FROM_CART",
        ];
        const {
            status,
            data: {
                data
            },
        } = await axios.delete(endPointURI);
        if (status !== 200) throw Error("Delete request failed");
        dispatchUserData({
            type,
            payload: {
                _id: data._id,
                cartItemId,
            },
        });
    } catch (error) {
        console.log("Delete request failed: ", error);
    }
}

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
        if (status !== 201) throw Error("Post request failed");
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