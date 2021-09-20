const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../model/Professor");
const { v4: uuidv4 } = require("uuid");

let adminAuth = {};

adminAuth.signin = (req, res) => {
  const { email, password } = req.body;

  Admin.findOne({ email })
    .then((admin) => {
      if (!admin) {
        return res.status(400).json({ error: "email/Password incorrect" });
      } else if (admin && !admin.authenticate(password)) {
        // Verify user input password and Db password
        return res.status(400).json({
          message: "email/Password incorrect",
        });
      } else {
        // generate token and send to client
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          id: admin._id,
          token,
          message: "Signin Successful",
          success: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "email/Password incorrect",
      });
    });
};

adminAuth.changeAdminPassword = (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (email && oldPassword && newPassword) {
      Admin.findOne({ email })
        .then(async (admin) => {
          if (!admin) return res.status(400).json({ error: "email incorrect" });

          if (admin && !admin.authenticate(oldPassword))
            return res.status(400).json({
              message: "Old Password incorrect",
            });

          try {
            const salt = uuidv4();
            const hash = crypto
              .createHmac("sha256", salt)
              .update(newPassword)
              .digest("hex");
            let updatedUser = await Admin.findOneAndUpdate(
              { _id: admin._id },
              { hashedPassword: hash, salt: salt }
            );
            return res.status(200).json({
              success: true,
              message: "Password Updated",
              data: updatedUser,
            });
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: "Something Went Wrong!",
              error: error,
            });
          }
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            message: "Something Went Wrong!",
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "No empty fields allowed",
        error: error,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

module.exports = adminAuth;
