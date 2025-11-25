import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  // POST /auth/login
  async login(req, res) {
    try {
      const { nickname, password } = req.body;

      if (!nickname || !password) {
        return res.status(400).json({ error: "Nickname e password são obrigatórios." });
      }

      const user = await UserModel.findByNickname(nickname);

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const payload = { id_user: user.id_user, nickname: user.nickname };
      const secret = process.env.JWT_SECRET || "default_jwt_secret";
      const token = jwt.sign(payload, secret, { expiresIn: "1d" });

      const safeUser = { id_user: user.id_user, nickname: user.nickname, createdAt: user.createdAt, updatedAt: user.updatedAt };

      res.json({ token, user: safeUser });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
}

export default new AuthController();
