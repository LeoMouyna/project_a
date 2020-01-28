<template>
  <v-app v-if="store.isLogged()">
    <AppBar></AppBar>
    <NavigationMenu></NavigationMenu>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
  <v-app v-else>
    <NavigationMenu></NavigationMenu>
    <home />
    <Footer />
  </v-app>
</template>

<script>
import NavigationMenu from "./components/NavigationMenu";
import { store } from "./store";
import Home from "./views/Home";
import Footer from "./components/Footer";
import AppBar from "./components/AppBar";
export default {
  data() {
    return {
      store: store
    };
  },
  name: "App",
  components: { AppBar, Footer, NavigationMenu, Home }
};
</script>
