require("dotenv").config();
const mysql = require("mysql2");

// Database connection configuration
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
  port: process.env.MYSQL_PORT,
  ssl: {
    rejectUnauthorized: false, // Tắt kiểm tra chứng chỉ
  },
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

const createTablesQuery = `
  -- Create users table
  CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_DOB DATE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_gmail VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin (
    admin_id INT NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(50) NOT NULL,
    admin_password VARCHAR(50) NOT NULL,
    PRIMARY KEY (admin_id)
  );

  CREATE TABLE IF NOT EXISTS card_status (
    card_status_id INT NOT NULL AUTO_INCREMENT,
    card_status TINYINT(1) DEFAULT NULL,
    PRIMARY KEY (card_status_id)
  );

  

  CREATE TABLE IF NOT EXISTS events (
    event_id INT NOT NULL AUTO_INCREMENT,
    admin_id INT DEFAULT NULL,
    description VARCHAR(5000) DEFAULT NULL,
    title VARCHAR(2000) DEFAULT NULL,
    image VARCHAR(1000) DEFAULT NULL,
    PRIMARY KEY (event_id),
    KEY (admin_id),
    CONSTRAINT events_ibfk_1 FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
  );

  CREATE TABLE IF NOT EXISTS gift_card (
    card_id INT NOT NULL AUTO_INCREMENT,
    gift_card_selection VARCHAR(20) DEFAULT NULL,
    price INT DEFAULT NULL,
    PRIMARY KEY (card_id)
  );

  CREATE TABLE IF NOT EXISTS order_giftcard (
    card_order_id INT NOT NULL AUTO_INCREMENT,
    card_id INT DEFAULT NULL,
    card_status_id INT DEFAULT NULL,
    payment_method VARCHAR(20) DEFAULT NULL,
    user_id INT DEFAULT NULL,
    receiver_name VARCHAR(50) DEFAULT NULL,
    receiver_mail VARCHAR(50) DEFAULT NULL,
    receiver_phone VARCHAR(10) DEFAULT NULL,
    receiver_address VARCHAR(300) DEFAULT NULL,
    message VARCHAR(600) DEFAULT NULL,
    PRIMARY KEY (card_order_id),
    KEY user_id (user_id),
    KEY card_id (card_id),
    KEY card_status_id (card_status_id),
    CONSTRAINT order_giftcard_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT order_giftcard_ibfk_2 FOREIGN KEY (card_id) REFERENCES gift_card (card_id),
    CONSTRAINT order_giftcard_ibfk_3 FOREIGN KEY (card_status_id) REFERENCES card_status (card_status_id)
  );

  CREATE TABLE IF NOT EXISTS our_story (
    ourstory_id INT AUTO_INCREMENT PRIMARY KEY,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id INT DEFAULT NULL,
    content VARCHAR(1000) DEFAULT NULL,
    title VARCHAR(2000)  NOT NULL,
    bgimage VARCHAR(2000) NOT NULL, 
    slideimage VARCHAR(2000) NOT NULL, 
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) 
  );
  

  CREATE TABLE IF NOT EXISTS beverage (
    bev_id INT NOT NULL AUTO_INCREMENT,
    admin_id INT DEFAULT NULL,
    description VARCHAR(5000) DEFAULT NULL,
    price int DEFAULT NULL,
    image VARCHAR(1000) DEFAULT NULL,
    PRIMARY KEY (bev_id),
    KEY (admin_id),
    CONSTRAINT beverage_ibfk_1 FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
  );

  CREATE TABLE IF NOT EXISTS gallery (
    img_id INT NOT NULL AUTO_INCREMENT,
    img varchar(1000) NOT NULL,
    PRIMARY KEY (img_id),
    admin_id INT DEFAULT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) 

  );
  CREATE TABLE IF NOT EXISTS reservation (
    reservation_id INT NOT NULL AUTO_INCREMENT,
    table_id INT DEFAULT NULL,
    reservation_status_id INT DEFAULT NULL,
    user_id INT DEFAULT NULL,
    table_date DATE DEFAULT NULL,
    table_time TIME DEFAULT NULL,
    table_status TINYINT(1) DEFAULT NULL,
    PRIMARY KEY (reservation_id),
    KEY table_id (table_id),
    KEY reservation_status_id (reservation_status_id),
    KEY user_id (user_id),
    CONSTRAINT reservation_ibfk_1 FOREIGN KEY (table_id) REFERENCES table_slots (table_id),
    CONSTRAINT reservation_ibfk_2 FOREIGN KEY (reservation_status_id) REFERENCES reservation_status (reservation_status_id),
    CONSTRAINT reservation_ibfk_3 FOREIGN KEY (user_id) REFERENCES users (user_id)
  );

  CREATE TABLE IF NOT EXISTS title (
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id INT DEFAULT NULL,
    content VARCHAR(1000) DEFAULT NULL,
    title_id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(2000) NOT NULL, 
    title VARCHAR(2000)  NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) 
  );
  
  
`;

