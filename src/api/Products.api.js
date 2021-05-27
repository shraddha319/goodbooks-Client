import axios from "axios";

export async function getProducts(dispatchProducts, dispatchFeedback) {
    dispatchFeedback({
        type: "SHOW_LOADER"
    })
    try {
        const {
            data: {
                data
            },
            status
        } = await axios.get(
            "https://E-Commerce-backend.sshraddha.repl.co/products"
        );
        if (status === 200) {
            localStorage.setItem("productList", JSON.stringify(data));
            dispatchProducts({
                type: "INIT_PRODUCTS",
                payload: {
                    productList: data
                },
            });
        }

    } catch (error) {
        console.log("Error fetching products ", error.message);
    } finally {
        dispatchFeedback({
            type: "HIDE_LOADER"
        })
    }
}