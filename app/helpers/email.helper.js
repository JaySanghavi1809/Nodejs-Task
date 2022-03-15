const nodemailer = require('nodemailer')

const sendMail = async function (to, subject, template, from = process.env.FROM_EMAIL) {
    try {
        var transporter = null;
        if (typeof process.env.IS_EMAIL_USE_SMTP !== 'undefined' && process.env.IS_EMAIL_USE_SMTP == 'on') {

            transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: (process.env.EMAIL_PORT == 465) ? true : false,
                auth: {
                    user: process.env.FROM_EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail'
            })
        }
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: template
        }
        return await transporter.sendMail(mailOptions,
            (error, info) => {
                if (error) {
                    // console.log('Email failed', error);
                    // if (error.code == "EAUTH") {
                    sendMailToAdminstrator(process.env.ADMINISTRATOR_EMAIL, "Modification of environment file configuration", AdminstratorTemplate({ message: error.message ? error.message : '' }));
                    // }
                }
            }
        );

    } catch (e) {
        console.log(e)
        sendMailToAdminstrator(process.env.ADMINISTRATOR_EMAIL, "Modification of environment file configuration", AdminstratorTemplate({ message: e.message ? e.message : '' }));
    }
}

const sendMailToAdminstrator = async function (to, subject, template, from = process.env.FROM_EMAIL) {
    try {
        transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        })
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: template
        }
        return await transporter.sendMail(mailOptions,
            (error, info) => {
                if (error) {
                    console.log('Email failed', error);

                }
            }
        );

    } catch (e) {
        console.log(e)
    }
}

const AdminstratorTemplate = (data) => {
    const html =
        `<!DOCTYPE html>
        <html>
        <head>
            <title>COMBAT MATRIX</title>
            
        </head>
        <body>
            <p>Hello</p>

            <p> we had like to inform you to please modify environment file configuration because email credential is not working. </p> 
            <p> we have got errors like: <strong>${data.message}</strong> </p>
            <p> please modified environment file details as per below details</p>
            
          
            <p> #Enter time into second format</p>
            <p> OTP_EXPIRE_TIME= </p>

            <p> # JWT Secret</p>
            <p> JWT_SECRET= </p>
            <p> JWT_EXIPIRATION_TIME= </p>

            <p> # Email Credentials</p>
            <p> FROM_EMAIL= </p>
            <p> EMAIL_PASSWORD='' </p>
            <p> EMAIL_HOST='' </p>
            <p> EMAIL_PORT= </p>
            <p> # Set on/off value </p>
            <p> IS_EMAIL_USE_SMTP= </p>
            <p> ADMINISTRATOR_EMAIL= </p>

           

            <p> If you have any queries or questions, you can contact to team</p>
            <p> Thank You<p>
        </body>
        </html>
        `
    return html
}

const welcomeTemplate = (array) => {
    const html =
        `<!DOCTYPE html>
        <html>
        <head>
            <title>Welcome Email</title>
            
        </head>
        <body>
            <h1 >Welcome</h1>
        </body>
        </html>
        `
    return html
}

const OtpMail = (array) => {
    const html =
        `<!DOCTYPE html>
        <html>
        <head>
            <title>welcome to new Mail</title>
            
        </head>
        <body>
            <h1 >Your Otp is ${array.otp}</h1>
        </body>
        </html>
        `
    return html
}

const verificationTemplate = () => {
    const html =
        `<!DOCTYPE html>
        <html>
        <head>
            <title>Welcome Email</title>
            
        </head>
        <body>
            <h1 >Your Verification Successfully Completed </h1>
        </body>
        </html>
        `
    return html
}



module.exports = { sendMail, welcomeTemplate, OtpMail, verificationTemplate }