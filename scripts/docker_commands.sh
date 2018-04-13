
########## ENV VARS ###############

# open bash_profile in text editor - sudo open -e ~/.bash_profile
# clear bash_history - cat /dev/null > ~/.bash_history && history -c && exit

########## DOCKER BUILD AND PUSH ###############

docker login containers.cisco.com
-generate encrypted password

# build
docker build --no-cache -t cdt_box:dev . 
# run cdt_box
docker run -it --rm -p 4000:4000 cdt_box:dev start 
# run mongo
docker run --rm -it -v /data:/data -p 27018:27017 mongo:3.6
docker-compose up
docker-compose down - will rm containers 

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

docker tag cdt_box bbendavi/cdt_box:dev
docker push bbendavi/cdt_box:dev

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