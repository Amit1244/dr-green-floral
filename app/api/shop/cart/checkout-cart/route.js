import { NextResponse } from "next/server";
import GenerateSignature from "@/lib/dapp/generate-signature";

export async function POST(request, res) {
    const body = await request.json();

    const checkoutReq = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/orders`,
        {
            method: "POST",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(body),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    const checkoutRes = await checkoutReq.json();

    return NextResponse.json(checkoutRes, {
        status: checkoutRes.statusCode,
    });
}
