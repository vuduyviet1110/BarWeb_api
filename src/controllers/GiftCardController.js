const {
  getGiftCardOrders,
  removeCardData,
  putCardData,
  setCardData,
  getUserByEmail,
  getUserById,
  getGiftCardOrderByOrder,
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
      card_status_id,
      user_id,
      receiver_name,
      receiver_mail,
      receiver_phone,
      receiver_address,
      message,
      user_amount,
      card_order_id,
    } = req.body.MatchedGiftCard;

    putCardData(
      card_status_id,
      user_id,
      receiver_name,
      receiver_mail,
      receiver_phone,
      receiver_address,
      message,
      user_amount,
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
  async create(req, res) {
    try {
      const {
        user_amount,
        user_gmail,
        receiver_name,
        receiver_mail,
        receiver_phone,
        receiver_address,
        message,
      } = req.body.newGiftCardOrder;

      const card_status_id = 1;

      const existedUser = await getUserByEmail(user_gmail);
      if (existedUser?.user_id)
        setCardData(
          card_status_id,
          existedUser.user_id,
          receiver_name,
          receiver_mail,
          receiver_phone,
          receiver_address,
          message,
          user_amount
        )
          .then(() => {
            res.send("Order success");
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("An error occurred");
          });
      else {
        res.send("not existed");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }
}
module.exports = new OrderController();
