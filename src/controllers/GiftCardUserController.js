const { getGiftCardOrderByUser, setCardData } = require("../../dbsetup");

class GiftCardUserController {
  // show order
  showUserOrder(req, res) {
    const id = req.params.id;
    getGiftCardOrderByUser(id)
      .then((order) => {
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
      });
  }

  // create an order
  create(req, res) {
    try {
      const {
        user_amount,
        user_id,
        receiver_name,
        receiver_mail,
        receiver_phone,
        receiver_address,
        receiver_message,
      } = req.body;

      const card_status_id = 1;

      setCardData(
        card_status_id,
        user_id,
        receiver_name,
        receiver_mail,
        receiver_phone,
        receiver_address,
        receiver_message,
        user_amount
      )
        .then(() => {
          res.send("Order success");
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("An error occurred");
        });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }
}
module.exports = new GiftCardUserController();
