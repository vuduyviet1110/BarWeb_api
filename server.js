const express = require("express");
const app = express();
const port = 8000;
const Adroute = require("./src/adminRouter");
const UserRoute = require("./src/userRouter");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const methodOverride = require("method-override");
const { configCors } = require("./src/config/cors");

//Use custome middleware
app.use(methodOverride("_method"));
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(configCors));

//route
Adroute(app);
UserRoute(app);

// Các function

//lắng nghe port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
