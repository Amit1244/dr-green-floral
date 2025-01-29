"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuantityCartBuy(props) {
    const [cartMessage, setCartMessage] = useState(null);
    const [cartErrorMessage, setCartErrorMessage] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const plusHandler = () => {
        setQuantity((prev) => prev + 1);
        return;
    };

    const minusHandler = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
        return;
    };

    const cartHandler = async () => {
        if (cartLoading) return;
        setCartLoading(true);

        const payload = {
            items: [
                {
                    quantity: quantity,
                    strainId: props.strain,
                },
            ],
            clientCartId: props.clientCart,
        };

        const postCart = await fetch("/api/shop/cart/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const res = await postCart.json();

        if (res.success) {
            setCartMessage("Successfully added to cart.");
            setQuantity(1);
        } else {
            setCartErrorMessage("There was a problem, please try again.");
        }
        return setCartLoading(false);
    };

    return (
        <div>
            <div className="flex gap-4 items-center mb-8">
                <p className="opacity-50 text-[#EBCFA6]">Quantity</p>
                <div className="py-3 px-4 rounded-full bg-transparent border-[#EBCFA6] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ffffff] duration-200 ease-in-out flex items-center">
                    <button
                        title="Minus Quantity"
                        className="p-2"
                        onClick={minusHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="2"
                            viewBox="0 0 14 2"
                            fill="none"
                            className="w-[14px] h-[14px]"
                        >
                            <path d="M13 1L4.76837e-07 1" stroke="white" />
                        </svg>
                    </button>
                    <input
                        className="appearance-none w-[40px] text-center bg-transparent text-white pointer-events-none"
                        type="text"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        readOnly
                    />
                    <button
                        title="Plus Quantity"
                        className="p-2"
                        onClick={plusHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="w-[14px] h-[14px]"
                        >
                            <path
                                d="M7.30859 0.0219727V13.3691"
                                stroke="white"
                            />
                            <path
                                d="M13.9814 6.69531L0.634295 6.69531"
                                stroke="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <p className="text-3xl font-semibold mb-8 text-[#EBCFA6]">
                ${props.price.toFixed(2)}
            </p>
            <div className="relative mb-16 text-center">
                <div className="relative">
                    <button
                        className="w-full py-4 px-6 rounded-full bg-transparent bg-[#C41242] border-[#C41242] text-[#FFDDAC]border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ffffff] duration-200 ease-in-out"
                        title="ADD TO CART"
                        onClick={cartHandler}
                    >
                        ADD TO CART
                        <svg
                            className={`animate-spin ml-2 h-4 w-4 text-white ${cartLoading ? "inline" : "hidden"
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </button>
                    {cartMessage && (
                        <p className="w-full text-[#0aba90] text-base absolute top-full right-1/2 translate-x-1/2 mt-2">
                            {cartMessage}
                        </p>
                    )}
                    {cartErrorMessage && (
                        <p className="text-red-500 text-base absolute top-full right-1/2 translate-x-1/2 mt-2">
                            {cartErrorMessage}
                        </p>
                    )}
                </div>
                {cartMessage && (
                    <Link href="/cart">
                        <button
                            className="w-full mt-10 uppercase py-4 px-6 rounded-full  border-[#EBCFA6] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                            title="View Cart"
                        >
                            View Cart
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
