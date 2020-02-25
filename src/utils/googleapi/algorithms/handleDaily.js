const moment = require("moment");

/*
 * Handles events that occur every 'n' number of days
 * (e.g. every day, every 5 days)
 */

// handleDaily :: String -> Int -> {} -> [{}]
const handleDaily = (calendar, recurrence, e, cancelled) => {
  const start = e.start.date ? moment(e.start.date) : moment(e.start.dateTime);
  const end = e.end.date ? moment(e.start.date) : moment(e.end.dateTime);

  // reformat reponse to get how many days between each recurrence
  const wtfGoogle =
    e.recurrence[0]
      .split(";")
      .pop()
      .split("=")
      .pop() !== "DAILY"
      ? parseInt(
          e.recurrence[0]
            .split(";")
            .pop()
            .split("=")
            .pop()
        )
      : 1;
  const n = wtfGoogle;
  let add = wtfGoogle;

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

  while (recurrence > 0) {
    let is_cancelled = cancelled.find(item => {
      if (
        item.recurringEventId === e.id &&
        start
          .clone()
          .add(add, "days")
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
        end: end.clone().add(add, "days")._d,
        gLink: e.htmlLink,
        description: e.description,
        location: e.location,
        start: start.clone().add(add, "days")._d,
        title: e.summary,
        // meta: e,
      };
      reoccurringEvents.push(reoccurringEvent);
    }
    recurrence--;
    add += n;
  }
  return reoccurringEvents;
};

module.exports = handleDaily;
