const Box = require('../models/box');

class BoxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title });

        return res.json(box);
    }

    async show(req, res) {
        // Populate return all items on a schema
        const box = await  Box.findById(req.params.id).populate({
            path: 'files',
            // Sort files by decreasing date creation
            options: {sort: { createdAt: -1 }}
        });

        return res.json(box);
    }
}

module.exports = new BoxController();
