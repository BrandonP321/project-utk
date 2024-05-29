#!/bin/bash

# This script moves the Procfile from the api package 
# to the root directory for Elastic Beanstalk deployment

script_dir="$(dirname "$0")"

source_procfile="$script_dir/../packages/api/Procfile"
destination_dir="$script_dir/../"

mv "$source_procfile" "$destination_dir"

echo "Procfile moved to root directory"