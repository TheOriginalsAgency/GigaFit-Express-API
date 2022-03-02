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
        from: 'noreplay@gigafit.fr',
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
                    width: 50%;
                    height: 100px;
                    font-style: oblique;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    font-weight: 500;
                    background-color: black;
                    border-radius: 8px;
        
                }
                h1{
                    width: 100%;
                    color: #7DA66A;
                }
                hr{
                    width: 100px;
                   color: white;
                }
                b{
                    color: white;
                }
            </style>
        </head>
          <body>
          <div>
            <h1><b>Bonjour</b> Cher Utilisateur, voici votre mot de passe regénérer: </h1></br>
            <hr>
                <b>${newPassword}</b>
            <hr>
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

