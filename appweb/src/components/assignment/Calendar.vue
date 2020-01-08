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
      ></v-calendar>
    </v-sheet>
  </section>
</template>

<script>
export default {
  data() {
    return {
      from: new Date(),
      maxDays: 15,
      to: null
      days: 5,
    };
  },
  methods: {
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    }
  },
  mounted() {
    this.to = new Date();
    this.to.setDate(this.from.getDate() + this.days);
  },
  props: {
    name: String,
    object: Object,
    type: { type: String, default: "user" },
    events: Array
  }
};
</script>

<style></style>
