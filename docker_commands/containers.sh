# run cdt_box
docker run -it --rm -p 4000:4000 cdt_box:dev 
# run mongo
docker run --rm -it -v /data:/data -p 27018:27017 mongo:3.6

# docker run --rm -it -v dist:/server/dist --env-file .env --env MONGODB_HOST_AND_PORT_LIST=docker.for.mac.localhost:27017 -p 6000:6000 -p 9225:9225 --entrypoint "npm run debug" docker-ts-debug:dev .

docker run --rm -it -v dist:/server/dist --env-file .env --env MONGODB_HOST_AND_PORT_LIST=docker.for.mac.localhost:27017 -p 6000:6000 -p 9225:9225 docker-ts-debug:dev .

docker-compose up
docker-compose down # will rm containers 

# look inside running container
docker exec -it 9adffb2a6394 ls
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
# http://phase2.github.io/devtools/common-tasks/ssh-into-a-container/
