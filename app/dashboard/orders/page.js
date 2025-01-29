import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import GenerateSignature from "@/lib/dapp/generate-signature";
import OrdersClient from "@/app/components/dashboard/orders/orders-client";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Orders() {
    const user = (await getServerSession(options))?.user;

    const payload = {
        clientId: user?.dappUser?.id,
    };

    const getOrdersReq = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/client/${user?.dappUser?.id}/orders`,
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

    const getOrdersRes = await getOrdersReq.json();

    const orders = getOrdersRes?.data?.orders?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
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
                <div className="rounded-[20px] border-2 border-[#EBCFA6] p-8 xl:p-20 col-span-6">
                    <p className="text-2xl md:text-[28px] font-semibold mb-8 text-[#EBCFA6]">
                        Orders
                    </p>
                    <OrdersClient orders={orders} take={10} />
                </div>
            </div>
        </>
    );
}
