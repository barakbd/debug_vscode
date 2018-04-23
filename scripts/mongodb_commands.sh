#Connect to dev db:
mongo mngdb-cbt-stg-01:27058,mngdb-cbt-stg-02:27058,mngdb-cbt-stg-03:27058/cdt_dev?replicaSet=cbt-stg-rep --authenticationDatabase cdt_dev -u cdtdev
p -p ‘cdTd3v’  --quiet

# Find all acquisition with linked folder information
db.getCollection('acquisitions').find({acq_folder_id: {$ne:null}})

# Clear all acquisition from folders:
db.getCollection('acquisitions').updateMany({}, {$unset:{acq_folder_id:"", acq_folder_metadata:"", ws_folders:"", cdt_folders:""}})

# Find all prompts with files
db.getCollection('prompts').find({files: {$ne: null}})

# Clear all files from all prompts
db.getCollection('prompts').updateMany({}, {$unset:{files:""}})
