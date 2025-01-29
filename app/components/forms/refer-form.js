"use client";

import { ReferDoctor } from "@/lib/form-actions/actions";
import { useRef, useState, useActionState, startTransition } from "react";

export default function ReferForm(props) {
    const [state, action, isPending] = useActionState(ReferDoctor, undefined);
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        startTransition(() => action(formData));
    }

    const [dob, setDob] = useState(props?.userDetails?.medicalRecord?.dob);

    // Other Medical Condition
    const [otherMedicalCondition, setOtherMedicalCondition] = useState(false);
    const otherMedicalConditionInput = useRef(null);

    const otherMedicalConditionHandler = () => {
        if (otherMedicalConditionInput.current.checked) {
            setOtherMedicalCondition(true);
        } else {
            setOtherMedicalCondition(false);
        }
    };

    // Other Medicines
    const [otherMedicinesTreatments, setOtherMedicinesTreatments] =
        useState(false);
    const otherMedicinesTreatmentsInput = useRef(null);

    const otherMedicinesTreatmentsHandler = () => {
        if (otherMedicinesTreatmentsInput.current.checked) {
            setOtherMedicinesTreatments(true);
        } else {
            setOtherMedicinesTreatments(false);
        }
    };

    // Signature
    const sigCanvas = useRef({});
    const [imageURL, setImageURL] = useState(null);
    const clear = () => sigCanvas.current.clear();
    const save = () =>
        setImageURL(
            sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        );

    const medicalHistory7 =
        props.userDetails?.medicalRecord?.medicalHistory7.slice();

    const medicalHistory7Relative = medicalHistory7.pop();

    return (
        <form
            id="refer_form"
            name="refer_form"
            className="text-left grid grid-cols-1 gap-4"
            onSubmit={handleSubmit}
        >
            <input
                type="hidden"
                name="userId"
                id="userId"
                value={props.userId}
            />
            <input
                type="hidden"
                name="clientId"
                id="clientId"
                value={props.clientId}
            />
            <p className="text-2xl md:text-[28px] font-semibold mb-4 text-[#EBCFA6]">
                Personal Details
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
                            type="text"
                            autoComplete="given-name"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.firstName}
                            readOnly
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
                            type="text"
                            autoComplete="family-name"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.lastName}
                            readOnly
                        />
                    </div>
                    {state?.errors?.lastName && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.lastName}
                        </p>
                    )}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dob" className="text-[#EBCFA6]">
                        Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={20}
                            name="dob"
                            id="dob"
                            type="date"
                            autoComplete="bday"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    {state?.errors?.dob && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.dob}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="gender" className="text-[#EBCFA6]">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                        <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                            <input
                                required
                                type="radio"
                                id="gender_male"
                                name="gender"
                                value="male"
                                className="mr-2 cursor-pointer"
                                defaultChecked={
                                    props.userDetails?.medicalRecord?.gender ===
                                        "male"
                                        ? "checked"
                                        : ""
                                }
                            />
                            Male
                        </label>
                        <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                            <input
                                type="radio"
                                id="gender_female"
                                name="gender"
                                value="female"
                                className="mr-2 cursor-pointer"
                                defaultChecked={
                                    props.userDetails?.medicalRecord?.gender ===
                                        "female"
                                        ? "checked"
                                        : ""
                                }
                            />
                            Female
                        </label>
                        <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                            <input
                                type="radio"
                                id="gender_other"
                                name="gender"
                                value="other"
                                className="mr-2 cursor-pointer"
                                defaultChecked={
                                    props.userDetails?.medicalRecord?.gender ===
                                        "other"
                                        ? "checked"
                                        : ""
                                }
                            />
                            Other
                        </label>
                    </div>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="text-[#EBCFA6]">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={255}
                            name="email"
                            id="email"
                            type="email"
                            autoComplete="email"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.email}
                            readOnly
                        />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.email}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="confirm_email" className="text-[#EBCFA6]">
                        Confirm Email Address{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={255}
                            name="confirm_email"
                            id="confirm_email"
                            type="email"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        />
                    </div>
                    {state?.errors?.confirm_email && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.confirm_email}
                        </p>
                    )}
                </div>
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4">
                Address
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
                            type="text"
                            autoComplete="address-line1"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].address1}
                            readOnly
                        />
                    </div>
                    {state?.errors?.address1 && (
                        <p className="text-red-500 text-sm leading-tight mt-2">
                            {state?.errors?.address1}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="address2">Address Line 2</label>
                    <div>
                        <input
                            name="address2"
                            maxLength={50}
                            id="address2"
                            type="text"
                            autoComplete="address-line2"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].address2}
                            readOnly
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
                            type="text"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].landmark}
                            readOnly
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="city" className="text-[#EBCFA6]">
                        City <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="city"
                            id="city"
                            type="text"
                            autoComplete="address-level2"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].city}
                            readOnly
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
                        State <span className="text-red-500">*</span>
                    </label>
                    <div>
                        <input
                            required
                            maxLength={50}
                            name="state"
                            id="state"
                            type="text"
                            autoComplete="address-level1"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].state}
                            readOnly
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
                            type="text"
                            autoComplete="postal-code"
                            className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                            value={props.userDetails.shippings[0].postalCode}
                            readOnly
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
                <label htmlFor="country" className="text-[#EBCFA6]">
                    Country <span className="text-red-500">*</span>
                </label>
                <div>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="appearance-none p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium opacity-50"
                        value={props.userDetails.shippings[0].country}
                        readOnly
                    />
                </div>
                {state?.errors?.country && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.country}
                    </p>
                )}
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4 text-[#EBCFA6]">
                Please select your medical condition. You may select more than
                one.
            </p>
            <div>
                <div className="flex flex-wrap gap-4 text-[#EBCFA6]">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="adhd"
                            value="adhd"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "adhd"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        ADHD
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="agoraphobia"
                            value="agoraphobia"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "agoraphobia"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Agoraphobia
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="anxiety"
                            value="anxiety"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "anxiety"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Anxiety
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="appetite_disorders"
                            value="appetite_disorders"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "appetite_disorders"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Appetite Disorders
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="arthritis"
                            value="arthritis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "arthritis"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Arthritis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="autistic_spectrum_disorder"
                            value="autistic_spectrum_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "autistic_spectrum_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Autistic Spectrum Disorder
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="back_and_neck_pain"
                            value="back_and_neck_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "back_and_neck_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Back and Neck Pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="bipolar"
                            value="bipolar"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "bipolar"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Bipolar
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="bladder_pain"
                            value="bladder_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "bladder_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Bladder Pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="cancer_pain_and_nausea"
                            value="cancer_pain_and_nausea"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "cancer_pain_and_nausea"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Cancer Pain and Nausea
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="chrohns_disease_or_colitis_pain"
                            value="chrohns_disease_or_colitis_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "chrohns_disease_or_colitis_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Chrohn&apos;s Disease or Colitis Pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="chronic_and_long_term_pain"
                            value="chronic_and_long_term_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "chronic_and_long_term_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Chronic and long term pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="chronic_fatigue_syndrome_cfs"
                            value="chronic_fatigue_syndrome_cfs"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "chronic_fatigue_syndrome_cfs"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Chronic Fatigue Syndrome (CFS)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="cluster_headaches"
                            value="cluster_headaches"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "cluster_headaches"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Cluster Headaches
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="complex_regional_pain_syndrome"
                            value="complex_regional_pain_syndrome"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "complex_regional_pain_syndrome"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Complex regional pain syndrome
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="depression"
                            value="depression"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "depression"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Depression
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="dermatology"
                            value="dermatology"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "dermatology"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Dermatology
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="dvt"
                            value="dvt"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "dvt"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        DVT
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="ehlers_danlos_syndrome_eds"
                            value="ehlers_danlos_syndrome_eds"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "ehlers_danlos_syndrome_eds"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Ehlers-Danlos Syndrome (EDS)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="epilepsy"
                            value="epilepsy"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "epilepsy"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Epilepsy
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="endometriosis"
                            value="endometriosis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "endometriosis"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Endometriosis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="female_gynaecological_pain"
                            value="female_gynaecological_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "female_gynaecological_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Female gynaecological pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="fibromyalgia"
                            value="fibromyalgia"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "fibromyalgia"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Fibromyalgia
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="irritable_bowel_syndrome_ibs"
                            value="irritable_bowel_syndrome_ibs"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "irritable_bowel_syndrome_ibs"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Irritable Bowel Syndrome (IBS)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="migraine"
                            value="migraine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "migraine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Migraine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="multiple_sclerosis_pain_and_muscle_spasm"
                            value="multiple_sclerosis_pain_and_muscle_spasm"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "multiple_sclerosis_pain_and_muscle_spasm"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Multiple Sclerosis pain and muscle spasm
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="nerve_pain"
                            value="nerve_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "nerve_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Nerve pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="ocd"
                            value="ocd"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "ocd"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        OCD
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="osteoporosis"
                            value="osteoporosis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "osteoporosis"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Osteoporosis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="parkinsons_disease"
                            value="parkinsons_disease"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "parkinsons_disease"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Parkinson&apos;s disease
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="personality_disorder"
                            value="personality_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "personality_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Personality Disorder
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="phantom_limb_pain"
                            value="phantom_limb_pain"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "phantom_limb_pain"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Phantom Limb Pain
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="post_traumatic_stress_disorder_ptsd"
                            value="post_traumatic_stress_disorder_ptsd"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "post_traumatic_stress_disorder_ptsd"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Post Traumatic Stress Disorder (PTSD)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="sciatica"
                            value="sciatica"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "sciatica"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Sciatica
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="scoliosis"
                            value="scoliosis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "scoliosis"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Scoliosis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="sleep_disorders"
                            value="sleep_disorders"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "sleep_disorders"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Sleep disorders
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="spondylolisthesis"
                            value="spondylolisthesis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "spondylolisthesis"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Spondylolisthesis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="the_menopause"
                            value="the_menopause"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "the_menopause"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        The Menopause
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="thalasemia_major_blood_disorder"
                            value="thalasemia_major_blood_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "thalasemia_major_blood_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Thalasemia Major Blood Disorder
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="tinnitus"
                            value="tinnitus"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "tinnitus"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Tinnitus
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="tourette_syndrome"
                            value="tourette_syndrome"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "tourette_syndrome"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Tourette Syndrome
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medical_condition[]"
                            id="trigeminal_neuralgia"
                            value="trigeminal_neuralgia"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "trigeminal_neuralgia"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Trigeminal Neuralgia
                    </label>
                    <label
                        className="font-normal cursor-pointer text-[13px] sm:text-base"
                        onClick={otherMedicalConditionHandler}
                    >
                        <input
                            name="medical_condition[]"
                            id="other_medical_condition"
                            value="other_medical_condition"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            ref={otherMedicalConditionInput}
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalConditions.includes(
                                    "other_medical_condition"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Other Medical Condition
                    </label>
                </div>
                {state?.errors?.medical_condition && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medical_condition}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="other_medical_condition text-[#EBCFA6]">
                    Please provide further details of your medical condition.{" "}
                    {otherMedicalCondition && (
                        <span className="text-red-500">*</span>
                    )}
                </label>
                <div>
                    <input
                        maxLength={255}
                        name="other_medical_condition"
                        id="other_medical_condition"
                        defaultValue={
                            props.userDetails?.medicalRecord
                                .otherMedicalCondition
                        }
                        type="text"
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        required={otherMedicalCondition ? true : false}
                    />
                </div>
                {state?.errors?.other_medical_condition && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.other_medical_condition}
                    </p>
                )}
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mb-4 mt-4 text-[#EBCFA6]">
                Please select your Prescribed Medicines / Treatments (if any).
                You may select more than one.
            </p>
            <div>
                <div className="flex flex-wrap gap-4 text-[#EBCFA6]" >
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="alprazolam"
                            value="alprazolam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "alprazolam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Alprazolam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="alfentanil"
                            value="alfentanil"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "alfentanil"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Alfentanil
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="amitriptyline"
                            value="amitriptyline"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "amitriptyline"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Amitriptyline
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="atomoxetine"
                            value="atomoxetine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "atomoxetine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Atomoxetine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="azathioprine"
                            value="azathioprine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "azathioprine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Azathioprine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="buprenorphine"
                            value="buprenorphine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "buprenorphine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Buprenorphine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="bupropion"
                            value="bupropion"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "bupropion"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Bupropion
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="citalopram"
                            value="citalopram"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "citalopram"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Citalopram
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="clonazepam"
                            value="clonazepam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "clonazepam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Clonazepam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="codeine"
                            value="codeine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "codeine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Codeine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="codeine_phosphate"
                            value="codeine_phosphate"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "codeine_phosphate"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Codeine Phosphate
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="co_codamol_30_500"
                            value="co_codamol_30_500"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "co_codamol_30_500"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Co-Codamol (30/500)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="dexamfetamine"
                            value="dexamfetamine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "dexamfetamine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Dexamfetamine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="diazepam"
                            value="diazepam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "diazepam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Diazepam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="diclofenac"
                            value="diclofenac"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "diclofenac"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Diclofenac
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="dihydrocodeine"
                            value="dihydrocodeine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "dihydrocodeine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Dihydrocodeine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="fentanyl"
                            value="fentanyl"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "fentanyl"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Fentanyl
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="fluoxetine"
                            value="fluoxetine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "fluoxetine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Fluoxetine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="fluoxetine_prozac"
                            value="fluoxetine_prozac"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "fluoxetine_prozac"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Fluoxetine (Prozac)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="gabapentin"
                            value="gabapentin"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "gabapentin"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Gabapentin
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="guanfacine"
                            value="guanfacine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "guanfacine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Guanfacine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="infliximab"
                            value="infliximab"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "infliximab"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Infliximab
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="lisdexamfetamine"
                            value="lisdexamfetamine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "lisdexamfetamine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Lisdexamfetamine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="lithium"
                            value="lithium"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "lithium"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Lithium
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="lorazepam"
                            value="lorazepam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "lorazepam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Lorazepam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="melatonin"
                            value="melatonin"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "melatonin"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Melatonin
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="menthylphenidate"
                            value="menthylphenidate"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "menthylphenidate"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Menthylphenidate
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="meptazinol"
                            value="meptazinol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "meptazinol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Meptazinol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="methadone"
                            value="methadone"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "methadone"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Methadone
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="methotrexate"
                            value="methotrexate"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "methotrexate"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Methotrexate
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="mirtazapine"
                            value="mirtazapine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "mirtazapine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Mirtazapine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="modafinil"
                            value="modafinil"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "modafinil"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Modafinil
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="morphine"
                            value="morphine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "morphine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Morphine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="naproxen"
                            value="naproxen"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "naproxen"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Naproxen
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="nefopam"
                            value="nefopam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "nefopam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Nefopam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="nortripyline"
                            value="nortripyline"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "nortripyline"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Nortripyline
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="omepresol"
                            value="omepresol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "omepresol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Omepresol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="omezrapol"
                            value="omezrapol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "omezrapol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Omezrapol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="oxycodone"
                            value="oxycodone"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "oxycodone"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Oxycodone
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="paroxetine"
                            value="paroxetine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "paroxetine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Paroxetine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="pentacozine"
                            value="pentacozine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "pentacozine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Pentacozine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="pethidine"
                            value="pethidine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "pethidine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Pethidine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="prednisolone"
                            value="prednisolone"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "prednisolone"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Prednisolone
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="propranolol"
                            value="propranolol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "propranolol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Propranolol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="remifentanil"
                            value="remifentanil"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "remifentanil"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Remifentanil
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="sertraline"
                            value="sertraline"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "sertraline"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Sertraline
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="sodium_valproate"
                            value="sodium_valproate"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "sodium_valproate"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Sodium Valproate
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="suvorexant"
                            value="suvorexant"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "suvorexant"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Suvorexant
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="tapentadol"
                            value="tapentadol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "tapentadol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Tapentadol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="temazepam"
                            value="temazepam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "temazepam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Temazepam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="tramadol"
                            value="tramadol"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "tramadol"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Tramadol
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="trazodone"
                            value="trazodone"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "trazodone"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Trazodone
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="triazolam"
                            value="triazolam"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "triazolam"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Triazolam
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="venlafaxine"
                            value="venlafaxine"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "venlafaxine"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Venlafaxine
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="zolpidem"
                            value="zolpidem"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "zolpidem"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Zolpidem
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicines_treatments[]"
                            id="zopiclone"
                            value="zopiclone"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "zopiclone"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Zopiclone
                    </label>
                    <label
                        className="font-normal cursor-pointer text-[13px] sm:text-base"
                        onClick={otherMedicinesTreatmentsHandler}
                    >
                        <input
                            name="medicines_treatments[]"
                            id="other_medicines_treatments"
                            value="other_medicines_treatments"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            ref={otherMedicinesTreatmentsInput}
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicinesTreatments.includes(
                                    "other_medicines_treatments"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Other Prescribed Medicines / Treatments
                    </label>
                </div>
                {state?.errors?.medicines_treatments && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicines_treatments}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="other_medicines_treatments text-[#EBCFA6]">
                    Please provide further details of your prescribed medicines
                    / treatments.{" "}
                    {otherMedicinesTreatments && (
                        <span className="text-red-500">*</span>
                    )}
                </label>
                <div>
                    <input
                        maxLength={255}
                        name="other_medicines_treatments"
                        id="other_medicines_treatments"
                        type="text"
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        required={otherMedicinesTreatments ? true : false}
                        defaultValue={
                            props.userDetails?.medicalRecord
                                .otherMedicalTreatments
                        }
                    />
                </div>
                {state?.errors?.other_medicines_treatments && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.other_medicines_treatments}
                    </p>
                )}
            </div>
            <div>
                <p className="text-2xl md:text-[28px] font-semibold mt-4 mb-2 text-[#EBCFA6]">
                    Medical History
                </p>
                <p className="mb-4 text-[#EBCFA6]">
                    Please provide detailed information about any medical
                    condition(s) or problem(s) for which you have received a
                    diagnosis. These conditions must have been diagnosed by a
                    GP, specialist, or other medical professional. This
                    information will help us determine how we can best assist
                    you.
                </p>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Do you have a history of heart problems including
                    palpitations, heart attack (MI), stroke, angina, chest pain,
                    shortness of breath, arrhythmias (funny heart beats),
                    pacemaker, or taking any heart medications?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory0_true"
                            name="medicalHistory0"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory0
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory0_false"
                            name="medicalHistory0"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory0
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Are you currently being treated for cancer or undergoing any
                    cancer treatments? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory1_true"
                            name="medicalHistory1"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory1
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory1_false"
                            name="medicalHistory1"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory1
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Are you currently taking Immunosuppressants or Immunotherapy
                    medication? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory2_true"
                            name="medicalHistory2"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory2
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory2_false"
                            name="medicalHistory2"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory2
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Do you have any history of Liver Disease including
                    hepatitis, elevated liver enzyme function blood tests, fatty
                    liver cirrhosis? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory3_true"
                            name="medicalHistory3"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory3
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory3_false"
                            name="medicalHistory3"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory3
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Psychiatric history - Have you ever been referred to a
                    psychiatrist health service?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory4_true"
                            name="medicalHistory4"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory4
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory4_false"
                            name="medicalHistory4"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory4
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Have You Ever Been Diagnosed With?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="mania_bipolar_disorder"
                            value="mania_bipolar_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "mania_bipolar_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Mania (bipolar disorder)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="schizophrenia"
                            value="schizophrenia"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "schizophrenia"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Schizophrenia
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="depression"
                            value="depression"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "depression"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Depression
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="ptsd"
                            value="ptsd"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "ptsd"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        PTSD
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="anxiety_disorders"
                            value="anxiety_disorders"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "anxiety_disorders"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Anxiety Disorders including Generalized Anxiety
                        disorder, OCD or other
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="personality_disorder"
                            value="personality_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "personality_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Personality Disorder
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory5[]"
                            id="none"
                            value="none"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory5.includes(
                                    "none"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        None
                    </label>
                </div>
                {state?.errors?.medicalHistory5 && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory5}
                    </p>
                )}
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Do you currently or have you ever felt suicidal or had
                    suicidal thoughts? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory6_true"
                            name="medicalHistory6"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory6
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory6_false"
                            name="medicalHistory6"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory6
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Family History - Does anyone in your family suffer from any
                    of the following conditions and if so, what is their
                    relation to you? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="psychosis"
                            value="psychosis"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes("psychosis")
                                    ? "checked"
                                    : ""
                            }
                        />
                        Psychosis
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="schizophrenia"
                            value="schizophrenia"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes("schizophrenia")
                                    ? "checked"
                                    : ""
                            }
                        />
                        Schizophrenia
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="schizoaffective_disorder"
                            value="schizoaffective_disorder"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes(
                                    "schizoaffective_disorder"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Schizoaffective disorder
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="anxiety"
                            value="anxiety"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes("anxiety")
                                    ? "checked"
                                    : ""
                            }
                        />
                        Anxiety
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="depression"
                            value="depression"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes("depression")
                                    ? "checked"
                                    : ""
                            }
                        />
                        Depression
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="bipolar_manic_depression_mania"
                            value="bipolar_manic_depression_mania"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes(
                                    "bipolar_manic_depression_mania"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Bipolar / Manic Depression / Mania
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory7[]"
                            id="none"
                            value="none"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                medicalHistory7.includes("none")
                                    ? "checked"
                                    : ""
                            }
                        />
                        None
                    </label>
                </div>
                {state?.errors?.medicalHistory7 && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory7}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="medicalHistory7Relation text-[#EBCFA6]">Relation</label>
                <div>
                    <input
                        maxLength={255}
                        name="medicalHistory7Relation"
                        id="medicalHistory7Relation"
                        defaultValue={medicalHistory7Relative}
                        type="text"
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        placeholder="ie. parent/sibling/cousin/uncle/aunt/child"
                    />
                </div>
                {state?.errors?.medicalHistory7Relation && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory7Relation}
                    </p>
                )}
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Drug and Alcohol History - Do you have any personal history
                    of drug abuse or dependency such as: heroin, cocaine, LSD,
                    marijuana, ecstasy, GHB, legal highs such as spice,
                    prescription drug abuse (such as opioids, prescription
                    painkillers or benzodiazepines)?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory8_true"
                            name="medicalHistory8"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory8
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory8_false"
                            name="medicalHistory8"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory8
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Do you have a history of alcohol abuse or dependency?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory9_true"
                            name="medicalHistory9"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory9
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory9_false"
                            name="medicalHistory9"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory9
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Have you ever been under the care of drug and alcohol
                    services? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory10_true"
                            name="medicalHistory10"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory10
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory10_false"
                            name="medicalHistory10"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory10
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <label htmlFor="medicalHistory11 text-[#EBCFA6]">
                    How many units of Alcohol do you drink per week?{" "}
                    <span className="text-red-500">*</span>
                </label>
                <div>
                    <input
                        maxLength={255}
                        name="medicalHistory11"
                        id="medicalHistory11"
                        defaultValue={
                            props.userDetails?.medicalRecord?.medicalHistory11
                        }
                        type="text"
                        required
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                    />
                </div>
                {state?.errors?.medicalHistory11 && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory11}
                    </p>
                )}
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Do you use cannabis to reduce or eliminate the use of any
                    medications that have been prescribed for your medical
                    condition? <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory12_true"
                            name="medicalHistory12"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory12
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory12_false"
                            name="medicalHistory12"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory12
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Cannabis History - If you do use cannabis currently, how
                    often do you use cannabis?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory13_everyday"
                            name="medicalHistory13"
                            value="everyday"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory13.includes(
                                    "everyday"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Everyday
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory13_every_other_day"
                            name="medicalHistory13"
                            value="every_other_day"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory13.includes(
                                    "every_other_day"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Every other day
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory13_1_2_times_per_week"
                            name="medicalHistory13"
                            value="1_2_times_per_week"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory13.includes(
                                    "1_2_times_per_week"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        1-2 times per week
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory13_never"
                            name="medicalHistory13"
                            value="never"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory13.includes(
                                    "never"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Never
                    </label>
                </div>
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    If you have used cannabis, how have you used cannabis?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory14[]"
                            id="smoking"
                            value="smoking"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory14.includes(
                                    "smoking"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Smoking (joints)
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory14[]"
                            id="vaporizing"
                            value="vaporizing"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory14.includes(
                                    "vaporizing"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Vaporizing
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory14[]"
                            id="ingestion"
                            value="ingestion"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory14.includes(
                                    "ingestion"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Ingestion
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory14[]"
                            id="topical"
                            value="topical"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory14.includes(
                                    "topical"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        Topical
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            name="medicalHistory14[]"
                            id="none"
                            value="none"
                            type="checkbox"
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord?.medicalHistory14.includes(
                                    "none"
                                )
                                    ? "checked"
                                    : ""
                            }
                        />
                        None
                    </label>
                </div>
                {state?.errors?.medicalHistory14 && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory14}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="medicalHistory15 text-[#EBCFA6]">
                    How much cannabis do you currently use per day?{" "}
                    <span className="text-red-500">*</span>
                </label>
                <div>
                    <input
                        maxLength={255}
                        name="medicalHistory15"
                        id="medicalHistory15"
                        defaultValue={
                            props.userDetails?.medicalRecord?.medicalHistory15
                        }
                        type="text"
                        required
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                        placeholder="ie. number
                    of ounces, grams or joints per day"
                    />
                </div>
                {state?.errors?.medicalHistory15 && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.medicalHistory15}
                    </p>
                )}
            </div>
            <div>
                <p className="mb-2 text-[#EBCFA6]">
                    Have you had any serious reaction to cannabis?{" "}
                    <span className="text-red-500">*</span>
                </p>
                <div className="flex flex-wrap gap-4">
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            required
                            type="radio"
                            id="medicalHistory16_true"
                            name="medicalHistory16"
                            value={true}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                props.userDetails?.medicalRecord
                                    ?.medicalHistory16
                                    ? "checked"
                                    : ""
                            }
                        />
                        Yes
                    </label>
                    <label className="font-normal cursor-pointer text-[13px] sm:text-base">
                        <input
                            type="radio"
                            id="medicalHistory16_false"
                            name="medicalHistory16"
                            value={false}
                            className="mr-2 cursor-pointer"
                            defaultChecked={
                                !props.userDetails?.medicalRecord
                                    ?.medicalHistory16
                                    ? "checked"
                                    : ""
                            }
                        />
                        No
                    </label>
                </div>
            </div>
            <div>
                <label htmlFor="prescriptionsSupplements text-[#EBCFA6]">
                    Please list current prescriptions and over the counter
                    suppliments (including details of any over the counter CBD
                    oils/products if applicable)
                </label>
                <div>
                    <input
                        maxLength={255}
                        name="prescriptionsSupplements"
                        id="prescriptionsSupplements"
                        defaultValue={
                            props.userDetails?.medicalRecord
                                ?.prescriptionsSupplements
                        }
                        type="text"
                        className="p-4 rounded-[7px] border-2 border-[#EBCFA6] font-normal bg-transparent outline-0 w-full font-medium"
                    />
                </div>
                {state?.errors?.prescriptionsSupplements && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.prescriptionsSupplements}
                    </p>
                )}
            </div>
            <p className="text-2xl md:text-[28px] font-semibold mt-4 mb-4 text-[#EBCFA6]">
                Consent Form
            </p>
            <div
                className="text-sm text-[#EBCFA6] sm:text-lg p-4 rounded-[7px] border-2 border-[#EBCFA6]  bg-transparent outline-0 w-full font-medium max-h-[400px] overflow-y-scroll consent-form"
                dangerouslySetInnerHTML={{ __html: props.consentForm }}
            />
            <div>
                <label className="font-normal cursor-pointer text-[13px] sm:text-base text-[#EBCFA6]">
                    <input
                        name="consent_agree"
                        id="consent_agree"
                        value="consent_agree"
                        type="checkbox"
                        className="mr-2 cursor-pointer "
                        required
                    />
                    I agree to the above statement.{" "}
                    <span className="text-red-500">*</span>
                </label>
                {state?.errors?.consent_agree && (
                    <p className="text-red-500 text-sm leading-tight mt-2">
                        {state?.errors?.consent_agree}
                    </p>
                )}
            </div>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <button
                    type="submit"
                    title="Save"
                    className={`uppercase py-4 px-6 rounded-full bg-[#C41242] border-[#C41242] text-[#FFDDAC]shadow hover:shadow-[0_0_15px_0px_#0ABA90] duration-200 ease-in-out cursor-pointer flex gap-2 justify-center items-center ${isPending ? "pointer-events-none" : ""
                        }`}
                >
                    Save
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
            {state?.errors?.system && (
                <p className="text-red-500 text-center">
                    {state?.errors?.system}
                </p>
            )}
            {state?.success && (
                <p className="text-[#0aba90] text-center">{state?.message}</p>
            )}
        </form>
    );
}
