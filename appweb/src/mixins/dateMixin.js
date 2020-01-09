Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
