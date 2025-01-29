"use client";

import { useSession } from "next-auth/react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

export default function CalendlyClient(props) {
    const { session, _, update } = useSession();

    useCalendlyEventListener({
        onEventScheduled: async (e) => {
            const req = await fetch("/api/account/actions/schedule-meeting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    link: e.data.payload.event.uri,
                    clientId: props?.user?.id,
                }),
            });

            const res = req.json();

            if (res.success) {
                update();
            }
        },
    });

    return (
        <InlineWidget
            url="https://calendly.com/medical-drgreennft"
            prefill={{
                email: props?.user?.email,
                firstName: props?.user?.firstName,
                lastName: props?.user?.lastName,
                name: `${props?.user?.firstName} ${props?.user?.lastName}`,
                smsReminderNumber: `${props?.user?.phoneCode}${props?.user?.contactNumber}`,
            }}
        />
    );
}
