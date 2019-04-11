const mongoose = require('mongoose');

const file = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
      type: String,
      required: true
    }
}, {
    //Register creation and update times
    timestamps: true,
    // Call virtual for "file" everytime its converted to JSON or to Object
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

// Returns cloud saved file path
file.virtual("url").get(function () {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('file', file);
