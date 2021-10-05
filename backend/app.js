const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv");
const isauth = require("./api/middleware/auth");
const isadmin = require("./api/middleware/admin");
dotenv.config({ path: ".env" });
const port = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.status(200).send("Fstival react backend");
});
app.use("/user", require("./api/routes/user"));
app.use("/college", require("./api/routes/college"));
app.use("/post", require("./api/routes/post"));
app.use("/admin", isauth, isadmin, require("./api/routes/admin"));

app.use((req, res, next) => {
  error = createError.NotFound();
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    status: status,
    message: error.message,
  });
});
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log("running in port 3000");
    });
  });
