<template>
  <section>
    <user-list @select="setUser" />
    <calendar
      v-if="user"
      :name="displayUserName(user)"
      :object="user"
      :events="generateEventsAssignment(assignments)"
      @calendar-click:unassign="updateAssignments"
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
    },
    updateAssignments(taskInstance) {
      const assignmentIndex = this.assignments
        .map(assign => assign.id)
        .indexOf(taskInstance.id);
      this.assignments.splice(assignmentIndex, 1);
      console.log("Should send to api a PUSH with: ", taskInstance);
    }
  },
  mixins: [userMixin, eventMixin]
};
</script>

<style></style>
