"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartItem(props) {
    const [quantity, setQuantity] = useState(props.details.quantity);
    const [total, setTotal] = useState(props.details.totalAmount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setQuantity(props.details.quantity);
        setTotal(props.details.totalAmount);
    }, [props.details.quantity, props.details.totalAmount]);

    const plusHandler = async () => {
        if (loading) return;
        setLoading(true);

        const payload = {
            items: [
                {
                    quantity: 1,
                    strainId: props.details.strain.id,
                },
            ],
            clientCartId: props.cart?.id,
        };

        const postCart = await fetch("/api/shop/cart/plus-item-quantity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const res = await postCart.json();

        if (res.success) await props.refreshCart();

        return setLoading(false);
    };

    const minusHandler = async () => {
        if (loading) return;
        setLoading(true);

        const payload = {
            cartItems: props?.cart?.cartItems,
            clientCartId: props.cart?.id,
            strainId: props.details.strain.id,
            quantity: quantity - 1,
        };

        const minusItemReq = await fetch("/api/shop/cart/minus-item-quantity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const minusItemRes = await minusItemReq.json();

        if (minusItemRes.success) await props.refreshCart();

        return setLoading(false);
    };

    const removeItemHandler = async () => {
        if (loading) return;
        setLoading(true);

        const payload = {
            cartItems: props?.cart?.cartItems,
            clientCartId: props.cart?.id,
            removeStrainId: props.details.strain.id,
        };

        const removeItemReq = await fetch("/api/shop/cart/remove-cart-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const removeItemRes = await removeItemReq.json();

        setLoading(false);

        if (removeItemRes.success) await props.refreshCart();

        return setLoading(false);
    };

    return (
        <>
            <div className="sm:col-span-2 grid sm:flex gap-2 sm:gap-4 items-center">
                <div className="h-[75px] sm:h-[100px] lg:h-[150px] min-w-[75px] sm:min-w-[100px] lg:min-w-[150px] w-fit relative rounded-[10px] sm:rounded-[20px] border-2 border-[#EBCFA6] p-2 sm:p-4">
                    <div className="relative h-full w-full">
                        <Image
                            src={
                                process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                props.image
                            }
                            alt={props.details.strain.name}
                            fill
                        />
                    </div>
                </div>
                <div>
                    <p className="text-sm sm:text-lg lg:text-2xl mb-1 text-[#EBCFA6]">
                        {props.details.strain.name}
                    </p>
                    <p className="text-sm sm:text-lg lg:text-2xl text-[#EBCFA6]">
                        ${props.details.strain.retailPrice.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="text-center flex justify-center">
                <div className="relative">
                    <div className="py-1 sm:py-3 px-1 sm:px-4 rounded-full bg-transparent border-[#EBCFA6] border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ffffff] duration-200 ease-in-out flex items-center">
                        <button
                            title="Minus Quantity"
                            className="p-1 sm:p-2"
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
                            className="p-1 sm:p-2"
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
                    <button
                        className="mt-2 text-[10px] text-[#C41242] tracking-widest absolute top-full loading-none right-1/2 translate-x-1/2 underline underline-offset-4"
                        title="REMOVE"
                        onClick={removeItemHandler}
                    >
                        REMOVE
                    </button>
                </div>
            </div>
            <p className="text-sm sm:text-lg lg:text-2xl text-end text-[#EBCFA6]">
                ${total.toFixed(2)}
            </p>
        </>
    );
}
