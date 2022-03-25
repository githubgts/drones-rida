const sql = require("./db.js");

const Drones = function(drones) {
    this.serial_no          = drones.serial_no;
    this.model              = drones.model;
    this.weight_limit       = drones.weight_limit;
    this.battery_capacity   = drones.battery_capacity;
    this.state              = drones.state;
  };


Drones.create = (newDrone, result) => {
    sql.query("INSERT INTO drones SET ?", newDrone, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }
        console.log("Drone Added: ", { id: res.insertId, ...newDrone });
        result(null, { id: res.insertId, ...newDrone });
    });
};

Drones.findByStateLoading = (result) => {
    sql.query(`SELECT serial_no, model, weight_limit, battery_capacity, state FROM drones WHERE state = 'LOADING' OR state = 'IDLE' `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        
        }
        if (res.length) {
            console.log("Drones: ", res);
            return result(null, res);
        }
        
        result({ message: "No drones available in loading state" }, null);
    });
};

Drones.findBatterycapacityByserialno = (serial_no, result) => {
    sql.query(`SELECT battery_capacity FROM drones WHERE serial_no = '${serial_no}'`, (err, res) => {
        console.log(err);
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        if (res.length) {
            console.log("Drones: ", res[0]);
            return result(null, res[0]);
        }
        
        result({ message: "Battery Level not found" }, null);
    });
};

// Drones.updateById = (drones, result) => {
//     sql.query(
//         "UPDATE drones SET model = ?, weight_limit = ?, battery_capacity = ?, state = ? WHERE serial_no = ?",
//         [ drones.model, drones.weight_limit, drones.battery_capacity, drones.state, drones.serial_no],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 return result(null, err);
//             }
//             if (res.affectedRows == 0) {
//                 return result({ message: "not_found" }, null);
//             }
//             console.log("Drone Updated: ", { serial_no: serial_no, ...tutorial });
//             result(null, { serial_no: serial_no, ...tutorial });
//         }
//     );
// };

module.exports = Drones;
