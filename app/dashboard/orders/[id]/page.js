import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import GenerateSignature from "@/lib/dapp/generate-signature";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";

export const dynamic = "force-dynamic";

export default async function OrdersSingle({ params }) {
    const slug = await params;
    const session = await getServerSession(options);

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "text-orange-500";
            case "PAID":
                return "text-[#0aba90]";
            case "DELIVERED":
                return "text-[#0aba90]";
            default:
                return "text-red-500";
        }
    };

    const payload = {
        clientId: session?.user?.dappUser?.id,
        orderId: slug.id,
    };

    const getOrderReq = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/clients/${payload.clientId}/orders/${payload.orderId}`,
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

    const getOrderRes = await getOrderReq.json();

    return getOrderRes.success ? (
        <>
            <div className="block md:hidden mb-10">
                <Link
                    href="/dashboard"
                    className="text-xl font-semibold flex items-center gap-2"
                >
                    <Image
                        src="/images/icons/back-arrow.svg"
                        alt="Back Arrow"
                        width="31"
                        height="18"
                    />
                    Back
                </Link>
            </div>
            <div className="md:grid grid-cols-8 gap-8">
                <div className="col-span-2 relative hidden md:block">
                    <DashboardNav />
                </div>
                <div className="rounded-[20px] border-2 border-white p-8 xl:p-20 col-span-6">
                    <p className="text-2xl md:text-[28px] font-semibold">
                        Order <br />{" "}
                    </p>
                    <p className="text-base mb-8">
                        {getOrderRes.data.orderDetails.id}
                    </p>
                    <div className="grid xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2">
                            <p className="font-semibold text-xl mb-4">
                                Order Details
                            </p>
                            {getOrderRes.data.orderDetails.orderLines.map(
                                (lineItem, i) => (
                                    <div key={i}>
                                        <div className="grid sm:flex gap-x-8 gap-y-4 items-center">
                                            <div className="relative h-[100px] w-[100px] rounded-md border-2 border-white">
                                                <Image
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_IMAGE_SERVER +
                                                        lineItem.strain.imageUrl
                                                    }
                                                    alt={lineItem.strain.name}
                                                    fill
                                                    className="p-2"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-8 w-fit">
                                                <div>
                                                    <p className="text-xl font-semibold">
                                                        Product:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl">
                                                        {lineItem.strain.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl font-semibold">
                                                        Quantity:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl">
                                                        {lineItem.quantity}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl font-semibold">
                                                        Price:
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xl">
                                                        $
                                                        {lineItem.productAmount.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {getOrderRes.data.orderDetails
                                            .orderLines.length !=
                                        i + 1 ? (
                                            <hr className="border-none h-[1px] bg-white mb-8 mt-8" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="col-span-1">
                            <p className="font-semibold text-xl mb-4">
                                Shipping Address
                            </p>
                            <p className="text-base sm:text-xl">
                                {Object.entries(
                                    getOrderRes.data.orderDetails.client
                                        .shippings[0]
                                ).map((pair, i) => {
                                    if (
                                        pair[0] != "id" &&
                                        pair[0] != "createdAt" &&
                                        pair[0] != "countryCode"
                                    ) {
                                        if (pair[0] == "postalCode") {
                                            return pair[1];
                                        } else {
                                            return pair[1]
                                                ? pair[1] + ", "
                                                : "";
                                        }
                                    }
                                })}
                            </p>
                        </div>
                    </div>
                    <hr className="border-none h-[2px] bg-white mb-8 mt-8" />
                    <div>
                        <div className="grid md:flex gap-x-8 gap-y-4">
                            <p className="text-xl">
                                <span className="font-semibold">
                                    Payment Status <br />
                                </span>
                                <span
                                    className={getStatusColor(
                                        getOrderRes.data.orderDetails
                                            .paymentStatus
                                    )}
                                >
                                    {
                                        getOrderRes.data.orderDetails
                                            .paymentStatus
                                    }
                                </span>
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">
                                    Order Status <br />
                                </span>
                                <span
                                    className={getStatusColor(
                                        getOrderRes.data.orderDetails
                                            .orderStatus
                                    )}
                                >
                                    {getOrderRes.data.orderDetails.orderStatus}
                                </span>
                            </p>
                            <p className="text-xl">
                                <span className="font-semibold">
                                    Order Total <br />
                                </span>
                                $
                                {getOrderRes.data.orderDetails.totalAmount.toFixed(
                                    2
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        redirect("/dashboard/orders")
    );
}
