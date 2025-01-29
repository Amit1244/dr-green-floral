import { NextResponse } from "next/server";
import { User } from "@/lib/mongodb/db-schemas";
import DBConnect from "@/lib/mongodb/db-connect";

export async function POST(request, res) {
    const body = await request.json();

    console.log(body);

    try {
        await DBConnect();

        await User.findOneAndUpdate(
            { clientId: body.clientId },
            {
                scheduledAppointment: body.link,
                scheduledAppointmentAt: Date.now(),
            }
        ).exec();

        return NextResponse.json(
            { success: true },
            {
                status: 200,
            }
        );
    } catch (err) {
        SystemError(err, "Add Scheduled Appointment to MongoDB (API)");
        return NextResponse.json(
            { success: false },
            {
                status: 400,
            }
        );
    }
}
