import { RequestCustom } from "../types/express";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email: string;
}

const authenticateToken = (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("Token não fornecido");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      console.log("Erro na verificação do token:", err.message);
      return res.sendStatus(403);
    }
    console.log("Token verificado com sucesso. Usuário:", user);
    req.user = user as UserPayload;
    next();
  });
};

export default authenticateToken;
