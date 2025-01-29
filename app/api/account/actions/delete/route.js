import { NextResponse } from "next/server";
import { transporter } from "@/lib/emails/transporter";
import { SystemError } from "@/lib/form-actions/actions";

export async function POST(request, res) {
    const body = await request.json();

    try {
        await transporter.sendMail({
            from: `"Dr. Green Website" <${process.env.EMAIL_FROM}>`, // sender address
            to: process.env.EMAIL_ADMIN, // list of receivers
            subject: "User Account Deletion", // Subject line
            html: `<p>${body.name} [${body.email}], has requested to delete their account. This is their client ID: ${body.clientId}</p>`, // html body
        });

        return NextResponse.json(
            { success: true },
            {
                status: 200,
            }
        );
    } catch (err) {
        SystemError(err, "Account Deletion Request Email (NODEMAILER API)");
        return NextResponse.json(
            { success: false },
            {
                status: 400,
            }
        );
    }
}
