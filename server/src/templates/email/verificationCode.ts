import { config } from "@/config/env";

export const verificationCodeEmail = (code: string) => {
  return {
    subject: "Your Taskitten verification code",
    from: config.SMTP_USER,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
                  background:#f6f7fb; padding:40px 20px;">
        <div style="max-width:520px; margin:auto; background:white; border-radius:12px; padding:32px; box-shadow:0 10px 30px rgba(0,0,0,.06);">
          
          <h2 style="margin-top:0; color:#111;">
            🐾 Welcome to Taskitten
          </h2>

          <p style="font-size:15px; color:#444; line-height:1.6;">
            Use the verification code below to confirm your email and start organizing your tasks.
          </p>

          <div style="margin:32px 0; text-align:center;">
            <div style="display:inline-block; padding:16px 36px; background:#111; color:white; 
                        border-radius:10px; font-size:28px; letter-spacing:6px; font-weight:600;">
              ${code}
            </div>
          </div>

          <p style="font-size:14px; color:#666;">
            This code expires in <strong>10 minutes</strong>.  
            If you didn’t request this, you can safely ignore this email.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:32px 0;">

          <p style="font-size:12px; color:#999; text-align:center;">
            © ${new Date().getFullYear()} Taskitten — Stay on top of your tasks 🐱
          </p>

        </div>
      </div>
    `,
  };
};
