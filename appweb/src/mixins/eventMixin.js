export const eventMixin = {
  methods: {
    formatDate(date, withTime) {
      return withTime
        ? this.$moment(date).format("YYYY-MM-DD HH:mm")
        : this.$moment(date).format("YYYY-MM-DD");
    },
    displayTimeSlot(timeslot) {
      const days = this.dayDiff(timeslot.start, timeslot.end);
      const ext = days > 0 ? `+ ${days} days` : "";
      return `${this.formatTime(timeslot.start)} - ${this.formatTime(
        timeslot.end
      )} ${ext}`;
    },
    formatTime(date) {
      return this.$moment(date).format("HH:mm");
    },
    dayDiff(date1, date2) {
      const diffTime = Math.abs(date2 - date1);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    getEventColor(event) {
      return event.color;
    },
    generateEvent(start, end, color, task) {
      return {
        ...task,
        color: color,
        start: this.formatDate(start, true),
        end: this.formatDate(end, true)
      };
    },
    generateEventsAssignment(assignments) {
      const events = [];
      assignments.forEach(taskInstance => {
        events.push(
          this.generateEvent(
            taskInstance.start,
            taskInstance.end,
            taskInstance.displayedColor,
            taskInstance
          )
        );
      });
      return events;
    }
  }
};
