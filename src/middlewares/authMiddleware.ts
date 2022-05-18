import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, String(process.env.PRIVATE_KEY));

    request.user = data as TokenPayload;
    return next();

  } catch {
    return response.sendStatus(401);
  }

}