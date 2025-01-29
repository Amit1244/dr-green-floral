import { NextResponse } from "next/server";
import GenerateSignature from "@/lib/dapp/generate-signature";

export async function POST(request, res) {
    const body = await request.json();

    const payloadOne = {
        cartId: body.clientCartId,
    };

    const deleteCartReq = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/carts/${payloadOne.cartId}`,
        {
            method: "DELETE",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payloadOne),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payloadOne),
        }
    );

    const deleteCartRes = await deleteCartReq.json();

    if (!deleteCartRes.success) {
        return NextResponse.json(deleteCartRes, {
            status: deleteCartRes.statusCode,
        });
    }

    const payloadTwo = {
        items: body.cartItems
            .filter((item) => {
                if (body.removeStrainId == item.strain.id) {
                    return false;
                } else {
                    return item;
                }
            })
            .map((item) => {
                return {
                    quantity: item.quantity,
                    strainId: item.strain.id,
                };
            }),
        clientCartId: body.clientCartId,
    };

    if (payloadTwo.items.length) {
        const addBackReq = await fetch(
            `https://stage-api.drgreennft.com/api/v1/dapp/carts`,
            {
                method: "POST",
                redirect: "follow",
                headers: {
                    "x-auth-apikey": process.env.DAPP_API,
                    "x-auth-signature": GenerateSignature(payloadTwo),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payloadTwo),
            }
        );

        const addBackRes = await addBackReq.json();

        return NextResponse.json(addBackRes, {
            status: addBackRes.statusCode,
        });
    } else {
        return NextResponse.json(deleteCartRes, {
            status: deleteCartRes.statusCode,
        });
    }
}
