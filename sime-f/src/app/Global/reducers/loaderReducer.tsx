interface LoaderState {
  isLoading: boolean;
}

type LoaderAction = { type: "SHOW_LOADER" } | { type: "HIDE_LOADER" };

const initialState: LoaderState = {
  isLoading: false,
};


export const loaderReducer = (state: LoaderState = initialState, action: LoaderAction) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return { ...state, isLoading: true };
    case "HIDE_LOADER":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
