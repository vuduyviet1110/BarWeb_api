const { getUsersData } = require("../../dbsetup");

class HomePageController {
  showInfo(req, res) {
    Promise.all([getUsersData()])
      .then(([allUsers]) => {
        if (allUsers) {
          res.json(allUsers);
        } else {
          res.send("No Users have been found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }

  // get order cụ thể
  createN(req, res) {}
}

module.exports = new HomePageController();
