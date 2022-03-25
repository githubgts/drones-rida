const Medication = require("../models/medication.models");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.file);

    const medication = new Medication({
        name:           req.body.name,
        weight_limit:   req.body.weight_limit,
        code:           req.body.code,
        // image:          req.file.image
    }); 

    Medication.create(medication, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Medication not created due to some errors"
            });
        else res.send(data);
    });
};
exports.findWeightLimitBycode = (req, res) => {
    Medication.findWeightLimitBycode(req.params.code, (err, data) => {
        if (err) {
            if (err.message === "not_found") {
                res.status(404).send({
                    message: `Weight limit not found of medication serial no : ${req.params.code}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving weight limit of medication serial no : " + req.params.code
                });
            }
        } else res.send(data);
    });
};

