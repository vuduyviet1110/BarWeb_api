require("dotenv").config();
const mysql = require("mysql2");

// Database connection configuration
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
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

  CREATE TABLE IF NOT EXISTS content (
    content_id INT NOT NULL AUTO_INCREMENT,
    content_columns VARCHAR(20) DEFAULT NULL,
    PRIMARY KEY (content_id)
  );

  CREATE TABLE IF NOT EXISTS events (
    content_id INT NOT NULL AUTO_INCREMENT,
    upload_time TIMESTAMP NULL DEFAULT NULL,
    admin_id INT DEFAULT NULL,
    content VARCHAR(5000) DEFAULT NULL,
    title VARCHAR(2000) DEFAULT NULL,
    PRIMARY KEY (content_id),
    KEY admin_id (admin_id),
    CONSTRAINT events_ibfk_1 FOREIGN KEY (content_id) REFERENCES content (content_id),
    CONSTRAINT events_ibfk_2 FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
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
    content_id INT NOT NULL AUTO_INCREMENT,
    upload_time TIMESTAMP NULL DEFAULT NULL,
    admin_id INT DEFAULT NULL,
    content VARCHAR(5000) DEFAULT NULL,
    title VARCHAR(2000) DEFAULT NULL,
    PRIMARY KEY (content_id),
    KEY admin_id (admin_id),
    CONSTRAINT our_story_ibfk_1 FOREIGN KEY (content_id) REFERENCES content (content_id),
    CONSTRAINT our_story_ibfk_2 FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
  );

  CREATE TABLE IF NOT EXISTS reservation_status (
    reservation_status_id INT NOT NULL ,
    reservation_status TINYINT(1) DEFAULT NULL,
    PRIMARY KEY (reservation_status_id)
  );

  CREATE TABLE IF NOT EXISTS table_slots (
    table_id INT NOT NULL AUTO_INCREMENT,
    table_number INT DEFAULT NULL,
    PRIMARY KEY (table_id)
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
    content_id INT NOT NULL AUTO_INCREMENT,
    upload_time TIMESTAMP NULL DEFAULT NULL,
    admin_id INT DEFAULT NULL,
    content VARCHAR(1000) DEFAULT NULL,
    title VARCHAR(2000) DEFAULT NULL,
    PRIMARY KEY (content_id),
    KEY admin_id (admin_id),
    CONSTRAINT title_ibfk_1 FOREIGN KEY (content_id) REFERENCES content (content_id),
    CONSTRAINT title_ibfk_2 FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
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
      VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(
      sqlInsertQuery,
      [user_name, user_email, user_password, user_dob, user_phone],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Kết quả trả về sau khi chèn dữ liệu mới
          console.log("Inserted record ID:", result.insertId);
          console.log("new user id: ", result.insertId);
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
) {
  const query = `
    UPDATE order_giftcard
    SET 
      card_id = ?,
      card_status_id = ?,
      payment_method = ?,
      user_id = ?,
      receiver_name = ?,
      receiver_mail = ?,
      receiver_phone = ?,
      receiver_address = ?,
      message = ?
    WHERE card_order_id = ?;
  `;
  const values = [
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
function getGiftCardOrders() {
  return new Promise((resolve, reject) => {
    connection.query(`Select * From order_giftcard`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

//Get giftcard order by order id(for admin usage)
function getGiftCardOrderByOrder(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select * From order_giftcard where card_order_id = ?`,
      id,
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
function getGiftCardOrderByUser(id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `Select * From order_giftcard where user_id = ?`,
      id,
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

//Create giftcard (for user usage)
function setCardData(
  card_id,
  card_status_id,
  user_id,
  payment_method,
  receiver_name,
  receiver_mail,
  receiver_phone,
  receiver_address,
  message
) {
  const query = `INSERT INTO order_giftcard (card_id, card_status_id, user_id, payment_method, receiver_name, receiver_mail, receiver_phone, receiver_address, message)
               VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`;
  const values = [
    card_id,
    card_status_id,
    user_id,
    payment_method,
    receiver_name,
    receiver_mail,
    receiver_phone,
    receiver_address,
    message,
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
function updateUserData(
  user_name,
  user_gmail,
  user_password,
  user_DOB,
  user_phone,
  user_id,
  user_address
) {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET user_name = ?, user_gmail = ?, user_password = ?, user_DOB = ?, user_phone = ?, user_address = ? WHERE user_id = ?",
      [
        user_name,
        user_gmail,
        user_password,
        user_DOB,
        user_phone,
        user_address,
        user_id,
      ],
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
  user_gmail,
  user_phone,
  user_name,
  message
) {
  const query = `INSERT INTO reservation (user_id, table_date, table_time, number_people, user_gmail, user_phone, user_name, message)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    user_id,
    table_date,
    table_time,
    number_people,
    user_gmail,
    user_phone,
    user_name,
    message,
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

//get all Reservation(for admin)
function getBookingData() {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT r.*, u.user_name, u.user_phone, u.user_gmail
    FROM reservation AS r
    JOIN users AS u ON r.user_id = u.user_id`,
      (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
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
          resolve(result);
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
  console.log(values);
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
      INSERT INTO users_noacc (user_name, user_gmail, user_phone)
      VALUES (?, ?, ?);
    `;

    connection.query(
      sqlInsertQuery,
      [user_name, user_email, user_phone],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Kết quả trả về sau khi chèn dữ liệu mới
          console.log("Inserted record ID:", result.insertId);
          console.log("new user id: ", result.insertId);
          resolve(result);
        }
      }
    );
  });
}
function getUserNoAccByMail(userEmail) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT guest_id FROM users_noacc WHERE user_gmail = ?",
      [userEmail],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Resolve with guest_id value
          console.log(result);
        }
      }
    );
  });
}
module.exports = {
  setUserData,
  getUsersData,
  getUserById,
  UpdatePassword,
  updateUserData,
  deleteAcc,
  EmailExisted,
  getGiftCardOrders,
  getGiftCardOrderByUser,
  getGiftCardOrderByOrder,
  setCardData,
  putCardData,
  getUserByEmail,
  removeCardData,
  setBookingData,
  getBookingData,
  updateBookingData,
  deleteReservation,
  setUserNoAccData,
  setBookingDataNoAcc,
  getUserNoAccByMail,
  connection,
};
