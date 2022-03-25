const Loadingmedication = require("../models/loadingmedication.models");
const Drones            = require("../models/drones.models");
const Medication        = require("../models/medication.models");

const fetch  = require('node-fetch');
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
    Drones.findBatterycapacityByserialno(req.body.drone_serial_no, (err, data) => {
        
        const battery_level = parseInt(JSON.stringify(Object.values(JSON.parse(JSON.stringify(data)))[0]));
        
        if(battery_level > 25){
        
            Drones.findWeightLimitByserialno(req.body.drone_serial_no, (err, data) => {
                const drones_weight = parseInt(JSON.stringify(Object.values(JSON.parse(JSON.stringify(data)))[0]));
                if (err) {
                    console.log("error: ", err);
                    return result(err, null);
                } 

                Medication.findWeightLimitBycode(req.body.med_code, (err, data) => {

                    if (err) {
                        console.log("error: ", err);
                        return result(err, null);
                    }   

                    data = Object.values(JSON.parse(JSON.stringify(data)));
                    let weight_limit = data.map(function(item) {
                        return item['weight_limit'];
                    })
                    let total_med_weight = weight_limit.reduce((a, b) => a + b, 0);

                    if (total_med_weight < drones_weight){
                        Loadingmedication.create(loadingmedication, (err, data) => {
                            if (err)
                                res.status(500).send({
                                    message:
                                    err.message || "Medication not loaded due to some errors"
                                });
                            else res.send(data);
                        });
                    }else{
                        res.send({
                            error: "Medication weight is greater than drone weight"
                        });
            
                    }
                });
            })       
        } else{
            res.send({
                error: "Battery Level is above 25% of drone serial no. : " + req.params.drone_serial_no
            });
        }
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