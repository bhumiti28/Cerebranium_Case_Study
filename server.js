require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./route/index");
const Admin = require("./model/Professor");
const app = express();
const port = process.env.PORT || 8080;

// connecting to db
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(`Error occurred!`, error));

// Admin creation on start
try {
  Admin.find().then((data) => {
    if (data.length === 0) {
      const newAdmin = Admin({
        name: "Professor admin",
        email: "professor@admin.com",
        password: "Admin@123",
      });
      newAdmin
        .save()
        .then(async () => {
          console.log("New user created");
        })
        .catch(() => {
          console.log("Admin already Confirmed");
        });
    }
  });
} catch (error) {
  console.log("Admin not created");
}

// apply middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// apply routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`API is running at port ${port}`);
});
