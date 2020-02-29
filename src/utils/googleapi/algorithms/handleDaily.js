import { addDays, isEqual } from "date-fns";

/*
 * Handles events that occur every 'n' number of days
 * (e.g. every day, every 5 days)
 */

// handleDaily :: String -> Int -> {} -> [{}]
const handleDaily = (recurrence, e, cancelled) => {
  const start = e.start.date
    ? new Date(e.start.date)
    : new Date(e.start.dateTime);
  const end = e.end.date ? new Date(e.start.date) : new Date(e.end.dateTime);

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

  while (recurrence > 0) {
    let is_cancelled = cancelled.find(
      (item) =>
        item.recurringEventId === e.id &&
        isEqual(addDays(start, add), new Date(item.originalStartTime.dateTime))
    );

    if (!is_cancelled) {
      const reoccurringEvent = {
        start: addDays(start, add),
        end: addDays(end, add),
        description: e.description,
        location: e.location,
        title: e.summary,
      };
      reoccurringEvents.push(reoccurringEvent);
    }
    recurrence--;
    add += n;
  }
  return reoccurringEvents;
};

export default handleDaily;
