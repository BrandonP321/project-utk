# project-utk

## Install NVM

1. In a git bash terminal, run the following:
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

## Use correct node version

'Install NVM' step is a pre-req to this.

1. If running the following succeeds, you are now on the correct node version: `nvm use`.

2. If the previous step failed, grab the correct node version from the `.nvmrc` file.

3. Run the following with the node version you just grabbed: `nvm install <node version>`.

4. Close the git bash terminal, open a new terminal, and run `nvm use`. You should now be on the correct node version.

## Get on latest version of yarn

It is recommended to have completed the nvm and node version setups before doing this.

1. Make sure yarn is not installed globally with `npm uninstall -g yarn`.

2. Now reinstall yarn globally to get on the latest version `npm i -g yarn`.

## VS Code setup

### VS Code Extensions

1. SCSS Intellisense
2. Path Intellisense
3. GitHub Copilot
4. GitHub Copilot Chat
5. ESLint
6. CSS Modules
7. Better Comments

## AWS CodeArtifact Repo Authentication

To interact with the AWS CodeArtifact repository, you need to set up some environment variables. These variables are used to authenticate and interact with the AWS CodeArtifact repository.

Add the following lines to your `.bashrc` file:

```shellscript
export UTK_CODEARTIFACT_ACCOUNT_ID="757269603777"
export UTK_CODEARTIFACT_DOMAIN_NAME="utk-codeartifacts"
export UTK_CODEARTIFACT_REPOSITORY_NAME="utk-codeartifact-repo"
export UTK_CODEARTIFACT_AWS_REGION="us-east-1"

export UTK_CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain $UTK_CODEARTIFACT_DOMAIN_NAME --domain-owner $UTK_CODEARTIFACT_ACCOUNT_ID --query authorizationToken --output text`
```

## Publishing External Packages to CodeArtifact Repo

### 1. Install package

You'll need to first install the package locally, which may require you to temporarily configure the .yarnrc.yml npmScopes, such as with fontawesome.

You can install the package normally using `yarn install`.

### 2. Publish Package to CodeArtifact Repo

From the root level of the monorepo, run the following CLI command, replacing <package_name> with the package you want to publish.

```
source bin/publish-artifact-package.sh <package_name>
```

### 3. Remove Temporary Configurations

If you made any temporary configurations for installing packages locally, remove those changes now so that future installs pull from the CodeArtifact repo.

### 4. Remove node_modules

Remove the node_modules/ directory to allow for a fresh install:

```
rm -rf node_modules/
```

### 5. Delete yarn.lock and Reinstall

Finally, delete the yarn.lock and perform one last install, which will pull all packages from the CodeArtifact repo. Make sure to also push the new yarn.lock to the remote GitHub repo.
