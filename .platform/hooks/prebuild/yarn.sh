#!/bin/bash

# need to install node first to be able to install yarn (as at prebuild no node is present yet)
# curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh -
# sudo -E bash nodesource_setup.sh
# sudo yum -y install nodejs

curl -fsSL https://rpm.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo yum install -y nodejs

# install yarn
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

# install
cd /var/app/staging/

# debugging..
ls -lah

yarn install

chown -R webapp:webapp node_modules/ || true # allow to fail