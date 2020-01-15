<template>
  <section class="calendar-assignment">
    <h2>Planning for {{ name }}</h2>
    <b-field grouped>
      <b-field label="From">
        <b-datepicker
          placeholder="Select a date"
          icon="calendar-today"
          v-model="from"
        />
      </b-field>
      <b-field label="To">
        <b-datepicker
          placeholder="Select a date"
          :min-date="from"
          icon="calendar-today"
          v-model="to"
        />
      </b-field>
      <b-field label="# of days">
        <b-numberinput
          controls-position="compact"
          controls-rounded
          :min="0"
          :max="maxDays"
          v-model="days"
        />
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
          v-if="type == 'user' && interval.start && interval.end"
          :interval="interval"
          :interval-available="checkIntervalAvailable"
          :available-tasks="availableTasks"
          :user="object"
          @assign:rest="setToRest"
          @assign:task="sendAssignment"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import "../../mixins/dateMixin";
import AsideUser from "./AsideUser";
import { eventMixin } from "../../mixins/eventMixin";
import { assignMixin } from "../../mixins/assignMixin";
import { HTTP } from "../../services/httpService";
export default {
  mixins: [eventMixin, assignMixin],
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
        start: undefined,
        end: undefined
      },
      hourHeight: 25,
      taskInstances: []
    };
  },
  computed: {
    calendarEvents() {
      if (this.interval.start && this.interval.end) {
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
      } else return this.events;
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
    setClickedInterval({ date, hour }) {
      this.setInterval({ date, hour, field: "start" });
      this.setInterval({ date, hour: hour + 1, field: "end" });
    },
    setInterval({ date, hour, field }) {
      const value = this.generateDate(date, hour);
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
    sendAssignment({ user, task, as }) {
      const ret = this.assign(user, task, as);
      console.log(ret);
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
