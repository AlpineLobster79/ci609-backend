const service = require("../services/sightings");

exports.create = async (req, res) => {
    console.log("File received:", req.file);
    try {
        const sighting = await service.create(req.body, req.file);
        res.status(201).json(sighting);
        console.log("File received:", req.file);
    } catch (err) {
        next(err);  //-> server.js error handler
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const sightings = await service.getAll();
        res.json(sightings);
    } catch (err) {
        next(err);
    }
};