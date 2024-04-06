const express = require("express");
const app = express();
const port = 8000;
const Adroute = require("./src/adminRouter");
const UserRoute = require("./src/userRouter");
const cors = require("cors");
const methodOverride = require("method-override");
const { configCors } = require("./src/config/cors");
//Use custome middleware

// override lại các phương thức mặc định của form html theo chuẩn Restfull Api
app.use(methodOverride("_method"));

app.use(express.urlencoded());
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
