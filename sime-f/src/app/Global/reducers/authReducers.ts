export interface Action{
  type: string;
  payload: any;
}

const isAuthenticated = { loggedIn: false };

export const authReducer = (state = isAuthenticated, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload, loggedIn: true};
    case 'LOGOUT':
      sessionStorage.removeItem('user');
      return { loggedIn: false};
    default:
      return state;
  }
};

