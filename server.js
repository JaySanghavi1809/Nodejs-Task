const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/item.routes")(app);
require("./app/routes/manufacture.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/userInfo.routes")(app);
require("./app/routes/viewMyOrders.routes")(app);
require("./app/routes/OrderStatus.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "Admin"
  });

  Role.create({
    id: 2,
    name: "Customer"
  });

  Role.create({
    id: 3,
    name: "Manufacturer"
  });
}

