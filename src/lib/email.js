// // mailer.js
// import nodemailer from "nodemailer";

// // ---------- Transport ----------
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: true, // for 465
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// // Optional verify (run once on startup)
// export const verifyMail = async () => {
//   try {
//     await transporter.verify();
//     console.log("✅ Mail server ready");
//   } catch (err) {
//     console.error("❌ Mail server error:", err);
//   }
// };

// // ---------- Admin Mail ----------
// export const sendAdminMail = async ({ subject, html, text }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"App Notification" <${process.env.SMTP_USER}>`,
//       to: process.env.ADMIN_EMAIL, // set in env
//       subject,
//       text,
//       html,
//     });

//     return info;
//   } catch (err) {
//     console.error("Admin mail failed:", err);
//     throw err;
//   }
// };

// // ---------- User Mail ----------
// export const sendUserMail = async ({ to, subject, html, text }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Support" <${process.env.SMTP_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     return info;
//   } catch (err) {
//     console.error("User mail failed:", err);
//     throw err;
//   }
// };
