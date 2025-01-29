import { NextResponse } from "next/server";
import GenerateSignature from "@/lib/dapp/generate-signature";

export async function POST(request, res) {
    const body = await request.json();

    const postCart = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/carts`,
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

    const results = await postCart.json();

    return NextResponse.json(results, {
        status: results.statusCode,
    });
}
