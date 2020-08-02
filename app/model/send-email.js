const nodemailer = require('nodemailer');
/*const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'eulah.harber15@ethereal.email',
        pass: '6pTfqHXfWrsEjr1KfD'
    }
});*/

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
      user: 'pankaj@tru.agency',
      pass: 'qnfcmedshywglaau'
    }
  });
  /*
  var mailOptions = {
    from: 'noreply@richpost.com',
    to: 'pankaj.pundir89@gmail.com',
    subject: 'Testmail',
    text: 'Hi, mail sentdddd.'
  };*/

  let Mailevent  = (mailOptions) => { 
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
  module.exports = Mailevent;