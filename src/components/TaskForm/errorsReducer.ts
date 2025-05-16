export type ErrorsState = Record<string, string>;

export type ErrorsAction =
  | { type: "SET_ERROR"; payload: { field: string; message: string } }
  | { type: "RESET_ERRORS" };

export const errorsReducer = (
  state: ErrorsState,
  action: ErrorsAction
): ErrorsState => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, [action.payload.field]: action.payload.message };
    case "RESET_ERRORS":
      return {};
    default:
      return state;
  }
};
