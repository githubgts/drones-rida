module.exports = app => {
    const drones = require("../controllers/drones.controller.js");
    let router   = require("express").Router();
   
    router.post("/create",drones.validate('createUser'), drones.create);
    router.get("/available-loading", drones.findByStateLoading);
    router.get("/battery-capacity/:serial_no", drones.findBatterycapacityByserialno);
    // router.put("/update/:serial_no", drones.updateById);
    
    app.use('/drones', router);
}