import { options } from "@/app/api/auth/[...nextauth]/options";
import QuantityCartBuy from "@/app/components/shop/product/quantity-cart-buy";
import GenerateSignature from "@/lib/dapp/generate-signature";
import { getServerSession } from "next-auth";
import Image from "next/image";

export async function generateMetadata({ params }) {
    const slug = await params;
    const session = await getServerSession(options);

    const payload = { strainId: slug.id };

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

    const strain = (await getStrains.json()).data;

    return {
        title: strain.name,
        description: strain.description,
        openGraph: {
            images: [process.env.NEXT_PUBLIC_IMAGE_SERVER + strain.imageUrl],
        },
    };
}

export default async function ProductSingle({ params }) {
    const slug = await params;
    const session = await getServerSession(options);

    const payload = { strainId: slug.id };

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

    const strain = (await getStrains.json()).data;

    const availableLocations = strain?.strainLocations.map((loc) => {
        if (loc.isAvailable) return loc.location.country;
    });

    return (
        <main>
            <section className="pt-10 md:pt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
                        <div className="relative w-full h-0 pb-[100%] rounded-[20px] border-2 border-[#EBCFA6]">
                            <div>
                                <Image
                                    src={
                                        process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                        strain.imageUrl
                                    }
                                    alt={strain.name}
                                    fill
                                    className="p-8 xl:p-20 w-full h-full object-center"
                                />
                            </div>
                        </div>
                        <div>
                            {strain?.isAvailable ? (
                                <div className="flex gap-2 items-start mb-16">
                                    <span className="block w-3.5 h-3.5 bg-[#0aba90] rounded-full mt-1" />
                                    <p className="flex flex-col text-base">
                                        <span className="opacity-50">
                                            In stock.
                                        </span>
                                        <span className="font-bold text-[#EBCFA6]">
                                            {availableLocations.length
                                                ? "Available in " +
                                                availableLocations
                                                    .map((loc) => loc)
                                                    .join(", ")
                                                : ""}
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <div className="flex gap-2 items-center mb-16">
                                    <span className="block w-3.5 h-3.5 bg-red-500 rounded-full" />
                                    <div>
                                        <p className="opacity-50 text-base">
                                            Out of stock.
                                        </p>
                                    </div>
                                </div>
                            )}
                            <h1 className="h2 mb-1 text-[#EBCFA6]">{strain.name}</h1>
                            <p className="mb-8 opacity-50 text-[#EBCFA6]">
                                {strain.description}
                            </p>
                            {/* {session?.user?.dappUser?.isActive &&
                        session?.user?.dappUser?.adminApproval == "VERIFIED" &&
                        session?.user?.dappUser?.isKYCVerified ? (
                            <QuantityCartBuy
                                price={strain.retailPrice}
                                strain={strain.id}
                                clientCart={
                                    session?.user?.dappUser?.clientCart[0]?.id
                                }
                            />
                        ) : (
                            <p className="text-orange-500 mb-16">
                                Account not approved yet.
                            </p>
                        )} */}
                            <QuantityCartBuy
                                price={strain.retailPrice}
                                strain={strain.id}
                                clientCart={
                                    session?.user?.dappUser?.clientCart[0]?.id
                                }
                            />
                            <div className="grid gap-4 text-[#EBCFA6]">
                                <p className="capitalize">
                                    <strong>FEELINGS: </strong>
                                    {strain.feelings}
                                </p>
                                <p className="capitalize">
                                    <strong>HELPS WITH: </strong>
                                    {strain.helpsWith}
                                </p>
                                <p className="capitalize">
                                    <strong>FLAVOURS: </strong>
                                    {strain.flavour}
                                </p>
                                <p className="capitalize">
                                    <strong>POPULARITY: </strong>
                                    {strain.popularity}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
