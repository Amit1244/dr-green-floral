"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardNav(props) {
    const path = usePathname();

    return (
        <div className="flex flex-col gap-4 sticky top-40">
            <Link
                href="/dashboard/cultivars"
                className={`text-2xl md:text-xl text-[#EBCFA6] lg:text-2xl xl:text-[28px] font-semibold flex justify-between gap-4 items-center ${path == "/dashboard/cultivars" || props.menuPage
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
            >
                Our Cultivars
                {path == "/dashboard/cultivars" || props.menuPage ? (
                    <Image
                        src="/images/icons/dashboard-nav-arrow.svg"
                        alt="Nav Selected Arrow"
                        width={11}
                        height={22}
                    />
                ) : (
                    ""
                )}
            </Link>
            <Link
                href="/dashboard/orders"
                className={`text-2xl md:text-xl text-[#EBCFA6] lg:text-2xl xl:text-[28px] font-semibold flex justify-between gap-4 items-center ${path == "/dashboard/orders" || props.menuPage
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
            >
                Orders
                {path == "/dashboard/orders" || props.menuPage ? (
                    <Image
                        src="/images/icons/dashboard-nav-arrow.svg"
                        alt="Nav Selected Arrow"
                        width={11}
                        height={22}
                    />
                ) : (
                    ""
                )}
            </Link>
            <Link
                href="/dashboard/edit-account"
                className={`text-2xl md:text-xl text-[#EBCFA6] lg:text-2xl xl:text-[28px] font-semibold flex justify-between gap-4 items-center ${path == "/dashboard/edit-account" || props.menuPage
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
            >
                Edit My Details
                {path == "/dashboard/edit-account" || props.menuPage ? (
                    <Image
                        src="/images/icons/dashboard-nav-arrow.svg"
                        alt="Nav Selected Arrow"
                        width={11}
                        height={22}
                    />
                ) : (
                    ""
                )}
            </Link>
            <Link
                href="/dashboard/account"
                className={`text-2xl md:text-xl text-[#EBCFA6] lg:text-2xl xl:text-[28px] font-semibold flex justify-between gap-4 items-center ${path == "/dashboard/account" || props.menuPage
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
            >
                Account
                {path == "/dashboard/account" || props.menuPage ? (
                    <Image
                        src="/images/icons/dashboard-nav-arrow.svg"
                        alt="Nav Selected Arrow"
                        width={11}
                        height={22}
                    />
                ) : (
                    ""
                )}
            </Link>
            <Link
                href="/dashboard/eligibility"
                className={`text-2xl md:text-xl text-[#EBCFA6] lg:text-2xl xl:text-[28px] font-semibold flex justify-between gap-4 items-center ${path == "/dashboard/eligibility" || props.menuPage
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
            >
                My Eligibility
                {path == "/dashboard/eligibility" || props.menuPage ? (
                    <Image
                        src="/images/icons/dashboard-nav-arrow.svg"
                        alt="Nav Selected Arrow"
                        width={11}
                        height={22}
                    />
                ) : (
                    ""
                )}
            </Link>
        </div>
    );
}
