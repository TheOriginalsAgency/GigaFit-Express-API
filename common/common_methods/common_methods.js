const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');


//  create random password
function generateRandomPassword() {
    var password = "";
    for (let index = 0; index < 5; index++) {
        if (password.length <= 5) {
            password += ('a1bc2d3ef4g5h7ij8kl0mn8o9prstyuvyzwx').split('')[(Math.floor(Math.random() * 26))];
        }
    }
    password += new Date().getMilliseconds();
    return password
}


//  send mail
function sendMail(receiver, newPassword) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohamedbettaoui.1@gmail.com',
            pass: 'cthvzmxnvdqknrqu',
        },
    });

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: '../../views/'
    }));

    var mailOptions = {
        from: 'mohamedbettaoui.1@gmail.com',
        to: receiver,
        cc: receiver,
        bcc: receiver,
        subject: 'New password created successfully',
        text: newPassword,
        html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
        <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,

        // AMP4EMAIL
        amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,
        attachements: [
            { filename: 'logoGreen.png', path: '../../public/images/users/logoGreen.png'}
        ],
        template: 'index.handlebars'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Forgot ERROR ...'+error);
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}
module.exports = {
    sendMail,
    generateRandomPassword
}

