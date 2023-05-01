#!/bin/bash

echo "Script executed from: ${PWD}"

cd $(dirname $0) && cd ..
echo $PWD
###opts
set -e          #exit on error
set -o pipefail #fail on error in pipechain
set -x          #debug

time (
	npm i
	npm run lint
	npm run fmtJson
	npm test
	npm run build
	npm run clean
)
