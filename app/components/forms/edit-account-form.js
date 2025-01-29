"use client";

import { editUserAccount } from "@/lib/form-actions/actions";
import { useState, useActionState, useMemo, useRef, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import { useSession } from "next-auth/react";

export default function EditAccountForm(props) {
    const { data: sessionClient, status, update } = useSession();
    const [state, action, isPending] = useActionState(
        editUserAccount,
        undefined
    );

    const [firstName, setFirstName] = useState(props.user.dappUser.firstName);
    const [lastName, setLastName] = useState(props.user.dappUser.lastName);

    const [email, setEmail] = useState(props.user.dappUser.email);

    // SHIPPING

    const [address1, setAddress1] = useState(
        props.user.dappUser.shippings[0].address1
    );
    const [address2, setAddress2] = useState(
        props.user.dappUser.shippings[0].address2
    );

    const [landmark, setLandmark] = useState(
        props.user.dappUser.shippings[0].landmark
    );
    const [city, setCity] = useState(props.user.dappUser.shippings[0].city);

    const [aState, setAState] = useState(
        props.user.dappUser.shippings[0].state
    );
    const [postalCode, setPostalCode] = useState(
        props.user.dappUser.shippings[0].postalCode
    );

    // BUSINESS

    const [businessType, setBusinessType] = useState(
        props.user.dappUser.clientBusinesses[0].businessType
    );
    const [businessName, setBusinessName] = useState(
        props.user.dappUser.clientBusinesses[0].name
    );

    const [businessAddress1, setBusinessAddress1] = useState(
        props.user.dappUser.clientBusinesses[0].address1
    );
    const [businessAddress2, setBusinessAddress2] = useState(
        props.user.dappUser.clientBusinesses[0].address2
    );

    const [businessLandmark, setBusinessLandmark] = useState(
        props.user.dappUser.clientBusinesses[0].landmark
    );
    const [businessCity, setBusinessCity] = useState(
        props.user.dappUser.clientBusinesses[0].city
    );

    const [businessState, setBusinessState] = useState(
        props.user.dappUser.clientBusinesses[0].city
    );
    const [businessPostalCode, setBusinessPostalCode] = useState(
        props.user.dappUser.clientBusinesses[0].postalCode
    );

    // Tel
    const [telValue, setTelValue] = useState(
        props.user.dappUser.phoneCode + props.user.dappUser.contactNumber
    );
    const [phoneCodeValue, setPhoneCodeValue] = useState(
        props.user.dappUser.phoneCode
    );
    const setTelHandler = (value) => {
        setTelValue(value || "");
        const phoneParsed = parsePhoneNumber(value || "");
        if (phoneParsed)
            setPhoneCodeValue(phoneParsed.countryCallingCode || "");
    };

    // Country
    const options = useMemo(() => countryList().getData(), []);

    const [countryValue, setCountryValue] = useState(
        props.user.dappUser.shippings[0].country
    );
    const [countryCode, setCountryCode] = useState(props.countryCode);

    const setCountryHandler = (value) => {
        setCountryValue(countryList().getLabel(value) || "");
        setCountryCode(value);
    };

    // Business
    const businessBlock = useRef(null);

    const businessHandler = (value) => {
        if (value) {
            const height = businessBlock.current
                .querySelector(".height")
                .getBoundingClientRect().height;
            businessBlock.current.style.height = `${height}px`;
        } else {
            businessBlock.current.style.height = `0px`;
        }
    };

    const [businessCountryValue, setBusinessCountryValue] = useState(
        props.user.dappUser.clientBusinesses[0].country
    );
    const [businessCountryCode, setBusinessCountryCode] = useState(
        props.countryCodeBusiness
    );

    const setBusinessCountryHandler = (value) => {
        setBusinessCountryValue(countryList().getLabel(value) || "");
        setBusinessCountryCode(value);
    };

    useEffect(() => {
        setTelHandler(telValue);
    }, [telValue]);

    useEffect(() => {
        return () => {
            update();
        };
    }, [isPending]);

    return (
        <form
            action={action}
            id="edit_account"
            name="edit_account"
            className="grid grid-cols-1 gap-4"
        >
            <input
                type="hidden"
                id="clientId"
                name="clientId"
                value={props.user.dappUser.id}
            />
            <input
                type="hidden"
                id="userId"
                name="userId"
                value={props.user._id}
            />
            <p className="text-2xl md:text-[28px] font-semibold mb-4 text-[#EBCFA6]">
                Contact Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="text-[#EBCFA6]">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={20}
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            autoComplete="given-name"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.firstName && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.firstName}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="lastName" className="text-[#EBCFA6]">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={20}
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            autoComplete="family-name"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.lastName && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.lastName}
                        </p>
                    )}
                </div>
            </div>
            <div className="sm:grid grid-cols-2 gap-4">
                <div className="mb-4 sm:mb-0">
                    <label htmlFor="email" className="text-[#EBCFA6]">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            maxLength={255}
                            required
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            autoComplete="email"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.email}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="contactNumber" className="text-[#EBCFA6]">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                        maxLength={20}
                        value={telValue}
                        withCountryCallingCode={true}
                        onChange={setTelHandler}
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        name="contactNumber"
                        id="contactNumber"
                        required
                    />
                    <input
                        id="phoneCode"
                        name="phoneCode"
                        autoComplete="tel-country-code"
                        type="hidden"
                        required
                        value={phoneCodeValue}
                    />
                    {state?.errors?.contactNumber && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.contactNumber}
                        </p>
                    )}
                </div>
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4">
                Shipping Address
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="address1" className="text-[#EBCFA6]">
                        Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="address1"
                            id="address1"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            type="text"
                            autoComplete="address-line1"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.address1 && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.address1}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address2" className="text-[#EBCFA6]">Address Line 2</label>
                    <div>
                        <input
                            name="address2"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            maxLength={50}
                            id="address2"
                            type="text"
                            autoComplete="address-line2"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="landmark" className="text-[#EBCFA6]">Landmark</label>
                    <div>
                        <input
                            name="landmark"
                            maxLength={50}
                            id="landmark"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            type="text"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="city" className="text-[#EBCFA6]">
                        {countryCode == "GB" ? "Town" : "City"}{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            autoComplete="address-level2"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.city && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.city}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="state" className="text-[#EBCFA6]">
                        {countryCode == "GB" ? "County" : "State"}{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="state"
                            id="state"
                            value={aState}
                            onChange={(e) => setAState(e.target.value)}
                            type="text"
                            autoComplete="address-level1"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.state && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.state}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="postalCode" className="text-[#EBCFA6]">
                        Postal Code <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={15}
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            type="text"
                            autoComplete="postal-code"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.postalCode && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.postalCode}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="countryCode" className="text-[#EBCFA6]">
                    Country <span className="text-red-500">*</span>
                </label>
                <div>
                    <select
                        id="countryCode"
                        name="countryCode"
                        autoComplete="country"
                        className="appearance-none p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        required
                        onChange={(e) => setCountryHandler(e.target.value)}
                        value={countryCode}
                    >
                        {options.map((option, i) => (
                            <option value={option.value} key={i}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="hidden"
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        required
                        defaultValue={countryValue}
                    />
                </div>
                {state?.errors?.countryCode && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.countryCode}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="business" className="cursor-pointer text-[#EBCFA6]">
                    <input
                        name="business"
                        id="business"
                        type="checkbox"
                        className="mr-2"
                        onClick={(e) => businessHandler(e.target.checked)}
                    />
                    Business?
                </label>
            </div>
            <div
                className="business h-0 overflow-hidden duration-500 ease-in-out"
                ref={businessBlock}
            >
                <div className="height grid gap-4">
                    <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4">
                        Business Details
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="businessType">Business Type</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessType"
                                    id="businessType"
                                    type="text"
                                    value={businessType}
                                    onChange={(e) =>
                                        setBusinessType(e.target.value)
                                    }
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessName">Business Name</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessName"
                                    id="businessName"
                                    value={businessName}
                                    onChange={(e) =>
                                        setBusinessName(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="organization"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessAddress1">
                                Address Line 1
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessAddress1"
                                    id="businessAddress1"
                                    value={businessAddress1}
                                    onChange={(e) =>
                                        setBusinessAddress1(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="address-line1"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessAddress2">
                                Address Line 2
                            </label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessAddress2"
                                    id="businessAddress2"
                                    value={businessAddress2}
                                    onChange={(e) =>
                                        setBusinessAddress2(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="address-line2"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessLandmark">Landmark</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessLandmark"
                                    id="businessLandmark"
                                    placeholder="Enter Landmark"
                                    value={businessLandmark}
                                    onChange={(e) =>
                                        setBusinessLandmark(e.target.value)
                                    }
                                    type="text"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessCity">City</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessCity"
                                    id="businessCity"
                                    value={businessCity}
                                    onChange={(e) =>
                                        setBusinessCity(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="address-level2"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessState">State</label>
                            <div>
                                <input
                                    maxLength={50}
                                    name="businessState"
                                    id="businessState"
                                    value={businessState}
                                    onChange={(e) =>
                                        setBusinessState(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="address-level1"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="businessPostalCode">
                                Postal Code
                            </label>
                            <div>
                                <input
                                    maxLength={15}
                                    name="businessPostalCode"
                                    id="businessPostalCode"
                                    value={businessPostalCode}
                                    onChange={(e) =>
                                        setBusinessPostalCode(e.target.value)
                                    }
                                    type="text"
                                    autoComplete="postal-code"
                                    className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="businessCountryCode">Country</label>
                        <div>
                            <select
                                id="businessCountryCode"
                                name="businessCountryCode"
                                autoComplete="country"
                                className="appearance-none p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                                onChange={(e) =>
                                    setBusinessCountryHandler(e.target.value)
                                }
                                value={businessCountryCode}
                            >
                                {options.map((option, i) => (
                                    <option value={option.value} key={i}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="hidden"
                                id="BusinessCountry"
                                name="BusinessCountry"
                                autoComplete="country-name"
                                value={businessCountryValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    title="UPDATE"
                    className={`py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] text-[#FFDDAC] border-2 hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center ${isPending ? "pointer-events-none" : ""
                        }`}
                >
                    UPDATE
                    <svg
                        className={`animate-spin h-4 w-4 text-white ${isPending ? "inline" : "hidden"
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
            <div className="text-center">
                {state?.errors?.system && !isPending && (
                    <p className="text-red-500 text-center">
                        {state?.errors?.system}
                    </p>
                )}
                {state?.success && !isPending && (
                    <p className="text-[#0aba90] text-center">
                        {state?.message}
                    </p>
                )}
            </div>
        </form>
    );
}
