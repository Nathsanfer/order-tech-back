import UserModel from "./src/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {
    const nickname = "alice";
    const password = "alicepass";

    const user = await UserModel.findByNickname(nickname);
    if (!user) {
      console.error("Usuário não encontrado");
      process.exit(1);
    }

    const ok = bcrypt.compareSync(password, user.password);
    console.log("compare result:", ok);

    if (!ok) process.exit(1);

    const token = jwt.sign({ id_user: user.id_user, nickname: user.nickname }, process.env.JWT_SECRET || "default_jwt_secret", { expiresIn: '1d' });
    console.log("JWT:", token);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
