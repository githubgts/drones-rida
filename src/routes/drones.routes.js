module.exports = app => {
    const drones = require("../controllers/drones.controller.js");
    let router   = require("express").Router();
   
    router.post("/create",drones.validate('createUser'), drones.create);
    router.get("/available-loading", drones.findByStateLoading);
    router.get("/battery-capacity/:serial_no", drones.findBatterycapacityByserialno);
    router.get("/weight-limit/:serial_no", drones.findWeightLimitByserialno);
    
    app.use('/drones', router);
}