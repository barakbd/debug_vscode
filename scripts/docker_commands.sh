
########## ENV VARS ###############

# open bash_profile in text editor - sudo open -e ~/.bash_profile
# clear bash_history - cat /dev/null > ~/.bash_history && history -c && exit

########## DOCKER BUILD AND PUSH ###############

docker login

# build
docker build --no-cache -t docker-ts-debug:dev . 
# run docker-ts-debug
docker run --rm -it --env-file .env -p 6000:6000 docker-ts-debug:dev
# build and run
docker build -t docker-ts-debug:dev . && docker run --rm -it --env-file .env -p 6000:6000 docker-ts-debug:dev

# run mongo
docker run --rm -it --env-file .env -v /data:/data -p 27018:27017 mongo:3.6
docker-compose up
docker-compose down #will rm containers 

########## DOCKER CLEANUP ###############
#  https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes

########## CLEANUP IMAGES ###############

# inspect image
docker image inspect 65ab307748
# clean up any resources — images, containers, volumes, any networks — that are dangling (not associated with a container):
docker system prune 
# clean up dangling images - dangling=no tag AND not child of other image
docker images -f dangling=true
docker images purge 
# remove all images
docker rmi $(docker images -a -q)
# remove all untagged images
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")


########## CLEANUP CONTAINERS ###############

docker container stop 1fa4ab2cf395

docker tag docker-ts-debug username/docker-ts-debug:dev
docker push username/docker-ts-debug:dev

# list containers
docker ps -a
#delete container 
docker rm 
# list all exited containers 
docker ps -a -f status=exited -f status=created
# remove exited
docker rm $(docker ps -a -f status=exited -f status=created -q)

# stop and remove all containers
docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)

# login to docker container 
http://phase2.github.io/devtools/common-tasks/ssh-into-a-container/
# look inside running container
docker exec -it 9adffb2a6394 ls