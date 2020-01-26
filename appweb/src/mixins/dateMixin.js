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
    endOfDayDate(date) {
      date.setHours(23, 59, 59);
      return date;
    },
    generateDate(date, hour) {
      return new Date(`${date} ${hour > 9 ? hour : "0" + hour}:00`);
    },
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
    // Used for sort:
    // If interval1 take more time than interval2 => return 1
    // If interval1 take less time than interval2 => return -1
    // If both intervals take the same time => return 0
    compareDateIntervalDuration(interval1, interval2) {
      const duration1 = interval1.end - interval1.start;
      const duration2 = interval2.end - interval2.start;
      if (duration1 > duration1) return 1;
      else if (duration1 < duration2) return -1;
      else return 0;
    },
    isIncludedIn(interval1, interval2) {
      // interval1 is inculded in interval2
      return (
        interval1.start >= interval2.start && interval1.end <= interval2.end
      );
    },
    isCovering(interval1, interval2) {
      return (
        this.isIncludedIn(interval1, interval2) ||
        (interval1.start < interval2.end && interval1.end >= interval2.end) ||
        (interval1.start <= interval2.start && interval1.end > interval2.start)
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
      if (this.isIncludedIn(bigInterval, smallInterval)) {
        // That means big interval is smaller than small interval
        return [Object.assign({}, bigInterval, { start: bigInterval.end })];
      }
      let intervals = [
        Object.assign({}, bigInterval, { end: smallInterval.start }),
        Object.assign({}, bigInterval, { start: smallInterval.end })
      ];
      return intervals.filter(interval => interval.start < interval.end);
    }
  }
};
