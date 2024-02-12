const nodemailer = require("nodemailer");

function mailGenerate(data) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NO_MA_USER,
                pass: process.env.NO_MA_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.NO_MA_USER,
            to: data?.email,
            cc: "info@kma.org.in",
            subject: "Successful Registration for KMA CSR Award 2024 ",
            html: `<html>
        <head>
        <style>
            /* Inline CSS styles */
            body {
                font-family: Arial, sans-serif;
                max-width: 1200px;
                height: 100%;
                margin: auto;
                border-radius: 20px;
                border: #333;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
    
            .message {
                color: #333;
            }
    
            .TrHead {
                margin-top: -10px;
            }
    
            .tBody {
                margin-top: 20px;
            }
    
            .address {
                margin-top: -10px;
                width: 100%;
                font-size: small;
            }
    
            .one{
                margin-bottom: 5px;
            }
    
            .bolderFont {
                font-weight: bold;
                font-style: italic;
            }
    
            .linksData {
                width: 100%;
                font-size: small;
            }
    
            .linksData p {
                margin-top: 6px;
            }
            .heading{
                color: #473595;
                margin-bottom: 40px;
            }
    
            section {
                width: 50%;
                border: 2px solid #473595;
                padding: 30px;
                border-radius: 20px;
                padding-bottom: 50px;
            }
    
            footer {
                width: 100%;
                margin-top: 50px;
            }
    
            footer h3 {
                margin-bottom: 30px;
                color: #473595;
            }
    
            hr {
                margin-top: 20px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    
    <body>
        <section>
            <h1 class="heading">Successful Registration for KMA CSR Award 2024 </h1>
            <h4>Dear ${data?.organization},</h4>
            <p class="message">We are delighted to inform you that your registration for the <span class="bolderFont"> KMA
                    CSR
                    Award 2024</span>
                nomination has
                been successfully received. Your commitment to corporate social responsibility is truly commendable.
            </p>
            <h4>Transaction Details</h4>
            <p class="TrHead"> <span>Transaction ID : </span>${data?.paymentDetails?.transactionId}</p>
            <p class="tBody">
                Our esteemed jury will meticulously evaluate your nomination. The award ceremony is scheduled
                for <span class="bolderFont"> March 7th,</span> and
                we eagerly anticipate your presence at the event.
            </p>
            <p>
                Once again, thank you for your participation. We look forward to celebrating your accomplishments and
                contributions to CSR.
            </p>
    
            <p style="font-weight: 500;">
                Best Regards,
            </p>
        </section>
    
    
        <footer>
            <div class="">
                <h3>Qmark Technolabs</h3>
                <div class="address">
                    <div class="one">
                        One Way Junction, Near Bismi Hypermarket
                        Muvattupuzha, Kerala - 686673
                    </div>
                    <div>
                        Phone:73061 08096, Email: qmarktechnolabs@gmail.com
                    </div>
                </div>
            </div>
            <hr />
            <div class="linksData">
                <span>
                    Copyright © 2024
                    <a target="blank" href="https://www.kma.org.in" className="hover:underline">
                        KMA
                    </a>
                    . All Rights Reserved.
                </span>
                <br>
                <p>
                    Developed By <a href="https://qmarktechnolabs.com/"> Qmark Technolabs</a>
                </p>
            </div>
        </footer>
    </body>
        </html>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error); // Reject the promise if there's an error
            } else {
                console.log('Email sent: ' + info.response);
                resolve(); // Resolve the promise if email is sent successfully
            }
        });
    });
}

module.exports = mailGenerate