// const initDataQuery = `
// -- Chèn dữ liệu vào bảng users
// INSERT INTO users (user_DOB, user_name, user_gmail, user_password)
// VALUES ('1990-01-01', 'John Doe', 'john@example.com', 'password123');

// -- Chèn dữ liệu vào bảng admin
// INSERT INTO admin (admin_name, admin_password)
// VALUES ('Admin', 'adminpassword');

// -- Chèn dữ liệu vào bảng card_status
// INSERT INTO card_status (card_status)
// VALUES (1);

// -- Chèn dữ liệu vào bảng content
// INSERT INTO content (content_columns)
// VALUES ('column1');

// -- Chèn dữ liệu vào bảng events
// INSERT INTO events (upload_time, admin_id, content, title)
// VALUES ('2024-04-07 10:00:00', 1, 'Event content', 'Event title');

// -- Chèn dữ liệu vào bảng gift_card
// INSERT INTO gift_card (gift_card_selection, price)
// VALUES ('Gift card 1', 50);

// -- Chèn dữ liệu vào bảng order_giftcard
// INSERT INTO order_giftcard (card_id, card_status_id, payment_method, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message)
// VALUES (1, 1, 'Credit card', 1, 'Receiver Name', 'receiver@example.com', '1234567890', 'Receiver Address', 'Gift message');

// -- Chèn dữ liệu vào bảng our_story
// INSERT INTO our_story (upload_time, admin_id, content, title)
// VALUES ('2024-04-07 10:00:00', 1, 'Our story content', 'Our story title');

// -- Chèn dữ liệu vào bảng reservation_status
// INSERT INTO reservation_status (reservation_status)
// VALUES (1);

// -- Chèn dữ liệu vào bảng table_slots
// INSERT INTO table_slots (table_number)
// VALUES (1);

// -- Chèn dữ liệu vào bảng reservation
// INSERT INTO reservation (table_id, reservation_status_id, user_id, table_date, table_time, table_status)
// VALUES (1, 1, 1, '2024-04-07', '12:00:00', 1);

// -- Chèn dữ liệu vào bảng title
// INSERT INTO title (upload_time, admin_id, content, title)
// VALUES ('2024-04-07 10:00:00', 1, 'Title content', 'Title title');
// `;

connection.query(createTablesQuery, (err) => {
  if (err) {
    console.error("Error creating tables:", err.message);
    return;
  }
  // connection.query(initDataQuery, (err) => {
  //   if (err) {
  //     console.error("Error initializing data:", err.message);
  //   } else {
  //     console.log("Data initialized successfully");
  //   }
  // });
});

//các functions

function setUserData(
  user_name,
  user_email,
  user_password,
  user_dob,
  user_phone
) {
  return new Promise((resolve, reject) => {
    const sqlInsertQuery = `
      INSERT INTO users (user_name, user_gmail, user_password, user_DOB, user_phone)
      VALUES (?, ?, ?, STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), ?);
    `;
    connection.query(
      sqlInsertQuery,
      [user_name, user_email, user_password, user_dob, user_phone],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Inserted record ID:", result.insertId);
          resolve(result);
        }
      }
    );
  });
}

function getUsersData() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function UpdatePassword(id, password) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET user_password = ? WHERE user_id = ?",
      [password, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}

function getUserByEmail(userEmail) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE user_gmail = ?",
      [userEmail],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}

