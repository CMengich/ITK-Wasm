#!/usr/bin/env bash

set -eo pipefail

script_dir="`cd $(dirname $0); pwd`"

cd $script_dir

mkdir -p ITKBridgeJavaScriptModuleCopy
rsync -a --exclude=../../../src/Docker ../../../{include,src,CMakeLists.txt,itk-module.cmake} ./ITKBridgeJavaScriptModuleCopy/

TAG=$(date '+%Y%m%d')-$(git rev-parse --short HEAD)

docker build -t insighttoolkit/itk-js:latest \
        --build-arg IMAGE=insighttoolkit/itk-js \
        --build-arg VCS_REF=`git rev-parse --short HEAD` \
        --build-arg VCS_URL=`git config --get remote.origin.url` \
        --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
        $script_dir
docker build -t insighttoolkit/itk-js:${TAG} \
        --build-arg IMAGE=insighttoolkit/itk-js \
        --build-arg VERSION=${TAG} \
        --build-arg VCS_REF=`git rev-parse --short HEAD` \
        --build-arg VCS_URL=`git config --get remote.origin.url` \
        --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
        $script_dir


if [[ \ $*\  == *\ --with-debug\ * ]]; then
  docker build -t insighttoolkit/itk-js:${TAG}-debug \
          --build-arg IMAGE=insighttoolkit/itk-js \
          --build-arg CMAKE_BUILD_TYPE=Debug \
          --build-arg VERSION=${TAG}-debug \
          --build-arg BASE_TAG=${TAG}-debug \
          --build-arg VCS_REF=`git rev-parse --short HEAD` \
          --build-arg VCS_URL=`git config --get remote.origin.url` \
          --build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
          $script_dir
fi
