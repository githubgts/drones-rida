module.exports = app => {
    const loadingmedication = require("../controllers/loadingmedication.controller.js");
    let router              = require("express").Router();
   
    router.post("/medications", loadingmedication.create);
    router.get("/medications/:drone_serial_no", loadingmedication.findMedicationsByDrones);
    
    app.use('/load', router);
}