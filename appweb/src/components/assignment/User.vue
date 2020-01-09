<template>
  <section>
    <user-list @select="setUser" />
    <calendar
      v-if="user"
      :name="displayUserName(user)"
      :object="user"
      :events="generateEventsFromUser(user)"
    />
  </section>
</template>

<script>
import UserList from "../user/UserList";
import Calendar from "./Calendar";
import { userMixin } from "../../mixins/userMixin";
import { eventMixin } from "../../mixins/eventMixin";
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
  mixins: [userMixin, eventMixin]
};
</script>

<style></style>
