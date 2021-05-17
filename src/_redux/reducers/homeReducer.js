const INCREMENT = "INCREMENT";
const initialState = {
  home: "Home",
  data: {},
  currentValue: 0,
};
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, data: { a: 20 } };
    case INCREMENT:
      return { ...state, currentValue: action.data };
    default:
      return state;
  }
};
