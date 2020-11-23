const { Schema, model } = require("mongoose");
import argon2 from "argon2";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = model("User", UserSchema);
