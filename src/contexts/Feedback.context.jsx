import { createContext, useReducer, useContext } from "react";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const initialFeedback = {
    loader: false,
    toast: {
      productId: "",
      body: "",
      type: "",
      active: false,
    },
  };
  const [feedback, dispatchFeedback] = useReducer(
    feedbackReducer,
    initialFeedback
  );

  function feedbackReducer(feedback, { type, payload }) {
    switch (type) {
      case "SHOW_LOADER":
        return { ...feedback, loader: true };

      case "HIDE_LOADER":
        return { ...feedback, loader: false };

      case "TRIGGER_TOAST":
        return { ...feedback, toast: { active: true, ...payload } };

      case "HIDE_TOAST":
        return { ...feedback, toast: { active: false } };

      default:
        return feedback;
    }
  }

  return (
    <FeedbackContext.Provider value={{ feedback, dispatchFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  return useContext(FeedbackContext);
}
