import { format, compareAsc, differenceInMinutes, addMinutes } from "date-fns";

const extractTime = data => {
  const re = new RegExp(/\[.*?\]/g);
  let dateStrMatch = data.match(re);
  return (
    (dateStrMatch &&
      dateStrMatch.length >= 2 &&
      dateStrMatch.map(c => c.replace(/[[\]]/g, ""))) ||
    null
  );
};

const transformTime = timeRange => {
  if (!timeRange || typeof timeRange !== "string") return null;
  const timeRangeArray = timeRange.split(",");
  if (timeRangeArray.length === 2) {
    const startTime = new Date(timeRangeArray[0].trim());
    if (isNaN(startTime)) return null;
    let duration = timeRangeArray[1].trim();
    duration = isNaN(duration) ? 0 : duration;
    return [startTime, addMinutes(startTime, duration)];
  }
  return null;
};

const validateConflicts = (timeA, timeB) => {
  const sortedTimeRange = timeRange => {
    return timeRange.sort((a, b) => {
      return compareAsc(a, b);
    });
  };

  const startA = sortedTimeRange(timeA)[0];
  const endA = sortedTimeRange(timeA)[1];
  const startB = sortedTimeRange(timeB)[0];
  const endB = sortedTimeRange(timeB)[1];
  return !(
    Math.min(
      differenceInMinutes(endA, startA),
      differenceInMinutes(endA, startB),
      differenceInMinutes(endB, startB),
      differenceInMinutes(endB, startA)
    ) <= 0
  );
};

export { extractTime, transformTime, validateConflicts };
