const sql    = require("./db.js");

// let storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, '../public/images')
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.image + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// let upload = multer({
//     storage: storage
// });
 
const Medication = function(medication) {
    this.name               = medication.name;
    this.weight_limit       = medication.weight_limit;
    this.code               = medication.code;
    // this.image              = medication.image;
};

Medication.create = (newMedication, result) => {
    sql.query("INSERT INTO medication SET ?", newMedication, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }
        console.log("Medication Added: ", { id: res.insertId, ...res });
        result(null, { id: res.insertId, ...res });
    });
};

module.exports = Medication;
