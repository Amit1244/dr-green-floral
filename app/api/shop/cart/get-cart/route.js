import { NextResponse } from "next/server";
import GenerateSignature from "@/lib/dapp/generate-signature";

export async function POST(request, res) {
    const body = await request.json();

    const params = new URLSearchParams(body).toString();

    const getCart = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/carts?${params}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(body),
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 0,
            },
        }
    );

    const results = await getCart.json();

    if (results) {
        return NextResponse.json(results, {
            status: results.statusCode,
        });
    } else {
        return NextResponse.json(
            { success: false },
            {
                status: 404,
            }
        );
    }
}
