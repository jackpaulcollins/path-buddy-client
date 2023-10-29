class PathScheduleParser {
  constructor(scheduleString, schedulePolarity) {
    this.scheduleString = scheduleString;
    this.schedulePolarity = schedulePolarity;
  }

  parse() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const scheduleArray = this.scheduleString.split(',').map(Number);
    const result = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < scheduleArray.length; i++) {
      if (scheduleArray[i] === 1) {
        result.push(daysOfWeek[i]);
      }
    }

    return result.join(', ');
  }

  // make this do nothing for now to save screen space
  // but leave it incase needed in future
  periodDisplay() {
    if (this.scheduleString === 'weekly') {
      return 'weekly';
    }

    if (this.scheduleString === 'daily') {
      return 'daily';
    }

    return this.scheduleString;
  }
}

export default PathScheduleParser;
