# Var=Var - local variables inside the makefile - accessed by $(VAR)
# bash (including environment) variables  accessed by $$VAR_NAME - first $ escapes local variables

########## Makefile to docker build typescript for prod ##########
#1 - npm install (not prod, so we include devDependencies from package.json)

#2 - run docker build with ./dist as a dependency  (looks for changes)
docker-buid: ./dist
  docker build .
install-node:
  #https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - 
  sudo apt-get install -y nodejsinstall-tsc: 
  npm i -g typescript
run-tsc:
test-node:
  if [node -v]
  then
    cat node -v
  else

  fi
   
NAME   := cdt-box/foo
# TAG    := $$(git log -1 --pretty=%!H(MISSING))
TAG    := $$(git tag)

IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest

build:
  @docker build -t ${IMG} .
  @docker tag ${IMG} ${LATEST}

push:
  @docker push ${NAME}

login:
  @docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}
