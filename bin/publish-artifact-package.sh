#!/bin/bash

export PACKAGE=$1

# Authenticate with CodeArtifact
# This line may need to get added back.  I'll have to wait until previous credentials expire to find out.
# export aws codeartifact login --tool npm --domain $DOMAIN_NAME --repository $REPOSITORY_NAME --region $AWS_REGION

echo "Processing $PACKAGE..."

PACKAGE_DIR="node_modules/$PACKAGE"

if [ -d "$PACKAGE_DIR" ]; then
    cd $PACKAGE_DIR
    npm publish --registry https://utk-codeartifacts-757269603777.d.codeartifact.us-east-1.amazonaws.com/npm/utk-codeartifact-repo/
else
    echo "Failed to fetch $PACKAGE. Skipping..."
fi

echo "Finished processing packages."