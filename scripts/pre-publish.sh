#!/bin/bash

echo "Script executed from: ${PWD}"

cd $(dirname $0) && cd ..
echo $PWD
###opts
set -e          #exit on error
set -o pipefail #fail on error in pipechain
set -x          #debug
version=$(node -p -e "require('./package.json').version") || $(node.exe --eval="process.stdout.write(require('./package.json').version)")

echo $version
time (
	time ./scripts/pre-commit.sh
	# bump version w/o creating a tag
	npm version patch --no-git-tag-version
	version=$(node -p -e "require('./package.json').version") || $(node.exe --eval="process.stdout.write(require('./package.json').version)")
	npm i
	echo $version
	npm run build
	git commit -am $version
	npm publish
)
