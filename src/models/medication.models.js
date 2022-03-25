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

Medication.findWeightLimitBycode = (code, result) => {
    code = Object.values(code).join(',');

    
    let query = "SELECT weight_limit FROM medication WHERE ";
    if (code.includes(",")) {  
        let codes = code.split(",");
        codes.map((o,i)=>{
            query += "code = '"+o+"' ";
            if(i==codes.length -1){
                query += "";   
            }
            else query += "OR ";
        }) 
    } else{
        query += "code ='%"+code+"%' ";
    }
    sql.query(query, (err, res) => {
        console.log(query )
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }

        if (res.length) {
            console.log("Medication: ", res);
            return result(null, res);
        }
        
        result({ message: "Weight Limit not found" }, null);
    });
};
module.exports = Medication;
