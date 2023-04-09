export const storeSession = (jwt: string) => {
  window.localStorage.setItem("feedback-jwt", jwt);
};

export const getSession = () => {
  return window.localStorage.getItem("feedback-jwt");
};

export const removeSession = () => {
  window.localStorage.removeItem("feedback-jwt");
};
