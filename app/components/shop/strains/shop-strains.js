import { getServerSession } from "next-auth";
import ShopStrainsClient from "./shop-strains-client";
import GenerateSignature from "@/lib/dapp/generate-signature";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function ShopStrains() {
    const session = await getServerSession(options);
    const countryCode =
        session?.user?.dappUser?.shippings[0]?.countryCode || "";

    // const body = {
    //     orderBy: "desc",
    //     countryCode: countryCode,
    //     take: "9",
    //     order: "popularity",
    // };
    // const params = new URLSearchParams(body).toString();

    // const getStrains = await fetch(
    //     `https://stage-api.drgreennft.com/api/v1/dapp/strains?${params}`,
    //     {
    //         method: "GET",
    //         redirect: "follow",
    //         headers: {
    //             "x-auth-apikey": process.env.DAPP_API,
    //             "x-auth-signature": GenerateSignature(body),
    //             "Content-Type": "application/json",
    //         },
    //         cache: "force-cache",
    //     }
    // );

    // const strains = await getStrains.json();

    return (
        <ShopStrainsClient
            // strains={strains.data.strains}
            // totalStrains={strains.data.pageMetaDto.itemCount}
            countryCode={countryCode}
            takeStrains={"9"}
        />
    );
}
