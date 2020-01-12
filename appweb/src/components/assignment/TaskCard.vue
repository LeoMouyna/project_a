<template>
  <div class="a-card">
    <div class="banner" :style="{ backgroundColor: instance.displayedColor }" />
    <div class="a-card-content">
      <p>{{ instance.name }}</p>
      <p>{{ displayTimeSlot(instance) }}</p>
      <p><i class="fas fa-map-marker"></i> {{ instance.meetingPlace.name }}</p>
      <b-dropdown
        hoverable
        aria-role="list"
        v-if="possibleTeamAssignment.length > 1"
        v-model="selectedTeam"
        @input="$emit('assign', { user: user, task: instance, as: $event })"
      >
        <button class="button is-success" slot="trigger">
          <span>Assigne as ...</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item
          v-for="team in possibleTeamAssignment"
          :key="team.id"
          aria-role="listitem"
          :value="team"
          ><team-label :team="team"
        /></b-dropdown-item>
      </b-dropdown>
      <b-button
        v-else-if="possibleTeamAssignment.length > 0"
        type="is-success"
        @click="
          $emit('assign', {
            user: user,
            task: instance,
            as: possibleTeamAssignment[0]
          })
        "
        >Assign as {{ possibleTeamAssignment[0].name }}</b-button
      >
    </div>
  </div>
</template>

<script>
import { eventMixin } from "../../mixins/eventMixin";
import TeamLabel from "../team/Label";
export default {
  components: {
    TeamLabel
  },
  mixins: [eventMixin],
  data() {
    return {
      open: true,
      selectedTeam: null
    };
  },
  computed: {
    possibleTeamAssignment() {
      // Find all teams that my user can be assigned as.
      return this.instance.requiredUsers
        .map(required => {
          if ("number" in required) {
            if (
              required.assigned.length < required.number &&
              this.user.teams.map(team => team.id).includes(required.team.id)
            ) {
              return required.team;
            } else return undefined;
          } else return undefined;
        })
        .filter(team => team != undefined);
    }
  },
  props: {
    instance: Object,
    user: Object
  }
};
</script>

<style scoped>
.vertical {
  writing-mode: vertical-lr;
  text-orientation: upright;
}
.a-card {
  margin: auto auto 4px auto;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-color: #ffffff;
  display: flex;
  flex-direction: row;
}
.a-card .banner {
  border-radius: 4px;
  height: inherit;
  min-height: 30px;
  max-width: 30px;
  width: 100%;
}
.a-card-content p,
button {
  margin-left: 4px;
  margin-bottom: 2px;
}
</style>
