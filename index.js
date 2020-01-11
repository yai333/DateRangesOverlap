import processTimeConflictCheck from "./main";

const OUTPUTFILE = `${__dirname}/output/output.txt`;
const APPOINTMENT_INPUTFILE = `${__dirname}/input/sample.txt`;

if (require.main === module) {
  processTimeConflictCheck(APPOINTMENT_INPUTFILE, OUTPUTFILE).then(() => {
    console.log(
      `Appointment datetime validating finished.` +
        ` Please check ${OUTPUTFILE} file for details`
    );
  });
}
