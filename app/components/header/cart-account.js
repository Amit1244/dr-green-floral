"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function CartAccount(props) {
    const [session, setSession] = useState(props.session);
    const { data: sessionClient, status } = useSession();

    useEffect(() => {
        if (status !== "loading") setSession(sessionClient);
    }, [sessionClient, status]);

    const [menuOpen, setMenuOpen] = useState(false);

    const MenuHandler = (state) => {
        setMenuOpen(state);
    };

    if (session) {
        return (
            <nav className="flex justify-end items-center gap-6 sm:gap-10">
                <Link href="/cart" className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="19"
                        viewBox="0 0 24 19"
                        fill="none"
                    >
                        <path
                            d="M1 1H3.03999C3.60636 1 4.09842 1.36378 4.23425 1.88173L6.56383 10.8653C6.73554 11.5326 7.37111 12 8.10151 12H19.8084C20.5259 12 21.1513 11.5471 21.3383 10.8966L22.9452 5.26172C23.2143 4.31735 22.4583 3.38743 21.4152 3.38743H8.45261"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                        />
                        <path
                            d="M8 18C9.65685 18 11 16.6569 11 15C11 13.3431 9.65685 12 8 12C6.34315 12 5 13.3431 5 15C5 16.6569 6.34315 18 8 18Z"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                        />
                        <path
                            d="M19 18C20.6569 18 22 16.6569 22 15C22 13.3431 20.6569 12 19 12C17.3431 12 16 13.3431 16 15C16 16.6569 17.3431 18 19 18Z"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeMiterlimit="10"
                        />
                    </svg>
                    <span className="hidden md:inline text-[#EBCFA6] font-manrope">Cart</span>
                </Link>
                <div
                    title="Dashboard"
                    className="flex items-center gap-2 relative font-normal cursor-pointer"
                    onMouseOver={() => MenuHandler(true)}
                    onMouseLeave={() => MenuHandler(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="19"
                        viewBox="0 0 17 19"
                        fill="none"
                    >
                        <path
                            d="M8.49979 10.5714C11.064 10.5714 13.1426 8.49268 13.1426 5.9285C13.1426 3.36432 11.064 1.28564 8.49979 1.28564C5.93561 1.28564 3.85693 3.36432 3.85693 5.9285C3.85693 8.49268 5.93561 10.5714 8.49979 10.5714Z"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 17.7141C1 14.1427 3.85714 10.5713 8.5 10.5713C13.1429 10.5713 16 14.1427 16 17.7141"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="hidden md:inline text-[#EBCFA6] font-manrope">Dashboard</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                    >
                        <path
                            d="M1.5 1L7.5 7L13.5 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="stroke-[#C41242] md:stroke-white"
                        />
                    </svg>
                    <div
                        onMouseOver={() => MenuHandler(true)}
                        className={`pt-2 absolute top-full right-0 min-w-full ease-in-out duration-300 ${menuOpen
                            ? "opacity-100 z-20 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div
                            onMouseOver={() => MenuHandler(true)}
                            className={`justify-end text-end flex flex-col font-manrope items-end gap-2 p-4 rounded-[10px]  border-2 border-[#EBCFA6] backdrop-blur-[44px] cursor-auto whitespace-nowrap`}
                        >
                            <Link href="/dashboard" className="block md:hidden text-[#EBCFA6]">
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/cultivars"
                                className="hidden md:block text-[#EBCFA6]"
                            >
                                Cultivars
                            </Link>
                            <Link
                                href="/dashboard/orders"
                                className="hidden md:block text-[#EBCFA6]"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/dashboard/edit-account"
                                className="hidden md:block text-[#EBCFA6]"
                            >
                                Edit
                            </Link>
                            <Link
                                href="/dashboard/account"
                                className="hidden md:block text-[#EBCFA6]"
                            >
                                Account
                            </Link>
                            <Link
                                href="/dashboard/eligibility"
                                className="hidden md:block text-[#EBCFA6]"
                            >
                                Eligibility
                            </Link>
                            <button
                                className="font-normal whitespace-nowrap text-[#EBCFA6]"
                                title="Log Out"
                                onClick={signOut}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="flex justify-end items-center gap-10">
                <Link
                    href="/login"
                    className="flex text-[#EBCFA6]  items-center gap-2 font-manrope relative"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="19"
                        viewBox="0 0 17 19"
                        fill="none"
                    >
                        <path
                            d="M8.49979 10.5714C11.064 10.5714 13.1426 8.49268 13.1426 5.9285C13.1426 3.36432 11.064 1.28564 8.49979 1.28564C5.93561 1.28564 3.85693 3.36432 3.85693 5.9285C3.85693 8.49268 5.93561 10.5714 8.49979 10.5714Z"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1 17.7141C1 14.1427 3.85714 10.5713 8.5 10.5713C13.1429 10.5713 16 14.1427 16 17.7141"
                            stroke="#C41242"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Login
                </Link>
            </nav>
        );
    }
}
