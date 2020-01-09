export const eventMixin = {
  methods: {
    formatDate(date, withTime) {
      return withTime
        ? this.$moment(date).format("YYYY-MM-DD HH:mm")
        : this.$moment(date).format("YYYY-MM-DD");
    },
    getEventColor(event) {
      return event.color;
    },
    generateEvent(interval, color, name) {
      return {
        start: this.formatDate(interval.start, true),
        end: this.formatDate(interval.end, true),
        color: color,
        name: name
      };
    },
    generateEventsFromUser(user) {
      const events = [];
      user.restPeriods.forEach(period => {
        events.push(this.generateEvent(period, "red accent-4", "Rest time"));
      });
      return events;
    }
  }
};
