<template>
  <section>
    <b-field label="Email" label-position="on-border" custom-class="is-medium">
      <b-input
        size="is-medium"
        placeholder="Email"
        type="email"
        icon="email"
        v-model="email"
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
        v-model="password"
        required
      >
      </b-input>
    </b-field>
    <b-button type="is-primary" expanded size="is-medium">Login</b-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: undefined,
      password: undefined
    };
  }
};
</script>

<style></style>
