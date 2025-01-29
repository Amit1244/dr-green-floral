import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import CartClient from "../components/shop/cart/cart-client";
import GenerateSignature from "@/lib/dapp/generate-signature";

export const getStrainImageUrl = async (id) => {
    const payload = { strainId: id };

    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );

    const strain = (await getStrains.json()).data.imageUrl;

    return strain;
};

export default async function CartPage() {
    const clientId = (await getServerSession(options))?.user?.dappUser?.id;

    const payload = {
        clientId: clientId,
    };

    const params = new URLSearchParams(payload).toString();

    const getCart = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/carts?${params}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 0,
            },
        }
    );

    const cart = (await getCart.json())?.data?.clients[0]?.clientCart[0];

    let imagesObject;
    if (cart?.cartItems) {
        const imagesMap = await Promise.all(
            cart?.cartItems.map(async (item) => {
                return [
                    item.strain.id,
                    await getStrainImageUrl(item.strain.id),
                ];
            })
        );
        imagesObject = Object.fromEntries(imagesMap);
    }

    return (
        <main className="pt-32 relative">
            <div className="container mx-auto px-4">
                <h1 className="h2 mb-10 relative z-10 text-[#EBCFA6]">Your Cart</h1>
                <CartClient
                    cart={cart}
                    clientId={clientId}
                    images={imagesObject}
                />
            </div>
        </main>
    );
}
