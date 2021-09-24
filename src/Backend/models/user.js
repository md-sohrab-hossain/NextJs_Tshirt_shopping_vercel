import mongoose, { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
    trim: true,
    maxLength: [50, "Your name can't exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//*---- Encrypting password before saving user ---------//
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  user.password = await bcrypt.hash(user.password, 10);
});
//*--- Encrypting password before saving user ----------//

//TODO: 👆 solution Property “password” does not exists on type Document--> https://stackoverflow.com/questions/53644893/property-password-does-not-exists-on-type-document

//* compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//* Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //! Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //! Hash and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //! Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; //30 minutes

  return resetToken;
};

export const User = mongoose.models.User || model("User", userSchema);