// Remove Card (admin)
function removeCardData(card_order_id) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM order_giftcard WHERE card_order_id = ?";
    const values = [card_order_id];
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//Update giftcard (for admin usage)
function putCardData(
  card_status_id,
  user_id,
  receiver_name,
  receiver_mail,
  receiver_phone,
  receiver_address,
  message,
  user_amount,
  card_order_id
) {
  const query = `
    UPDATE order_giftcard
    SET 
      card_status_id = ?,
      user_id = ?,
      receiver_name = ?,
      receiver_mail = ?,
      receiver_phone = ?,
      receiver_address = ?,
      message = ?, 
      user_amount = ?
    WHERE card_order_id = ?;
  `;
  const values = [
    card_status_id,
    user_id,
    receiver_name,
    receiver_mail,
    receiver_phone,
    receiver_address,
    message,
    user_amount,
    card_order_id,
  ];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//Get all giftcard orders(for admin usage)
function getGiftCardOrders(page, sortBy) {
  const limit = 4;
  const offset = (page - 1) * limit;

  // Validate order parameter
  const validOrders = ["sortingDate", "sortingPayment", "sortingAmount"];

  if (!sortBy || !validOrders.includes(Object.keys(sortBy)[0])) {
    return Promise.reject(new Error("Invalid order parameter"));
  }

  return new Promise((resolve, reject) => {
    let query = "";
    const sortKey = Object.keys(sortBy)[0];
    const sortOrder = Object.values(sortBy)[0].toUpperCase();

    switch (sortKey) {
      case "sortingDate":
        query = `
          SELECT r.*, u.user_name, u.user_phone, u.user_gmail
          FROM order_giftcard AS r
          JOIN users AS u ON r.user_id = u.user_id
          ORDER BY r.createdAt ${sortOrder}
          LIMIT ? OFFSET ?`;
        break;
      case "sortingPayment":
        query = `
          SELECT r.*, u.user_name, u.user_phone, u.user_gmail
          FROM order_giftcard AS r
          JOIN users AS u ON r.user_id = u.user_id
          ORDER BY r.card_status_id ${sortOrder}
          LIMIT ? OFFSET ?`;
        break;
      case "sortingAmount":
        query = `
          SELECT r.*, u.user_name, u.user_phone, u.user_gmail
          FROM order_giftcard AS r
          JOIN users AS u ON r.user_id = u.user_id
          ORDER BY CAST(r.user_amount AS DECIMAL(10,2)) ${sortOrder}
          LIMIT ? OFFSET ?`;
        break;
      default:
        return reject(new Error("Invalid order parameter"));
    }

    // Execute the query with limit and offset parameters
    connection.query(query, [limit, offset], (err, result) => {
      if (err) {
        reject(err);
      } else {
        connection.query(
          "SELECT COUNT(*) AS total FROM order_giftcard",
          (err, [{ total }]) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                pagination: {
                  total,
                  totalPages: Math.ceil(total / limit),
                },
                data: result,
              });
            }
          }
        );
      }
    });
  });
}

//Get giftcard order by order id(for admin usage)
function getGiftCardOrderById(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select r.*, u.user_name, u.user_phone, u.user_gmail From order_giftcard as r join users as u on r.user_id = u.user_id where card_order_id = ?`,
      id,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}
function getGiftCardOrderByReceiverName(user_id, receiver_name) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT r.*, u.user_name, u.user_phone, u.user_gmail 
       FROM order_giftcard AS r 
       JOIN users AS u ON r.user_id = u.user_id 
       WHERE r.user_id = ? AND r.receiver_name LIKE ?`,
      [user_id, `%${receiver_name}%`],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

//Get giftcard order by user id(for user usage)
function getGiftCardOrderByUser(id, page = null) {
  const recordsPerPage = 2;
  let offset = 0;
  let limit = recordsPerPage;
  if (page === null) {
    limit = null;
    offset = null;
  } else {
    offset = (page - 1) * recordsPerPage;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `Select * From order_giftcard where user_id = ? ${
        limit ? "LIMIT ? OFFSET ?" : ""
      }`,
      [...(limit ? [id, limit, offset] : [id])],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total_records FROM order_giftcard where user_id = ?",
            [id],
            (err, [{ total_records: total }]) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  pagination: {
                    total,
                    totalPages: limit
                      ? Math.ceil(total / recordsPerPage)
                      : null,
                  },
                  data: result,
                });
              }
            }
          );
        }
      }
    );
  });
}

