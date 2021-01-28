#!/bin/bash

set -eu

export ESLINT_TYPE_AWARE='false'

echo "Running eslint --fix on ${1}"

$(npm bin)/eslint --ignore-path .eslintignore --fix "$1" || exit 0
