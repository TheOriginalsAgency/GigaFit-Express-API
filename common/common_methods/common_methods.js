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
        html: '<div>Your GigaFit Password account is : <br><b>'+ newPassword +'</b></div>',
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

