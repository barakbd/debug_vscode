########## ENV VARS ###############

# open bash_profile in text editor - sudo open -e ~/.bash_profile
# clear bash_history - cat /dev/null > ~/.bash_history && history -c && exit

########## DOCKER BUILD AND PUSH ###############

# generate encrypted password

# build
docker build --no-cache -t docker-ts-debug:dev . 
# https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes

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
