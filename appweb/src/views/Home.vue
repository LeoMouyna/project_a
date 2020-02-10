<template>
  <v-container>
    <v-card :min-width="800">
      <b-tabs
        v-model="activeTab"
        position="is-centered"
        expanded
        class="block"
        size="is-medium"
      >
        <b-tab-item label="Login" icon="login">
          <login />
        </b-tab-item>
        <b-tab-item label="Register" icon="account-plus">
          <register />
        </b-tab-item>
      </b-tabs>
    </v-card>
  </v-container>
</template>

<script>
import Login from "../components/user/Login";
import Register from "../components/user/Register";
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      activeTab: 0
    };
  }
};
</script>

<style>
nav.tabs > ul {
  padding: 0;
}
</style>
