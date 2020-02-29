import { startOfWeek, endOfWeek } from "date-fns";
import {
  handleDaily,
  handleDateOfMonth,
  handleDayOfMonth,
  handleWeekly,
} from "./algorithms";
import {
  filterByOneProperty,
  filterIncludesString,
  oneTime,
  recurring,
  recurringByProperty,
  removeCancelled,
  removeRecurrenceProperty,
} from "./functions";

/** Get first and last day of week */
let getFirstLastDays = () => {
  const curr = new Date();
  const first = startOfWeek(curr, { weekStartsOn: 1 });
  const last = endOfWeek(curr, { weekStartsOn: 1 });
  return { first, last };
};

export default {
  /** Get events from calendar specified and created specified number of recurring events */
  getAllCalendars: (config) => {
    return fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${config.url}/events?key=${config.api_key}`
    )
      .then((res) => res.json())
      .then((res) => {
        const items = res.items;
        const { events, cancelled } = removeCancelled(items);
        const oneTimeEvents = oneTime(events);
        const recurringEvents = recurring(events);

        const daily = filterByOneProperty("RRULE:FREQ=DAILY", recurringEvents);
        const recurringDaily = recurringByProperty(
          removeRecurrenceProperty(daily),
          handleDaily,
          config.dailyRecurrence,
          cancelled
        ).flat();

        const weekly = filterByOneProperty(
          "RRULE:FREQ=WEEKLY",
          recurringEvents
        );

        const recurringWeekly = recurringByProperty(
          removeRecurrenceProperty(weekly),
          handleWeekly,
          config.weeklyRecurrence,
          cancelled
        ).flat();

        const monthly = filterByOneProperty(
          "RRULE:FREQ=MONTHLY",
          recurringEvents
        );

        // dateOfMonth will have only one item in the array, so this will verify "RRULE:FREQ=MONTHLY"
        const dateOfMonth = monthly.filter((item) =>
          filterIncludesString(item.r, "TH")
        );

        // however, dayOfMonth will have two items in the array
        // the second item will be like "BYDAY=1FR"
        const dayOfMonth = monthly.filter(
          (item) => !filterIncludesString(item.r, "TH")
        );

        const recurringDateOfMonth = recurringByProperty(
          removeRecurrenceProperty(dateOfMonth),
          handleDateOfMonth,
          config.monthlyRecurrence,
          cancelled
        ).flat();

        const recurringDayOfMonth = recurringByProperty(
          removeRecurrenceProperty(dayOfMonth),
          handleDayOfMonth,
          config.monthlyRecurrence,
          cancelled
        ).flat();

        const allEvents = [].concat(
          oneTimeEvents,
          recurringDaily,
          recurringWeekly,
          recurringDateOfMonth,
          recurringDayOfMonth
        );

        return allEvents.flat();
      })
      .then((events) => {
        // filter only current week events
        let { first, last } = getFirstLastDays();
        return events
          .filter((item) => item.start >= first && item.end <= last)
          .sort((a, b) => a.start > b.start);
      });
  },
};
