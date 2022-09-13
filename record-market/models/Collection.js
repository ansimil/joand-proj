const { Schema, model } = require("mongoose");

const collectionSchema = new Schema ({
    name: String,
    description: String,
    // albums: [{
    //     type: Schema.Type.ObjectId,
    //     ref: 'Album'
    // }],
});

const Collection = model("Collection", collectionSchema);
module.exports = Collection;
