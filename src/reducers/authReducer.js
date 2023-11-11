export function authReducer(state, action) {
  switch (action.type) {
    case "USERNAME":
      return { ...state, user: { ...state.user, username: action.payload } };
    case "EMAIL":
      return { ...state, user: { ...state.user, email: action.payload } };
    // case "PASSWORD":
    //   return { ...state, user: { ...state.user, password: action.payload } };
    // case "IS_LOGGED_IN":
    //   return { ...state, isLoggedIn: action.payload };
    // case "ERROR":
    //   return { ...state, error: action.payload };
  }
}