//Create giftcard (for user usage)
function setCardData(
  card_status_id,
  user_id,
  receiver_name,
  receiver_mail,
  receiver_phone,
  receiver_address,
  message,
  user_amount
) {
  const query = `INSERT INTO order_giftcard (card_status_id, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, message,user_amount)
               VALUES (?, ?, ?, ?,?, ?, ?, ?)`;
  const values = [
    card_status_id,
    user_id,
    receiver_name,
    receiver_mail,
    receiver_phone,
    receiver_address,
    message,
    user_amount,
  ];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
const formatDateForMySQL = (dob) => {
  const date = new Date(dob);
  // Kiểm tra nếu date không hợp lệ
  if (isNaN(date)) {
    throw new Error("Ngày sinh không hợp lệ");
  }
  // Trả về định dạng YYYY-MM-DD
  return date.toISOString().split("T")[0];
};
function updateUserData(
  user_name,
  user_gmail,
  user_password,
  user_DOB,
  user_phone,
  user_id
) {
  const formattedDOB = formatDateForMySQL(user_DOB);
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET user_name = ?, user_gmail = ?, user_password = ?, user_DOB = ?, user_phone = ? WHERE user_id = ?",
      [user_name, user_gmail, user_password, formattedDOB, user_phone, user_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function updateUserAcc(user_gmail, user_password) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET  user_password = ? WHERE user_gmail = ?",
      [user_password, user_gmail],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function deleteAcc(user_id) {
  return new Promise((resolve, reject) => {
    const sqlDeleteGiftCardQuery =
      "DELETE FROM order_giftcard WHERE user_id = ?;";
    const sqlDeleteReservationQuery =
      "DELETE FROM reservation WHERE user_id = ?;";
    const sqlDeleteUserQuery = "DELETE FROM users WHERE user_id = ?;";

    connection.query(sqlDeleteGiftCardQuery, user_id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sqlDeleteReservationQuery, user_id, (err, result) => {
          if (err) {
            reject(err);
          } else {
            connection.query(sqlDeleteUserQuery, user_id, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }
        });
      }
    });
  });
}

//Booking
function setBookingData(
  user_id,
  table_date,
  table_time,
  number_people,
  message,
  guest_id
) {
  const query = `INSERT INTO reservation (user_id, table_date, table_time, number_people, message, guest_id)
                 VALUES (?, STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), ?, ?, ?,?)`;
  const values = [
    user_id,
    table_date,
    table_time,
    number_people,
    message,
    guest_id,
  ];

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function getOnlyResData() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM reservation `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getOnlyResDataById(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM reservation where reservation_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

// admin auth
function getAllAdmins() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM admin `, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function getAllAdminById(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM admin Where admin_id= ? `,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

//get all Reservation(for admin)
function getBookingById(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT r.*, u.user_name, u.user_phone, u.user_gmail, g.guest_name, g.guest_phone, g.guest_gmail FROM reservation AS r LEFT JOIN users AS u ON r.user_id = u.user_id LEFT JOIN users_noacc AS g ON r.guest_id = g.guest_id WHERE reservation_id = ? LIMIT 1",
      id,
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          reject(new Error("Reservation not found"));
        } else {
          resolve(result[0]);
        }
      }
    );
  });
}
function getBookingData(page) {
  const recordsPerPage = 4;
  const offset = (page - 1) * recordsPerPage;

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT r.*, u.user_name, u.user_phone, u.user_gmail, 
        g.guest_name, g.guest_phone, g.guest_gmail
       FROM reservation AS r
       LEFT JOIN users AS u ON r.user_id = u.user_id
       LEFT JOIN users_noacc AS g ON r.guest_id = g.guest_id
       LIMIT ? OFFSET ?`,
      [recordsPerPage, offset],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          connection.query(
            `SELECT COUNT(*) AS total_records FROM reservation`,
            (err, [{ total_records: total }]) => {
              if (err) {
                reject(err);
              } else {
                console.log(total);
                resolve({
                  pagination: {
                    total: total,
                    totalPages: Math.ceil(total / recordsPerPage),
                  },
                  data: result,
                });
              }
            }
          );
        }
      }
    );
  });
}

