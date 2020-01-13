Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const dateMixin = {
  methods: {
    // Used for sort:
    // If interval1 earlier than interval2 => return -1
    // If interval1 later interval2 => return 1
    // If interval1 equal to interval2 => return 0
    compareDateInterval(interval1, interval2) {
      if (interval1.start < interval2.start) {
        return -1;
      } else if (interval1.start > interval2.start) {
        return 1;
      } else if (interval1.end < interval2.end) {
        return -1;
      } else if (interval1.end > interval2.end) {
        return 1;
      } else return 0;
    },
    isIncludedIn(interval1, interval2) {
      // interval1 is inculded in interval2
      return (
        interval1.start >= interval2.start && interval1.end <= interval2.end
      );
    },
    mergeInterval(interval1, interval2) {
      if (interval1.start == interval2.end) {
        return [Object.assign({}, interval2, { end: interval1.end })];
      } else if (interval1.end == interval2.start) {
        return [Object.assign({}, interval1, { end: interval2.end })];
      } else if (this.isIncludedIn(interval1, interval2)) {
        return [Object.assign({}, interval2)];
      } else if (this.isIncludedIn(interval2, interval1)) {
        return [Object.assign({}, interval1)];
      } else return [interval1, interval2];
    },
    splitInterval(bigInterval, smallInterval) {
      let intervals = [
        Object.assign({}, bigInterval, { end: smallInterval.start }),
        Object.assign({}, bigInterval, { start: smallInterval.end })
      ];
      return intervals.filter(interval => interval.start != interval.end);
    }
  }
};
