import { NextResponse } from "next/server";
import GenerateSignature from "@/lib/dapp/generate-signature";

export async function POST(request, res) {
    const user = await request.json();

    const body = {
        orderBy: "desc",
        countryCode: user.countryCode,
        take: `${user.take}`,
    };
    const params = new URLSearchParams(body).toString();

    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains?${params}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(body),
                "Content-Type": "application/json",
            },
        }
    );

    const strains = await getStrains.json();

    return NextResponse.json(strains, {
        status: 200,
    });
}
