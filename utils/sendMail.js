const nodemailer = require("nodemailer");
let link;

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (to, html) => {
 try {
      // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  console.log("Test Account", testAccount);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false, // avoid Nodejs self signed
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Change Password 🙄", // Subject line
    text: "Hello world?", // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  const res =nodemailer.getTestMessageUrl(info);
  if(res)
  return nodemailer.getTestMessageUrl(info);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 } catch (error) {
     console.log(error);
     return undefined;
 }
};


module.exports = sendEmail;