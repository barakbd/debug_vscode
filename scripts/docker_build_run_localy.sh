# #!/bin/bash
# https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes
docker login containers.cisco.com
docker build -t cdt_box:local . 
# inspect image
docker image inspect 65ab307748
# clean up any resources — images, containers, volumes, any networks — that are dangling (not associated with a container):
docker system prune 
# clean up dangling images 
docker images -f dangling=true
docker images purge 
# remove all images
docker rmi $(docker images -a -q)
# run
docker run -it -p 4000:4000 cdt_box:local

docker container stop 1fa4ab2cf395

docker tag cdt_box bbendavi/cdt_box:dev
docker push bbendavi/cdt_box:dev

# will pull if doesn't exist
docker run --rm -p 4000:4000  --env-file .env bbendavi/cdt_box:dev 

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
docker rm $(docker ps -a -q)

# login to docker container 
http://phase2.github.io/devtools/common-tasks/ssh-into-a-container/