<template>
  <section class="calendar-assignment">
    <h2>Planning for {{ name }}</h2>
    <b-field grouped>
      <b-field label="From">
        <b-datepicker
          placeholder="Select a date"
          icon="calendar-today"
          v-model="from"
        >
        </b-datepicker>
      </b-field>
      <b-field label="To">
        <b-datepicker
          placeholder="Select a date"
          :min-date="from"
          icon="calendar-today"
          v-model="to"
        >
        </b-datepicker>
      </b-field>
      <b-field label="# of days">
        <b-numberinput
          controls-position="compact"
          controls-rounded
          :min="0"
          :max="maxDays"
          v-model="days"
        >
        </b-numberinput>
      </b-field>
      <b-field label="Zoom">
        <b-field grouped>
          <b-button icon-right="plus" @click="hourHeight = hourHeight * 2" />
          <b-button
            icon-right="minus"
            @click="hourHeight = Math.max(hourHeight / 2, 25)"
            :disabled="hourHeight <= 25"
          />
        </b-field>
      </b-field>
    </b-field>
    <v-row>
      <v-col sm="12" lg="9" class="mb-4 controls">
        <v-sheet height="690">
          <v-calendar
            ref="calendar"
            :start="formatDate(from, false)"
            :end="formatDate(to, false)"
            :events="calendarEvents"
            :maxDays="days"
            :short-intervals="false"
            :event-color="getEventColor"
            color="primary"
            type="custom-daily"
            :interval-height="hourHeight"
            @click:time="setClickedInterval"
            @click:event="showEvent"
          >
            <template v-slot:interval="{ hour, date }">
              <div
                draggable="true"
                @dragstart="setInterval({ date, hour, field: 'start' })"
                @dragover="setInterval({ date, hour, field: 'end' })"
                @dragend="checkInterval"
                class="hour-interval"
              ></div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
      <v-col sm="12" lg="3" class="mb-4 controls">
        <aside-user
          v-if="type == 'user'"
          :interval="interval"
          :interval-available="checkIntervalAvailable"
          :available-tasks="availableTasks"
          :user="object"
          @assign:rest="setToRest"
          @assign:task="log"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import "../../mixins/dateMixin";
import AsideUser from "./AsideUser";
import { eventMixin } from "../../mixins/eventMixin";
import { HTTP } from "../../services/httpService";
export default {
  mixins: [eventMixin],
  components: {
    AsideUser
  },
  data() {
    return {
      from: new Date(),
      maxDays: 15,
      days: 5,
      to: null,
      interval: {
        start: new Date(),
        end: new Date()
      },
      hourHeight: 25,
      taskInstances: []
    };
  },
  computed: {
    calendarEvents() {
      const event = [
        this.generateEvent(
          this.interval.start,
          this.interval.end,
          "blue lighten-4",
          "Time slot",
          "HR time slot selected"
        )
      ];
      return this.events.concat(event);
    },
    checkIntervalAvailable() {
      const filters = this.events
        .map(event => {
          return { start: new Date(event.start), end: new Date(event.end) };
        })
        .filter(event => {
          return (
            event.end > this.interval.start && event.start < this.interval.end
          );
        });
      return filters.length == 0;
    },
    availableTasks() {
      // taskInstances during the time slot, with at least one requiredUser not full matching with user teams, where the selected user is not assigned yet
      const start = this.interval.start;
      const end = this.interval.end;
      const userId = this.object.id;
      const userTeamIds = this.object.teams.map(team => team.id);
      return this.taskInstances.filter(
        instance =>
          new Date(instance.start) >= start &&
          new Date(instance.end) <= end &&
          this.userNeeded(instance, userTeamIds, userId) &&
          !this.assignedUsersId(instance).includes(userId)
      );
    }
  },
  methods: {
    assignedUsersId(instance) {
      const list = instance.requiredUsers.flatMap(required =>
        required.assigned.map(user => user.id)
      );
      return list;
    },
    userNeeded(instance, userTeamIds, userId) {
      if ("requiredUsers" in instance) {
        const test = instance.requiredUsers
          .map(required => {
            // Is my user needed but not assigned ?
            if ("id" in required) {
              return (
                required.id == userId &&
                !this.assignedUsersId(instance).includes(userId)
              );
            }
            // Is one of my user teams match with not fully assigned required team members
            else if ("number" in required) {
              return (
                required.assigned.length < required.number &&
                userTeamIds.includes(required.team.id)
              );
            } else return false;
          })
          .includes(true);
        return test;
      } else return false;
    },
    setClickedInterval({ date, hour }) {
      this.setInterval({ date, hour, field: "start" });
      this.setInterval({ date, hour: hour + 1, field: "end" });
    },
    setInterval({ date, hour, field }) {
      const value = new Date(`${date} ${hour > 9 ? hour : "0" + hour}:00`);
      this.$set(this.interval, field, value);
    },
    setToRest(interval) {
      //TODO: Send updates to back-end
      this.events.push(
        this.generateEvent(
          interval.start,
          interval.end,
          "red accent-4",
          "Rest time",
          "Rest for some time"
        )
      );
    },
    showEvent({ nativeEvent, event }) {
      console.log(nativeEvent);
      console.log(event);
    },
    log(m) {
      console.log(m);
    },
    checkInterval() {
      if (this.interval.start > this.interval.end) {
        this.revertInterval(this.interval, this.interval);
      }
    },
    revertInterval(obj, { start, end }) {
      this.$set(obj, "start", end);
      this.$set(obj, "end", start);
    }
  },
  mounted() {
    this.to = this.from.addDays(this.days);
    HTTP.get(`taskInstances`).then(resp => {
      this.taskInstances = resp.data;
    });
  },
  props: {
    name: String,
    object: Object,
    type: { type: String, default: "user" },
    events: { type: Array, default: () => [] }
  }
};
</script>

<style>
.hour-interval {
  width: 100%;
  height: 100%;
}
</style>
