//  for google login
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { GoogleAuthService } from "../lib/googleAuth.service";

export class AuthController {
  static async googleSignup(req: Request, res: Response): Promise<Response> {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return res.status(400).json({
          success: false,
          message: "idToken is required",
        });
      }

      const user = await GoogleAuthService.signupOrLogin(idToken);

      const appToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Google authentication successful",
        token: appToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          provider: user.provider,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Authentication failed";

      return res.status(401).json({
        success: false,
        message,
      });
    }
  }
}
