module.exports = app => {
    const medication = require("../controllers/medication.controller.js");
    let router       = require("express").Router();
   
    router.post("/create", medication.create);
    
    app.use('/medication', router);
}