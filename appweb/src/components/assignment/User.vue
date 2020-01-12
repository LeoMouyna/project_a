<template>
  <section>
    <user-list @select="setUser" />
    <calendar
      v-if="user"
      :name="displayUserName(user)"
      :object="user"
      :events="generateEventsAssignment(assignments)"
    />
  </section>
</template>

<script>
import UserList from "../user/UserList";
import Calendar from "./Calendar";
import { HTTP } from "../../services/httpService";
import { userMixin } from "../../mixins/userMixin";
import { eventMixin } from "../../mixins/eventMixin";
export default {
  components: {
    Calendar,
    UserList
  },
  data() {
    return {
      user: null,
      assignments: []
    };
  },
  methods: {
    async setUser(user) {
      this.assignments = await HTTP.get(`assignments/${user.assignments}`).then(
        async response => {
          let taskInstances = response.data.taskInstances;
          return Promise.all(
            taskInstances.map(id =>
              HTTP.get(`taskInstances/${id}`).then(resp => {
                return resp.data;
              })
            )
          );
        }
      );
      this.user = user;
    }
  },
  mixins: [userMixin, eventMixin]
};
</script>

<style></style>
