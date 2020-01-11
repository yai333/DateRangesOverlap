# Introduction

Given the starting time and duration (in minutes) of two appointments, determine whether or not they conflict. You can model the appointment however you like, but the function should return `true` if they conflict, and `false` if they don't.

Examples:

```
`[[2020-01-01 06:00, 20], [2020-01-01 08:00, 60]] -> false`
`[[2020-01-06 08:00, 120], [2020-01-06 09:15, 15]] -> true`
```

# Solution

This is a sample script to validate date time range values in txt file `\input\sample.txt` and then generate a `\output\ouput.txt` with conflict flag attached to each time ranges in file.

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
note: there is compatible issue with date-fns when node < 13, thus you won't get correct output if node is old. you can use docker to run the script if your node version is <= 13.

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
