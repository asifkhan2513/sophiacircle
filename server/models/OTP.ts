import * as mongoose from "mongoose";
import { mailSender } from "../utils/mailSender";
import { emailTemplate } from "../mails/emailVerificationTemplate";

interface IOTP {
  email: string;
  otp: string;
  createdAt?: Date;
}

type OTPDocument = IOTP & mongoose.Document;
type OTPModel = mongoose.Model<OTPDocument>;

async function sendVerificationEmail(
  email: string,
  otp: string
): Promise<void> {
  try {
    await mailSender(email, "Verification Email", emailTemplate(otp));
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

const OTPSchema = new mongoose.Schema<OTPDocument, OTPModel>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

OTPSchema.post("save", async function (doc: OTPDocument) {
  try {
    await sendVerificationEmail(doc.email, doc.otp);
  } catch (error) {
    console.log("Error sending verification email:", error);
  }
});

const OTP = mongoose.model<OTPDocument, OTPModel>("OTP", OTPSchema);

export default OTP;
