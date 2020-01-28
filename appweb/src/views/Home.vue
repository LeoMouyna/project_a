<template>
  <v-container>
    <v-card :min-width="400">
      <b-tabs
        v-model="activeTab"
        position="is-centered"
        expanded
        class="block"
        size="is-medium"
      >
        <b-tab-item label="Login" icon="login">
          <login />
          <v-divider>Or</v-divider>
          <b-button size="is-large" type="is-info" expanded disabled
            ><v-img
              :contain="false"
              :aspect-ratio="16 / 9"
              :height="36"
              src="@/assets/logo.png"
              alt="24h logo"
            ></v-img
            >pass24</b-button
          >
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
