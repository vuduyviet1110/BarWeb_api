const express = require("express");
const app = express();
const port = 8000;
const route = require("./src/routes");
const methodOverride = require("method-override");

//Use custome middleware

// override lại các phương thức mặc định của form html theo chuẩn Restfull Api
app.use(methodOverride("_method"));

app.use(express.urlencoded());
app.use(express.json());

//route
route(app);

//lắng nghe port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
