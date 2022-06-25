const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');


//  create random password
function generateRandomPassword() {
    var password = "";
    for (let index = 0; index < 10; index++) {
        if (password.length <= 8) {
            password += ('a1bc2d3ef4g5h7ij8kl0mn8o9prstyuvyzwx').split('')[(Math.floor(Math.random() * 26))];
        }
    }
    password += new Date().getMilliseconds();
    return password
}


//  send mail
function sendMail(receiver, newPassword) {

    var transporter = nodemailer.createTransport({
        pool: true,
        host: 'smtp.ionos.fr',
        port: 465,
        secure: true, 
        auth: {
            user: 'app@gigafit.fr',
            pass: '&pp11i@glglaflt',
        },
    });

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: '../../views/'
    }));

    var mailOptions = {
        from: 'noreply@gigafit.fr',
        to: receiver,
        cc: receiver,
        bcc: receiver,
        subject: 'New password created successfully',
        text: newPassword,
        // AMP4EMAIL
        html: `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                div{
                    font-style: oblique;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-weight: 500;
                    background-color: white;
        
                }
                b{
                    color: black;
                }
            </style>
        </head>
          <body>
          <div>
            <h1><b>Bonjour</b> Cher Utilisateur, voici votre mot de passe regénérer: </h1></br>
                <b>${newPassword}</b>
          </div>
          </body>
        </html>`,
        attachements: [
            { filename: 'logoGreen.png', path: '../../public/images/users/logoGreen.png'}
        ],
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

