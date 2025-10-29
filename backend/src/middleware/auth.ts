import { NextFunction, Request, Response } from "express-serve-static-core"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // add a 4 second delay here
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const token = req.cookies["auth_token"]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    req.userId = (decoded as JwtPayload).userId
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

export default verifyToken
