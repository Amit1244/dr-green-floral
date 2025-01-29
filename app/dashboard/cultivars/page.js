import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ShopStrains from "@/app/components/shop/strains/shop-strains";
import GetUserCountryByIp from "@/lib/general/get-user-country-by-ip";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Cultivars() {
    const session = await getServerSession(options);
    const eligible = session?.user?.dappUser?.adminApproval == "VERIFIED";

    const country = await GetUserCountryByIp();

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
                        Our Cultivars
                    </p>
                    <p className="mb-8 text-[#EBCFA6]">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat extraordinary
                        cannabis strains. Lorem ipsum dolor sit amet,
                        consectetuer adipiscing elit, sed diam nonummy nibh
                        euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat.
                    </p>
                    {country != "GB" || eligible ? (
                        <ShopStrains />
                    ) : (
                        <p className="text-orange-500">
                            Once approved available strains will show here.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
