const {
  getGiftCardOrderByUser,
  setCardData,
  getGiftCardOrderById,
  getGiftCardOrderByReceiverName,
} = require("../../dbsetup");

class GiftCardUserController {
  showUserOrder(req, res) {
    const id = req.params.id;
    const reqpage = req.query.page || 1;
    const keyword = req.query.keyword || "";
    console.log("id: ", id, " reqpage: ", reqpage, " keyword: ", keyword);
    Promise.all([
      getGiftCardOrderByUser(id, reqpage),
      getGiftCardOrderByUser(id),
      getGiftCardOrderByReceiverName(id, keyword),
      getGiftCardOrderById(keyword),
    ])
      .then(
        ([
          GcByUserPagination,
          allGcByUser,
          giftcardByReceiver,
          giftcardByid,
        ]) => {
          if ((!giftcardByid && giftcardByReceiver.length === 0) || !keyword) {
            if (keyword) {
              GcByUserPagination.message = "Not found any giftcard order!";
            }
            res.status(200).json(GcByUserPagination);
          } else if (giftcardByReceiver.length > 0 || giftcardByid) {
            const { data } = allGcByUser;
            if (giftcardByReceiver.length > 0) {
              res.status(200).json({
                data: giftcardByReceiver,
                pagination: {
                  total: giftcardByReceiver.length,
                  totalPages: Math.ceil(giftcardByReceiver.length / 3),
                },
              });
            } else {
              const isExistGiftCardId = data.filter(
                ({ card_order_id }) =>
                  card_order_id === giftcardByid.card_order_id
              );
              res.status(200).json({
                data: isExistGiftCardId,
                pagination: {
                  total: isExistGiftCardId.length,
                  totalPages: Math.ceil(isExistGiftCardId.length / 3),
                },
              });
            }
          }
        }
      )
      .catch((error) => {
        res.status(500).json({ msg: "An error occurred", error: error });
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
