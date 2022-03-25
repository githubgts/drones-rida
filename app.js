const express           = require("express");
const expressValidator  = require('express-validator');
const app               = express();
const cors              = require('cors');
const path              = require('path');
const multer            = require('multer');
const port              = process.env.port || 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(expressValidator());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(multer({dest:'./src/public/images'}).single('image'));

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

require("./src/routes/drones.routes.js")(app);

require("./src/routes/medication.routes.js")(app);

require("./src/routes/loadingmedication.routes.js")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});