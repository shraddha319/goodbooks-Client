import { createContext, useReducer, useContext } from "react";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const initialFeedback = {
    loader: false,
    toast: {
      message: "",
      type: "",
      active: false,
    },
  };
  const [feedback, dispatchFeedback] = useReducer(
    feedbackReducer,
    initialFeedback
  );

  function feedbackReducer(feedback, { type }) {
    switch (type) {
      case "SHOW_LOADER":
        return { ...feedback, loader: true };

      case "HIDE_LOADER":
        return { ...feedback, loader: false };

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
