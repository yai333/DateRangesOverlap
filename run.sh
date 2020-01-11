#!/usr/bin/env bash

echo $NODE_ENV
if [ $NODE_ENV == "validate" ]; then
  npm run validate
else
  if [ $NODE_ENV == "dev" ]; then
    npm start
  else
    npm run test
  fi
fi
