const { getUsersData } = require("../../dbsetup");

class HomePageController {
  showInfo(req, res) {
    Promise.all([getUsersData()])
      .then(([allUsers]) => {
        const reqId = req.params.id.toString();
        const matchedId = allUsers.find(
          (user) => user.user_id.toString() === reqId
        );
        if (matchedId) {
          console.log(matchedId);
          console.log(reqId);
          res.json(matchedId);
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
