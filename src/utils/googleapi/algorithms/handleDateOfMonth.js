import { isEqual, addMonths } from "date-fns";

/*
 * Handles events that occure the same date of every month
 * (e.g. the 1st, the 8th)
 */

// handleDateOfMonth :: String -> Int -> {} -> [{}]
const handleDateOfMonth = (recurrence, e, cancelled) => {
  const start = e.start.date
    ? new Date(e.start.date)
    : new Date(e.start.dateTime);
  const end = e.end.date ? new Date(e.start.date) : new Date(e.end.dateTime);

  // add first event if not cancelled
  let is_cancelled = cancelled.find(
    (item) =>
      item.recurringEventId === e.id &&
      isEqual(start, new Date(item.originalStartTime.dateTime))
  );

  let reoccurringEvents = [];
  if (!is_cancelled) {
    reoccurringEvents.push({
      start: start,
      end: end,
      description: e.description,
      location: e.location,
      title: e.summary,
    });
  }

  let add = 1;

  while (recurrence > 0) {
    let is_cancelled = cancelled.find(
      (item) =>
        item.recurringEventId === e.id &&
        isEqual(
          addMonths(start, add),
          new Date(item.originalStartTime.dateTime)
        )
    );

    if (!is_cancelled) {
      const reoccurringEvent = {
        start: addMonths(start, add),
        end: addMonths(end, add),
        description: e.description,
        location: e.location,
        title: e.summary,
      };
      reoccurringEvents.push(reoccurringEvent);
    }

    recurrence--;
    add++;
  }

  return reoccurringEvents;
};

export default handleDateOfMonth;
