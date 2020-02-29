import { isEqual, addWeeks } from "date-fns";

/*
 * Handles events that occur the same day of every week
 * (e.g. every Monday)
 */

// handleWeekly :: String -> Int -> {} -> [{}]
const handleWeekly = (recurrence, e, cancelled) => {
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

  // add recurrence events if not cancelled
  while (recurrence > 0) {
    let is_cancelled = cancelled.find(
      (item) =>
        item.recurringEventId === e.id &&
        isEqual(addWeeks(start, add), new Date(item.originalStartTime.dateTime))
    );

    if (!is_cancelled) {
      const reoccurringEvent = {
        start: addWeeks(start, add),
        end: addWeeks(end, add),
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

export default handleWeekly;
