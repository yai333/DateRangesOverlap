import * as fs from "fs";
import path from "path";
import processTimeConflictCheck from "../main";

describe("processTimeConflictCheck function", () => {
  const OUTPUT = `${__dirname}/output.txt`;

  it("should exist", () => {
    expect(processTimeConflictCheck).toBeDefined();
  });

  it("should be a function", () => {
    expect(processTimeConflictCheck).toBeInstanceOf(Function);
  });

  it("should generate output.txt file with FALSE flag", async () => {
    const input = `${__dirname}/sample1.txt`;
    fs.existsSync(OUTPUT) && fs.unlinkSync(OUTPUT);
    const result = await processTimeConflictCheck(input, OUTPUT);
    expect(fs.existsSync(OUTPUT)).toBe(true);
    const data = fs.readFileSync(OUTPUT);
    expect(data.toString().indexOf("--> false") >= 0);
  });

  it("should generate output.txt file with correct information", async () => {
    const input = `${__dirname}/sample2.txt`;
    fs.existsSync(OUTPUT) && fs.unlinkSync(OUTPUT);
    const result = await processTimeConflictCheck(input, OUTPUT);
    expect(fs.existsSync(OUTPUT)).toBe(true);
    const data = fs.readFileSync(OUTPUT);
    expect(
      data
        .toString()
        .indexOf(
          "[[ 2020-01-01 06:00, +], [2020-01-01 08:00, 60]] --> false"
        ) >= 0
    );
    expect(
      data
        .toString()
        .indexOf("[[2020-01-06 08:00, 40], [2020-01-06 08:15, 15]] --> true") >=
        0
    );
  });
});
