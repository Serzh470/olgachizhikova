const moment = require("moment");

/*
 * Handles events that occure the same date of every month
 * (e.g. the 1st, the 8th)
 */

// handleDateOfMonth :: String -> Int -> {} -> [{}]
const handleDateOfMonth = (calendar, recurrence, e, cancelled) => {
  const start = e.start.date ? moment(e.start.date) : moment(e.start.dateTime);
  const end = e.end.date ? moment(e.start.date) : moment(e.end.dateTime);

  // add first event if not cancelled
  let is_cancelled = cancelled.find(item => {
    if (
      item.recurringEventId === e.id &&
      start.isSame(item.originalStartTime.dateTime)
    ) {
      return true;
    }
    return false;
  });

  let reoccurringEvents = [];
  if (!is_cancelled) {
    reoccurringEvents.push({
      eventType: calendar.name,
      creator: e.creator,
      end: end._d,
      gLink: e.htmlLink,
      description: e.description,
      location: e.location,
      start: start._d,
      title: e.summary,
      // meta: e,
    });
  }

  let add = 1;

  while (recurrence > 0) {
    let is_cancelled = cancelled.find(item => {
      if (
        item.recurringEventId === e.id &&
        start
          .clone()
          .add(add, "months")
          .isSame(item.originalStartTime.dateTime)
      ) {
        return true;
      }
      return false;
    });

    if (!is_cancelled) {
      const reoccurringEvent = {
        eventType: calendar.name,
        creator: e.creator,
        start: start.clone().add(add, "months")._d,
        end: end.clone().add(add, "months")._d,
        gLink: e.htmlLink,
        description: e.description,
        location: e.location,
        title: e.summary,
        // meta: e,
      };
      reoccurringEvents.push(reoccurringEvent);
    }

    recurrence--;
    add++;
  }

  return reoccurringEvents;
};

module.exports = handleDateOfMonth;
