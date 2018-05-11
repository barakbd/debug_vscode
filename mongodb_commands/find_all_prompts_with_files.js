db.getCollection('prompts').find({
    files: {
        $ne: null
    }
})