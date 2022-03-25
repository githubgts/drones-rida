const Drones = require("../models/drones.models");
// const { body } = require('express-validator/check')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const drones = new Drones({
        serial_no:          req.body.serial_no,
        model:              req.body.model,
        weight_limit:       req.body.weight_limit,
        battery_capacity:   req.body.battery_capacity,
        state:              req.body.state
    }); 

    Drones.create(drones, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Drone not created due to some errors"
            });
        else res.send(data);
    });
};

const { body } = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [ 
                body('serial_no', 'userName doesnt exists').isArray(),
            ]   
        }
    }
}
exports.findByStateLoading = (req, res) => {
    Drones.findByStateLoading((err, data) => {
        console.log(err);
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving drones available for loading."
            });
        else res.send(data);
    });
};

exports.findBatterycapacityById = (req, res) => {
    Drones.findBatterycapacityById((err, data) => {
        console.log(err);
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving battery capacity."
        });
        else res.send(data);
    });
};

exports.findBatterycapacityByserialno = (req, res) => {
    Drones.findBatterycapacityByserialno(req.params.serial_no, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Battery Capacity not found of drone serial no : ${req.params.serial_no}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving battery capacity of drone serial no : " + req.params.serial_no
                });
            }
        } else res.send(data);
    });
};

exports.updateById = (req, res) => {
 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Drones.updateById(
        new Drones(req.body),
        (err, data) => {
            if (err) {
                if (err.message === "not_found") {
                    res.status(404).send({
                        message: `Drones not found with serial no.: ${req.params.serial_no}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating drone with id serial no.: ${req.params.serial_no}`
                    });
                }
            } else res.send(data);
        }
    );
};
