exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};


exports.CustomerBoard = (req, res) => {
  res.status(200).send("Customer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.manufacturerBoard = (req, res) => {
  res.status(200).send("Manufacturer Content.");
};