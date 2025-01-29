import { options } from "@/app/api/auth/[...nextauth]/options";
import EditAccountForm from "@/app/components/forms/edit-account-form";
import { getAlpha2Code } from "@/data/countryCodes";
import { getServerSession } from "next-auth";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function EditAccount() {
    const session = await getServerSession(options);

    const countryCodeAlpha2 = await getAlpha2Code(
        session.user.dappUser.shippings[0].countryCode
    );

    const countryCodeBusinessAlpha2 = await getAlpha2Code(
        session.user.dappUser.clientBusinesses[0].businessCountryCode
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
                        Edit My Account
                    </p>
                    <EditAccountForm
                        user={session?.user}
                        countryCode={countryCodeAlpha2}
                        countryCodeBusiness={countryCodeBusinessAlpha2}
                    />
                </div>
            </div>
        </>
    );
}
