export const userMixin = {
  methods: {
    displayUserName(user) {
      return `${user.firstname} (${user.surname}) ${user.lastname}`;
    }
  }
};
