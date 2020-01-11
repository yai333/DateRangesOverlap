import { addMinutes } from "date-fns";
import { extractTime, transformTime, validateConflicts } from "../lib";

describe("ETL extractTime function", () => {
  it("should exist", () => {
    expect(extractTime).toBeDefined();
  });

  it("should be a function", () => {
    expect(extractTime).toBeInstanceOf(Function);
  });

  it("should return date range if time with duration value is valie", () => {
    const result = extractTime(
      "[[ 2020-01-01 06:00, 20], [2020-01-01 08:00, 60]]"
    );
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(" 2020-01-01 06:00, 20");
    expect(result[1]).toEqual("2020-01-01 08:00, 60");
  });

  it("should return null if there no square bracket character in time with duration value", () => {
    const result = extractTime("xxx, [2020-01-01 08:00, 60]]");
    expect(result).toEqual(null);
  });
});

describe("ETL transformTime function", () => {
  it("should exist", () => {
    expect(transformTime).toBeDefined();
  });

  it("should be a function", () => {
    expect(transformTime).toBeInstanceOf(Function);
  });

  it("should return date range if time with duration value is valie", () => {
    const sampleTimeStr = "2020-01-01 06:00";
    const sampleDuration = "20";
    const startTime = new Date(sampleTimeStr);
    const endTime = addMinutes(startTime, 20);
    const result = transformTime("2020-01-01 06:00, 20");
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(startTime);
    expect(result[1]).toEqual(endTime);
  });

  it("should return null if time with duration value is invalie", () => {
    const result = transformTime("xxx, 20");
    expect(result).toEqual(null);
  });
});

describe("ETL validateConflicts function", () => {
  it("should exist", () => {
    expect(validateConflicts).toBeDefined();
  });

  it("should be a function", () => {
    expect(validateConflicts).toBeInstanceOf(Function);
  });

  it("should return conflict status FALSE", () => {
    const sampleStartTimeStrA = "2020-01-01 06:00";
    const sampleStartDurationA = "50";
    const sampleStartTimeStrB = "2020-01-01 07:00";
    const sampleStartDurationB = "20";
    const startTimeA = new Date(sampleStartTimeStrA);
    const endTimeA = addMinutes(startTimeA, sampleStartDurationA);
    const startTimeB = new Date(sampleStartTimeStrB);
    const endTimeB = addMinutes(startTimeB, sampleStartDurationB);
    const result = validateConflicts(
      [startTimeA, endTimeA],
      [startTimeB, endTimeB]
    );
    expect(result).toBe(false);
  });

  it("should return conflict status TRUE", () => {
    const sampleStartTimeStrA = "2020-01-01 06:00";
    const sampleStartDurationA = "20";
    const sampleStartTimeStrB = "2020-01-01 06:10";
    const sampleStartDurationB = "20";
    const startTimeA = new Date(sampleStartTimeStrA);
    const endTimeA = addMinutes(startTimeA, sampleStartDurationA);
    const startTimeB = new Date(sampleStartTimeStrB);
    const endTimeB = addMinutes(startTimeB, sampleStartDurationB);
    const result = validateConflicts(
      [startTimeA, endTimeA],
      [startTimeB, endTimeB]
    );
    expect(result).toBe(true);
  });

  it("should return conflict status FALSE by given minus duration", () => {
    const sampleStartTimeStrA = "2020-01-01 06:00";
    const sampleStartDurationA = "-80";
    const sampleStartTimeStrB = "2020-01-01 06:10";
    const sampleStartDurationB = "20";
    const startTimeA = new Date(sampleStartTimeStrA);
    const endTimeA = addMinutes(startTimeA, sampleStartDurationA);
    const startTimeB = new Date(sampleStartTimeStrB);
    const endTimeB = addMinutes(startTimeB, sampleStartDurationB);
    const result = validateConflicts(
      [startTimeA, endTimeA],
      [startTimeB, endTimeB]
    );
    expect(result).toBe(false);
  });
});
