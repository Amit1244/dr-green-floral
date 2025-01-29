"use server";
import { transporter } from "./transporter";

export async function passSet(email, token, id, firstName) {
    // send mail with defined transport object
    await transporter.sendMail({
        from: `"Dr. Green Website" <${process.env.EMAIL_FROM}>`, // sender address
        to: email, // list of receivers
        subject: "Set Your Password", // Subject line
        html: `<p>Hey ${firstName}, </p><p>Thank you for registering. To set your own password, please <a href='${process.env.NEXT_PUBLIC_URL}/password-reset?token=${token}&user_id=${id}'>use this link.</a></p><p>This link will only last 24 hours.</p><p>Thanks, </p><p><img width="248" height="95" src="cid:dr-green-logo" alt="Dr Green Logo"/></p>`, // html body
        attachments: [
            {
                filename: "dr-green-logo.webp",
                path: `${process.env.NEXT_PUBLIC_URL}/images/logos/dr-green-logo.webp`,
                cid: "dr-green-logo", //same cid value as in the html img src
            },
        ],
    });
}
