"use client";

import { useState } from "react";

export default function DeleteAccountButton(props) {
    const [popup, setPopup] = useState(false);
    const [deleteRequest, setDeleteRequest] = useState(false);

    const user = {
        name: `${props.user.firstName} ${props.user.lastName}`,
        email: props.user.email,
        clientId: props.user.id,
    };

    const popupOpenHandler = () => {
        setPopup(true);
    };

    const popupCloseHandler = () => {
        setPopup(false);
    };

    const requestDeleteHandler = async () => {
        const requestDelete = await fetch("/api/account/actions/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const requestDeleteRes = await requestDelete.json();

        setDeleteRequest(requestDeleteRes);
    };

    return (
        <div className="relative">
            <div
                className={`absolute border border-red-500 border-2 bottom-full right-1/2 translate-x-1/2 bg-black p-6 rounded-[20px] w-[300px] mb-6 duration-500 ease-in-out ${
                    popup ? "opacity-full" : "opacity-0"
                }`}
            >
                {deleteRequest ? (
                    <div>
                        <p className="mb-4">
                            {deleteRequest.success
                                ? "Deletion request has been made."
                                : "There was a problem, please contact us."}
                        </p>
                        <button
                            className="uppercase py-4 px-6 rounded-full bg-transparent border border-red-500 border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ef4444] duration-200 ease-in-out"
                            title="Close"
                            onClick={popupCloseHandler}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-4">
                            Are you sure you want to delete your account?{" "}
                            <span className="font-bold">
                                All order history and user details will be lost.
                            </span>
                        </p>
                        <div className="flex justify-between items-center">
                            <button
                                title="Stay"
                                className="uppercase py-4 px-6 rounded-full bg-transparent border border-[#0ABA90] border-2 shadow hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out"
                                onClick={popupCloseHandler}
                            >
                                Stay
                            </button>
                            <button
                                className="uppercase py-4 px-6 rounded-full bg-transparent border border-red-500 border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ef4444] duration-200 ease-in-out"
                                title="Delete"
                                onClick={requestDeleteHandler}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
                <span className="absolute bottom-[-22px] right-1/2 translate-x-1/2 h-0 w-0 border-[20px] border-transparent border-t-red-500 border-b-0 block" />
            </div>
            <button
                className="py-4 px-6 rounded-full bg-transparent border border-red-500 border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#ef4444] duration-200 ease-in-out"
                title="DELETE ACCOUNT"
                onClick={popupOpenHandler}
            >
                DELETE ACCOUNT
            </button>
        </div>
    );
}
