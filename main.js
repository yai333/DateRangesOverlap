import * as fs from "fs";
import * as readline from "readline";
import { extractTime, transformTime, validateConflicts } from "./lib";

const processTimeConflictCheck = (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    try {
      const lineReader = readline.createInterface({
        input: fs.createReadStream(inputFile)
      });

      const output = fs.createWriteStream(outputFile, {
        flags: "w"
      });

      lineReader.on("line", line => {
        const rawTimes = extractTime(line);
        if (rawTimes && rawTimes.length === 2) {
          const timeRangeA = transformTime(rawTimes[0]);
          const timeRangeB = transformTime(rawTimes[1]);
          timeRangeA &&
            timeRangeB &&
            output.write(
              `${line} --> ${validateConflicts(timeRangeA, timeRangeB)}  \n`
            );
        }
      });

      lineReader.on("close", () => {
        resolve("process succeed");
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default processTimeConflictCheck;
