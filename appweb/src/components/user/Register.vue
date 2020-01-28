<template>
  <section>
    <b-field label="Email" label-position="on-border" custom-class="is-medium">
      <b-input
        size="is-medium"
        placeholder="Email"
        type="email"
        icon="email"
        v-model="user.email"
        required
      >
      </b-input>
    </b-field>
    <b-field
      label="Password"
      label-position="on-border"
      custom-class="is-medium"
    >
      <b-input
        size="is-medium"
        type="password"
        placeholder="Password"
        icon="lock"
        minlength="10"
        password-reveal
        v-model="user.password"
        required
      >
      </b-input>
    </b-field>
    <b-field
      label="Password checker"
      label-position="on-border"
      custom-class="is-medium"
    >
      <b-input
        size="is-medium"
        type="password"
        placeholder="Retype your password"
        icon="lock"
        minlength="10"
        password-reveal
        v-model="passwordChecker"
        required
      >
      </b-input>
    </b-field>
    <b-button type="is-primary" expanded size="is-medium">Register</b-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: undefined,
        surname: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined
      },
      passwordChecker: undefined
    };
  }
};
</script>

<style></style>
