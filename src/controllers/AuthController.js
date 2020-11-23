import User from "../models/User";
import auth from "../config/auth";

import jwt from "jsonwebtoken";

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(422).json({ error: "email isn't registered" });
    }

    const isValid = await auth.validadePassword(
      password,
      userExist.password
    );


    if (!isValid) {
      return res.status(422).json({ error: "incorrect password" });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        admin: userExist.admin,
      },
      process.env.SECRET
    );

    return res.status(200).json({ auth: true, token });
  }
}

export default new AuthController();
