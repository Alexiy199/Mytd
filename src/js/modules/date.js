const currentDate = new Date();

export default {
  year: currentDate.getFullYear(),
  month: (currentDate.getMonth() + 1).toString().padStart(2, "0"),
  weekDay: function () {
    if (currentDate.getDay() == 0) return "Воскресенье";

    if (currentDate.getDay() == 1) return "Понедельник";

    if (currentDate.getDay() == 2) return "Вторние";

    if (currentDate.getDay() == 3) return "Среда";

    if (currentDate.getDay() == 4) return "Четверг";

    if (currentDate.getDay() == 5) return "Пятница";

    if (currentDate.getDay() == 6) return "Суббота";
  },
  day: currentDate.getDate().toString().padStart(2, "0"),
  time: currentDate.getTime(),
  hour: currentDate.getHours(),
  minute: currentDate.getMinutes(),
  second: currentDate.getSeconds(),
  hourMin: function (separator) {
    return `${this.hour}${separator}${this.minute}`;
  },
  minSec: function (separator) {
    return `${this.minute}${separator}${this.second}`;
  },
  dmy: function (separator) {
    return `${this.year}${separator}${this.month}${separator}${this.day}`;
  },
};
