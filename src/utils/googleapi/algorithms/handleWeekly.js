const moment = require("moment");

/*
 * Handles events that occur the same day of every week
 * (e.g. every Monday)
 */

// handleWeekly :: String -> Int -> {} -> [{}]
const handleWeekly = (calendar, recurrence, e, cancelled) => {
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

  // add recurrence events if not cancelled
  while (recurrence > 0) {
    let is_cancelled = cancelled.find(item => {
      if (
        item.recurringEventId === e.id &&
        start
          .clone()
          .add(add, "week")
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
        start: start.clone().add(add, "week")._d,
        end: end.clone().add(add, "week")._d,
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

module.exports = handleWeekly;
