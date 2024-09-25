const {
  getGiftCardOrders,
  removeCardData,
  putCardData,
  setCardData,
  getUserByEmail,
} = require("../../dbsetup");

class OrderController {
  //get tất cả order rượu từ khách hàng
  showAll(req, res) {
    const pageNumber = parseInt(req.query.page) || 1;
    const { sortingPayment, sortingAmount, sortingDate } = req.query;

    // Combine sorting logic
    let sortBy;
    if (sortingPayment) {
      sortBy = { sortingPayment };
    } else if (sortingAmount) {
      sortBy = { sortingAmount };
    } else if (sortingDate) {
      sortBy = { sortingDate };
    }

    // If no sorting parameter is provided, use a default sorting
    if (!sortBy) {
      sortBy = { sortingDate: "desc" };
    }

    getGiftCardOrders(pageNumber, sortBy)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
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
    } = req.body.giftcard;

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
        res.status(200).send("ok");
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
