export const store = {
  state: {
    user: undefined
  },
  setUser(user) {
    this.state.user = user;
  },
  isLogged() {
    return this.state.user ? true : false;
  }
};
