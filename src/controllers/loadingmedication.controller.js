const Loadingmedication = require("../models/loadingmedication.models");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    const loadingmedication = new Loadingmedication({
        drone_serial_no :   req.body.drone_serial_no,
        med_code        :   req.body.med_code,
    }); 

    Loadingmedication.create(loadingmedication, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Medications not loaded due to some errors"
            });
        else res.send(data);
    });
};


exports.findMedicationsByDrones = (req, res) => {
    Loadingmedication.findMedicationsByDrones(req.params.drone_serial_no, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Medications not found of drone serial no : ${req.params.drone_serial_no}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving battery capacity of drone serial no : " + req.params.drone_serial_no
                });
            }
        } else res.send(data);
    });
};