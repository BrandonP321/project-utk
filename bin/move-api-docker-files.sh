#!/bin/bash

# This script moves the Dockerfiles to the root level of the monorepo

script_dir="$(dirname "$0")"

sourceFiles=(
  "$script_dir/../packages/api/Dockerfile"
  "$script_dir/../packages/api/.dockerignore"
)

destination_dir="$script_dir/../"

for sourceFile in "${sourceFiles[@]}"; do
  mv "$sourceFile" "$destination_dir"
done

echo "Docker files moved to root directory"