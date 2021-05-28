import { useFeedback, useProducts } from "../../contexts/index";
import "./Toast.css";
import { useEffect } from "react";

export default function Toast() {
  const { feedback, dispatchFeedback } = useFeedback();
  const {
    toast: { active, type, productId, body },
  } = feedback;

  const {
    products: { productList },
  } = useProducts();
  const product = productList.find((product) => product._id === productId);

  const typeIconMap = {
    info: "fa-info-circle",
    warning: "fa-exclamation-triangle",
    error: "fa-skull-crossbones",
    success: "fa-check-circle",
  };

  useEffect(() => {
    if (feedback.toast.active) {
      const timerID = setTimeout(() => {
        dispatchFeedback({ type: "HIDE_TOAST" });
      }, 5000);

      return () => {
        clearTimeout(timerID);
      };
    }
  }, [feedback]);

  return (
    <div
      class={`toast ${active ? "toast--show" : "toast--hide"}
    toast--${type}`}
    >
      <div class="toast__layout">
        <span class="toast__icon fa--sm">
          <i class={`fas ${typeIconMap[type]}`}></i>
        </span>
        <span class="toast__text">
          {body.replace("PRODUCT_NAME", product.name)}
        </span>
        <button
          onClick={() => dispatchFeedback({ type: "HIDE_TOAST" })}
          class="toast__close btn"
        >
          <span className="fa--xs">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
}
