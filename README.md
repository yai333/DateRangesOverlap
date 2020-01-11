# Introduction

Given the starting time and duration (in minutes) of two appointments, determine whether or not they conflict. You can model the appointment however you like, but the function should return `true` if they conflict, and `false` if they don't.

Examples:

```
`[[2020-01-01 06:00, 20], [2020-01-01 08:00, 60]] -> false`
`[[2020-01-06 08:00, 120], [2020-01-06 09:15, 15]] -> true`
```

# Solution

This is a sample script to validate date time range values in txt file `\input\sample.txt` and then generate a `\output\ouput.txt` with conflict flag attached to each time ranges in file.

Input file example:

```
[[2020-01-06 08:00, 240], [2020-01-06 09:15, 15]]
sss
[[2020-01-06 08:00, 10], [2020-01-06 07:15, 65]]
[[2020-01-06 11:00, 10], [2020-01-06 11:15, -45]]
```

Output file example:

```
[[2020-01-06 08:00, 240], [2020-01-06 09:15, 15]] --> true
[[2020-01-06 08:00, 10], [2020-01-06 07:15, 65]] --> true
[[2020-01-06 11:00, 10], [2020-01-06 11:15, -45]] --> true
```

## Run script locally with Docker

Install and setup docker, then run following cli commend:

```
$docker-compose build

//Generate conflict result to output/output.txt
$docker-compose up validate

//dev
$docker-compose up dev

//unit test
$docker-compose up test
```

## Run script locally without Docker

Install node(<strong>>=13</strong>).
note that there is compatible issue with date-fns when node < 13, thus you won't get correct output if node is old. you can use docker to run the script if your node version is <= 13.

### Install npm dependencies:

```
$npm install

```

### Generate conflict result to output/output.txt:

```
$npm run validate
```

### Run script in dev mode:

```
$npm start
```

### Run unit test:

```
$npm test
```
