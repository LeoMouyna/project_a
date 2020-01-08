<template>
  <section>
    <user-list @select="setUser" />
    <calendar v-if="user" :name="displayUserName(user)" />
  </section>
</template>

<script>
import UserList from "../user/UserList";
import Calendar from "./Calendar";
import { userMixin } from "../../mixins/userMixin";
export default {
  components: {
    Calendar,
    UserList
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    setUser(user) {
      this.user = user;
    }
  },
  mixins: [userMixin]
};
</script>

<style></style>
