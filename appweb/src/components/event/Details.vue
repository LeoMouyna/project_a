<template>
  <v-card color="grey lighten-4" min-width="400px" flat>
    <v-toolbar :color="event.color" dark v-if="event">
      <v-toolbar-title v-html="event.name"></v-toolbar-title>
    </v-toolbar>
    <v-card-text v-if="event.meetingPlace" class="dense">
      <v-list-item class="grow">
        <v-list-item-avatar>
          <v-icon left>mdi-map</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          {{ event.meetingPlace.name }}
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-subtitle class="pb-0 dense">Supervisor</v-card-subtitle>
    <v-card-text class="text--primary dense">
      <supervisor-info :user="event.supervisor" />
    </v-card-text>
    <v-card-subtitle class="pb-0 dense">Description</v-card-subtitle>
    <v-card-text class="text--primary dense">
      <div class="event-card-content description">
        {{ event.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="$emit(`detail-close`, event)">
        Cancel
      </v-btn>
      <v-row align="center" justify="end">
        <v-btn text color="error" @click="$emit(`detail-unassign`, event)">
          Unassign
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import SupervisorInfo from "../user/ShortInfo";
export default {
  components: {
    SupervisorInfo
  },
  props: {
    event: Object
  }
};
</script>

<style></style>
