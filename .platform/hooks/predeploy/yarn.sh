#!/bin/bash
npm i -g corepack # Required if using Amazon Linux 2023

corepack enable # Enable Corepack
.  bin/set-artifact-token.sh
yarn install