const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;