//edit a booking data(for admin)
function updateBookingData(
  reservation_id,
  table_date,
  table_time,
  number_people,
  message
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE reservation SET table_date = ?, table_time = ?, number_people = ?, message = ? WHERE reservation_id = ?",
      [table_date, table_time, number_people, message, reservation_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

//delete reservation
function deleteReservation(reservation_id) {
  return new Promise((resolve, reject) => {
    const sqlDeleteReservationQuery =
      "DELETE FROM reservation WHERE reservation_id = ?";
    connection.query(
      sqlDeleteReservationQuery,
      reservation_id,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function EmailExisted(user_email) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE user_gmail = ? ",
      [user_email],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length);
        }
      }
    );
  });
}
function EmailExistedApartFromCurrentUser(user_email, current_user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE user_gmail = ? AND user_id != ? ",
      [user_email, current_user_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length);
        }
      }
    );
  });
}
function setBookingDataNoAcc(
  guest_id,
  table_date,
  table_time,
  number_people,
  message
) {
  const query = `INSERT INTO reservation (guest_id, table_date, table_time, number_people, message)
                 VALUES (?, ?, ?, ?, ?)`;
  const values = [guest_id, table_date, table_time, number_people, message];
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
function setUserNoAccData(user_name, user_email, user_phone) {
  return new Promise((resolve, reject) => {
    const sqlInsertQuery = `
      INSERT INTO users_noacc (guest_name, guest_gmail, guest_phone)
      VALUES (?, ?, ?);
    `;

    connection.query(
      sqlInsertQuery,
      [user_name, user_email, user_phone],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function getUserNoAccByMail(userEmail) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT guest_id FROM users_noacc WHERE guest_gmail = ?",
      [userEmail],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Resolve with guest_id value
        }
      }
    );
  });
}
function ModifyTitleContent(admin_id, content, title, image) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE title
      SET admin_id = ?, content = ?, title = ?, image = ?
      WHERE title_id = 1`,
      [admin_id, content, title, image],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function getTitleContent() {
  return new Promise((resolve, reject) => {
    connection.query(`Select * from title`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function getOurStory() {
  return new Promise((resolve, reject) => {
    connection.query(`Select * from our_story`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function ModifyOurStory(admin_id, content, title, bgimg, slideimg) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE our_story
      SET admin_id = ?, content = ?, title = ?, bgimage = ?, slideimage = ?
      WHERE ourstory_id = 1`,
      [admin_id, content, title, bgimg, slideimg],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function ModifyGallery(galleryImg, admin_id, img_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE gallery
      SET img= ?, admin_id = ?
      WHERE img_id = ?`,
      [galleryImg, admin_id, img_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function ModifyGalleryNotAdmin(galleryImg, img_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE gallery
      SET img= ?
      WHERE img_id = ?`,
      [galleryImg, img_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getGalleryImg() {
  return new Promise((resolve, reject) => {
    connection.query(`select * from gallery`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function getEvents() {
  return new Promise((resolve, reject) => {
    connection.query(`Select * from events`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function ModifyEvents(admin_id, description, title, image, event_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE events
      SET admin_id = ?, description = ?, title = ?, image = ?
      WHERE event_id = ?`,
      [admin_id, description, title, image, event_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
function getBeverage() {
  return new Promise((resolve, reject) => {
    connection.query(`Select * from beverage`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function ModifyBeverage(admin_id, name, description, price, image, bev_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE beverage
      SET admin_id = ?, name = ?, description = ?, price = ?, image = ?
      WHERE bev_id = ?`,
      [admin_id, name, description, price, image, bev_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
const searchInDatabase = async (field, keyword) => {
  return new Promise((resolve, reject) => {
    let sql = "";

    // Dựa trên field, chọn bảng và cột tương ứng
    if (field === "user") {
      sql = "SELECT * FROM users WHERE user_name LIKE ?";
    } else if (field === "reservation") {
      sql = `
  SELECT r.*, u.user_name, user_phone, user_gmail
  FROM reservation AS r
  JOIN users AS u ON r.user_id = u.user_id
  WHERE u.user_name LIKE ?
`;
    } else if (field === "giftcard") {
      sql =
        "SELECT r.*, u.user_name, user_phone, user_gmail FROM order_giftcard as r JOIN users as u ON r.user_id = u.user_id WHERE user_name LIKE ?";
    } else {
      reject(new Error("Invalid field"));
      return;
    }

    const queryKeyword = `%${keyword}%`;

    // Thực thi truy vấn SQL
    connection.query(sql, [queryKeyword], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  setUserData,
  getUsersData,
  getUserById,
  UpdatePassword,
  updateUserData,
  updateUserAcc,
  deleteAcc,
  EmailExisted,
  getGiftCardOrders,
  getGiftCardOrderByUser,
  getGiftCardOrderByReceiverName,
  getGiftCardOrderById,
  setCardData,
  putCardData,
  getUserByEmail,
  removeCardData,
  setBookingData,
  getBookingData,
  getBookingById,
  getOnlyResData,
  updateBookingData,
  deleteReservation,
  setUserNoAccData,
  setBookingDataNoAcc,
  getUserNoAccByMail,
  ModifyTitleContent,
  ModifyOurStory,
  getTitleContent,
  getOurStory,
  getAllAdmins,
  getAllAdminById,
  ModifyGallery,
  ModifyGalleryNotAdmin,
  getGalleryImg,
  getOnlyResDataById,
  getEvents,
  ModifyEvents,
  getBeverage,
  ModifyBeverage,
  EmailExistedApartFromCurrentUser,
  searchInDatabase,
  connection,
};
