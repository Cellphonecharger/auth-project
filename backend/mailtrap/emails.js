import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      //   catogory: "Email Verification",
    });
    console.log("Email sent successfully, response");
  } catch (err) {
    console.error(`Error sending verification`, err);
    throw new Error(`Error sending verification email: ${err}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "36ef8559-d34d-4864-9e52-1ec6eb156d37",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Email sent welcome successfully", response);
  } catch (err) {
    console.error(`Error sending welcome email`, err);
    throw new Error(`Error sending welcome email:${err}`);
  }
};
