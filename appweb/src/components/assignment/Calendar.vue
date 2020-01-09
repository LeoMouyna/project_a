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
          <b-button icon-right="plus" @click="doubleHourHeight" />
          <b-button icon-right="minus" @click="divideHourHeight(2)" />
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
          >
            <template v-slot:interval="{ hour, date }">
              <div
                draggable="true"
                @click="setClickedInterval({ date, hour })"
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
          @assign:rest="setToRest"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import "../../mixins/dateMixin";
import { HTTP } from "../../services/httpService";
import AsideUser from "./AsideUser";
import { eventMixin } from "../../mixins/eventMixin";
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
      hourHeight: 25
    };
  },
  computed: {
    calendarEvents() {
      const event = [
        this.generateEvent(this.interval, "blue lighten-4", "Time slot")
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
    }
  },
  methods: {
    doubleHourHeight() {
      this.hourHeight = this.hourHeight * 2;
    },
    divideHourHeight(number) {
      this.hourHeight = this.hourHeight / number;
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
      const restPeriod = { start: interval.start, end: interval.end };
      this.object.restPeriods.push(restPeriod);
      HTTP.patch(`users/${this.object.id}`, {
        restPeriods: this.object.restPeriods
      });
      this.events.push(
        this.generateEvent(interval, "red accent-4", "Rest time")
      );
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
