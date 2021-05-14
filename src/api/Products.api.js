import axios from "axios";

export async function getProducts(dispatchProducts, setEnableLoader) {
    setEnableLoader(true);
    try {
        const response = await axios.get(
            "https://E-Commerce-backend.sshraddha.repl.co/products"
        );
        if (response.status === 200)
            dispatchProducts({
                type: "INIT_PRODUCTS",
                payload: {
                    productList: response.data.data
                },
            });
    } catch (error) {
        console.log("Error fetching products ", error.message);
    } finally {
        setEnableLoader(false);
    }
}