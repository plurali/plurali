export interface FormattedTimeWithUnit {
  value: number;
  unit:
    | 'decade'
    | 'decades'
    | 'year'
    | 'years'
    | 'month'
    | 'months'
    | 'day'
    | 'days'
    | 'hour'
    | 'hours'
    | 'minute'
    | 'minutes'
    | 'second'
    | 'seconds';
}

const isPlural = (num: number) => Math.abs(num) !== 1;

export const getMinuteDifference = (date: Date, now = new Date()) => {
  const difference = now.getTime() - date.getTime();

  return difference / (1000 * 60);
};

export const getFormattedTimeWithUnit = (seconds: number): FormattedTimeWithUnit => {
  seconds = Math.floor(seconds);

  if (seconds < 60) {
    return {
      value: seconds,
      unit: isPlural(seconds) ? 'seconds' : 'second',
    };
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return {
      value: minutes,
      unit: isPlural(minutes) ? 'minutes' : 'minute',
    };
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return {
      value: hours,
      unit: isPlural(hours) ? 'hours' : 'hour',
    };
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return {
      value: days,
      unit: isPlural(days) ? 'days' : 'day',
    };
  }

  // to not complicate this further we count 1 month = 30 days, excl. 31 and 29 (February)
  const months = Math.floor(days / 30);

  if (months < 12) {
    return {
      value: months,
      unit: isPlural(months) ? 'months' : 'month',
    };
  }

  const years = Math.floor(months / 12);

  return {
    value: years,
    unit: isPlural(years) ? 'years' : 'year',
  };
};
