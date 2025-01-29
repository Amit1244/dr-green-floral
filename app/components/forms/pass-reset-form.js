"use client";

import { useEffect, useState, useRef, useActionState } from "react";
import { PasswordReset } from "@/lib/form-actions/actions";

export default function PasswordResetForm(props) {
    const [state, action, isPending] = useActionState(PasswordReset, undefined);
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);

    const changeForm = useRef(null);

    const getSearchParams = () => {
        let params = new URLSearchParams(document.location.search);
        setToken(params.get("token"));
        setId(params.get("id"));
    };

    useEffect(() => {
        getSearchParams();
    }, []);

    useEffect(() => {
        if (token && id && state?.success) {
            changeForm.current.reset();
        }
    }, [state, id, token]);

    return token && id ? (
        <form
            action={action}
            id="password_reset"
            name="password_reset"
            className="max-w-[600px] mx-auto text-center grid grid-cols-1 gap-4"
            ref={changeForm}
        >
            <input
                type="hidden"
                id="token"
                name="token"
                value={token}
                required
            />
            <input type="hidden" id="id" name="id" value={id} required />
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="password">
                        Enter New Password{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            maxLength={255}
                            required
                            name="password"
                            id="password"
                            type="password"
                            autoComplete="password"
                            className="p-4 rounded-[7px] border-2 border-[#0aba90] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.password && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.password}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password_confirm">
                        Confirm New Password{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            maxLength={255}
                            required
                            name="password_confirm"
                            id="password_confirm"
                            type="password"
                            autoComplete="password_confirm"
                            className="p-4 rounded-[7px] border-2 border-[#0aba90] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.password_confirm && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.password_confirm}
                        </p>
                    )}
                </div>
            </div>
            <div className="justify-center grid items-center">
                <button
                    type="submit"
                    title="CONFIRM PASSWORD"
                    className={`py-4 px-6 rounded-full bg-[#0ABA90] shadow border border-[#0ABA90] border-2 hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center ${
                        isPending ? "pointer-events-none" : ""
                    }`}
                >
                    CONFIRM PASSWORD
                    <svg
                        className={`animate-spin h-4 w-4 text-white ${
                            isPending ? "inline" : "hidden"
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
            </div>
            {state?.errors?.system && (
                <p className="text-red-500 text-center">
                    {state?.errors?.system}
                </p>
            )}
            {state?.success && (
                <p className="text-[#0ABA90] text-center">{state?.message}</p>
            )}
        </form>
    ) : (
        <form
            action={action}
            id="password_reset"
            name="password_reset"
            className="max-w-[600px] mx-auto text-center grid grid-cols-1 gap-4"
        >
            <div>
                <label htmlFor="email">
                    Confirm Email Address{" "}
                    <span className="text-red-500">*</span>
                </label>
                <div>
                    <input
                        maxLength={255}
                        required
                        name="email"
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="p-4 rounded-[7px] border-2 border-[#0aba90] font-normal bg-transparent outline-0 w-full font-medium"
                    />
                </div>
                {state?.errors?.email && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.email}
                    </p>
                )}
            </div>
            <div className="justify-center grid items-center">
                <button
                    type="submit"
                    title="CONFIRM EMAIL"
                    className="mr-auto py-4 px-6 border border-[#0ABA90] border-2 rounded-full bg-[#0ABA90] shadow hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center"
                >
                    CONFIRM EMAIL
                    <svg
                        className={`animate-spin h-4 w-4 text-white ${
                            isPending ? "inline" : "hidden"
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
            </div>
            {state?.errors?.system && (
                <p className="text-red-500 text-center">
                    {state?.errors?.system}
                </p>
            )}
            {state?.success && (
                <p className="text-[#0ABA90] text-center">{state?.message}</p>
            )}
        </form>
    );
}
