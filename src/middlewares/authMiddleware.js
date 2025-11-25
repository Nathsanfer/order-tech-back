import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido." });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token inválido." });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token mal formatado." });

  try {
    const secret = process.env.JWT_SECRET || "default_jwt_secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
}
