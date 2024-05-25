#!/bin/bash
export UTK_CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain utk-codeartifacts --domain-owner 757269603777 --query authorizationToken --output text`