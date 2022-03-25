const sql    = require("./db.js");
const fetch  = require('node-fetch');

 
const Loadingmedication = function(medication) {
    this.drone_serial_no    = medication.drone_serial_no;
    this.med_code           = medication.med_code;
};

Loadingmedication.create = (newloadingMedication, result) => {
    
    fetch('http://localhost:3000/drones/battery-capacity/'+newloadingMedication.drone_serial_no)
    .then(res => res.json())
    .then(json  => {
        const battery_level = parseInt(JSON.stringify(Object.values(JSON.parse(JSON.stringify(json)))[0]));
        if(battery_level > 25){
            if(typeof newloadingMedication.med_code === 'string'){
                sql.query("INSERT INTO loading_medications SET ?", newloadingMedication, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        return result(err, null);
                    }
                    console.log("Medication Loaded: ", { id: res.insertId, ...newloadingMedication });
                    result(null, { id: res.insertId, ...newloadingMedication });
                });

            }else{

                let medcode_length = Object.keys(newloadingMedication.med_code).length;
                for (let index = 0; index < medcode_length; index++) {          
                
                    let medication = { 
                        drone_serial_no : newloadingMedication.drone_serial_no,
                        med_code        : newloadingMedication.med_code[index],
                    }           
                    sql.query("INSERT INTO loading_medications SET ?", medication, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            return result(err, null);
                        }
                        
                        console.log("Medication Added: ", { id: res.insertId, ...medication });
                        result(null, { id: res.insertId, ...medication });
                    });
                }
            }
        }else result({ message: "Drones Battery Level is less than 25%" }, null);;

    });
};

Loadingmedication.findMedicationsByDrones = (drone_serial_no, result) => {
    sql.query(`select name, code, weight_limit, image from medication inner join loading_medications on medication.code = loading_medications.med_code WHERE loading_medications.drone_serial_no = '${drone_serial_no}'`, (err, res) => {
        console.log(err);
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }
        console.log(drone_serial_no);
        if (res.length) {
            console.log("Medications: ", res);
            return result(null, res);
        }
        
        result({ message: "Medications not found" }, null);
    });
};


module.exports = Loadingmedication;
