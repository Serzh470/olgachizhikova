import { isEqual } from "date-fns";

/*
 * Handles events that occur the same day of the month
 * (e.g. first Friday, last Monday)
 */

// handleDayOfMonth :: String -> Int -> {} -> [{}]
const handleDayOfMonth = (recurrence, e, cancelled) => {
  const start = e.start.date
    ? new Date(e.start.date)
    : new Date(e.start.dateTime);
  const end = e.end.date ? new Date(e.start.date) : new Date(e.end.dateTime);

  const date = start.date();
  let counter;

  if (date <= 7) {
    counter = 1;
  } else if (date > 7 && date <= 14) {
    counter = 7;
  } else if (date > 14 && date <= 21) {
    counter = 14;
  } else if (date > 21 && date <= 28) {
    counter = 21;
  } else {
    counter = 28;
  }

  // check if first event is cancelled
  let is_cancelled = cancelled.find(
    (item) =>
      item.recurringEventId === e.id &&
      isEqual(start, new Date(item.originalStartTime.dateTime))
  );

  // add first event if not cancelled
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
    let tempCounter = counter;
    // Using variables 'recurrence' and 'tempCounter' doesn't work with Moment
    let nextStart = new Date(
      start.year(),
      start.month() + recurrence,
      tempCounter,
      start.hour(),
      start.minutes()
    );
    let nextEnd = new Date(
      end.year(),
      end.month() + recurrence,
      tempCounter,
      end.hour(),
      end.minutes()
    );

    while (tempCounter < 31) {
      let isEqual = nextStart.getDay() === start.day();

      if (isEqual) {
        // check if next events cancelled
        let is_cancelled = cancelled.find(
          (item) =>
            item.recurringEventId === e.id &&
            isEqual(nextStart, new Date(item.originalStartTime.dateTime))
        );

        if (!is_cancelled) {
          const reoccurringEvent = {
            start: nextStart,
            end: nextEnd,
            description: e.description,
            location: e.location,
            title: e.summary,
          };
          reoccurringEvents.push(reoccurringEvent);
          tempCounter = counter;
          break;
        }
      }

      nextStart = new Date(
        start.year(),
        start.month() + recurrence,
        tempCounter,
        start.hour(),
        start.minutes()
      );
      nextEnd = new Date(
        end.year(),
        end.month() + recurrence,
        tempCounter,
        end.hour(),
        end.minutes()
      );
      tempCounter++;
    }
    recurrence--;
  }
  return reoccurringEvents;
};

export default handleDayOfMonth;
