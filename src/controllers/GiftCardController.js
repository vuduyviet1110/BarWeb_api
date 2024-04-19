const {
  getGiftCardOrders,
  removeCardData,
  putCardData,
} = require("../../dbsetup");

class OrderController {
  //get tất cả order rượu từ khách hàng
  showAll(req, res) {
    getGiftCardOrders()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
  }

  // get order cụ thể theo người dùng
  showDetails(req, res) {
    const id = req.params.id;
    getGiftCardOrderByOrder(id)
      .then((order) => {
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
      });
  }

  updateCard(req, res) {
    const {
      card_id,
      card_status_id,
      payment_method,
      user_id,
      receiver_name,
      receiver_mail,
      receiver_phone,
      receiver_address,
      message,
      card_order_id,
    } = req.body.MatchedGiftCard;
    console.log(
      card_id,
      card_status_id,
      payment_method,
      user_id,
      receiver_name,
      receiver_mail,
      receiver_phone,
      receiver_address
    );
    putCardData(
      card_id,
      card_status_id,
      payment_method,
      user_id,
      receiver_name,
      receiver_mail,
      receiver_phone,
      receiver_address,
      message,
      card_order_id
    )
      .then(() => {
        res.send("Fix order success");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
  }

  deleteOrder(req, res) {
    const { giftCardId } = req.body;
    removeCardData(giftCardId)
      .then(() => {
        res.send("Order " + giftCardId + " deleted!");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
  }
}
module.exports = new OrderController();
