import { OAuth2Client } from "google-auth-library";
import User, { IUser } from "../models/User";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

type GooglePayload = {
  googleId: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified: boolean;
};

export class GoogleAuthService {
  static async verifyIdToken(idToken: string): Promise<GooglePayload> {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid Google token");
    }

    if (!payload.sub) {
      throw new Error("Google user id not found");
    }

    if (!payload.email) {
      throw new Error("Google email not found");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      emailVerified: payload.email_verified ?? false,
    };
  }

  static async signupOrLogin(idToken: string): Promise<IUser> {
    const googleUser = await this.verifyIdToken(idToken);

    let user = await User.findOne({ googleId: googleUser.googleId });

    if (user) {
      user.name = googleUser.name || "Google User";
      user.avatar = googleUser.avatar;
      user.emailVerified = googleUser.emailVerified;
      await user.save();
      return user;
    }

    const existingEmailUser = await User.findOne({ email: googleUser.email });

    if (existingEmailUser) {
      existingEmailUser.googleId = googleUser.googleId;
      existingEmailUser.name = googleUser.name || "Google User";
      existingEmailUser.avatar = googleUser.avatar;
      existingEmailUser.emailVerified = googleUser.emailVerified;
      await existingEmailUser.save();
      return existingEmailUser;
    }

    user = await User.create({
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name || "Google User",
      avatar: googleUser.avatar,
      emailVerified: googleUser.emailVerified,
      provider: "google",
    });

    return user;
  }
}
