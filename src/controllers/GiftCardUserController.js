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

      const card_status_id = 2;
      const payment_method = "Credit card";
      var card_id;

      if (user_amount == "10") {
        card_id = 1;
      }

      if (user_amount == "20") {
        card_id = 2;
      }

      if (user_amount == "50") {
        card_id = 3;
      }
      if (user_amount == "100") {
        card_id = 4;
      }

      setCardData(
        card_id,
        card_status_id,
        user_id,
        payment_method,
        receiver_name,
        receiver_mail,
        receiver_phone,
        receiver_address,
        receiver_message
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
