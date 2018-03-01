#!/bin/bash
# run with - fswatch -0 ./test_node.sh | xargs -0 -n1 -I {} sh ./test_node.sh
# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

# ============================================== Functions

which_node=$(which node);

set -e;

if [[ -z "$which_node" ]]; then
    # install the desired version

    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# if node -v >/dev/null 2>&1 = "v8.5.0";
elif [[ "$(node -v)" ==  "v9"* ]]
  then
  echo_pass `node -v`
  else
  echo_fail `node -v`
fi
# command line programs
# echo "node    $(echo_if $(program_is_installed node))"

# local npm packages
# echo "typescript  $(echo_if $(npm_package_is_installed typescript))"
