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
    </b-field>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        :start="formatDate(from)"
        :end="formatDate(to)"
        :events="events"
        :maxDays="days"
        color="primary"
        type="custom-daily"
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
    <p>Start: {{ interval.start }}</p>
    <p>End: {{ interval.end }}</p>
  </section>
</template>

<script>
import "../../mixins/dateMixin";
export default {
  data() {
    return {
      from: new Date(),
      maxDays: 15,
      days: 5,
      to: null,
      interval: {
        start: null,
        end: null
      }
    };
  },
  methods: {
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    setClickedInterval({ date, hour }) {
      this.setInterval({ date, hour, field: "start" });
      this.setInterval({ date, hour: hour + 1, field: "end" });
    },
    setInterval({ date, hour, field }) {
      const value = new Date(`${date} ${hour > 9 ? hour : "0" + hour}:00`);
      this.$set(this.interval, field, value);
    },
    checkInterval() {
      if (this.interval.start > this.interval.end) {
        this.revertInterval(this.interval, this.interval);
      }
    },
    revertInterval(obj, { start, end }) {
      this.$set(obj, "start", end);
      this.$set(obj, "end", start);
    },
    printMessage(m) {
      console.log(m);
    }
  },
  mounted() {
    this.to = this.from.addDays(this.days);
  },
  props: {
    name: String,
    object: Object,
    type: { type: String, default: "user" },
    events: Array
  }
};
</script>

<style>
.hour-interval {
  width: 100%;
  height: 100%;
}
</style>
