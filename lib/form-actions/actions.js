"use server";
import bcrypt from "bcryptjs";
import GenerateSignature from "../dapp/generate-signature";
import DBConnect from "../mongodb/db-connect";
import { User } from "../mongodb/db-schemas";
const crypto = require("crypto");
import { transporter } from "../emails/transporter";
import getAlpha3Code from "@/data/countryCodes";

function validateHasText(text) {
    return !text || text.trim() === "";
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateName = (name) => {
    return String(name).match(/^[a-zA-Z ]*$/);
};

const validatePhone = (phone) => {
    return String(phone).match(/^\+?(?:\d\s?){10,12}$/);
};

const RandomPassword = (length) => {
    // Initial characters without -, _ or 0
    let characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

    // Generate first character
    let password = characters.charAt(
        Math.floor(Math.random() * characters.length + 1)
    );

    // Add the symbols now
    characters += "-!?_*^";

    let n = characters.length;

    // Generate rest
    for (let i = 0; i < length - 1; i++) {
        password += characters.charAt(Math.floor(Math.random() * n));
    }

    // Return
    return password;
};

export const SystemError = async (log, where) => {
    await transporter.sendMail({
        from: `"Dr. Green Website" <${process.env.EMAIL_FROM}>`, // sender address
        to: process.env.EMAIL_DEV, // list of receivers
        subject: `System Error - ${where}`, // Subject line
        html: `Error: <br/>${JSON.stringify(log)}`,
    });
    console.log(log);
    const errors = {};
    errors.system =
        "Internal system error. Please contact support, or try again.";

    return { errors };
};

await DBConnect();

export async function registerNewUser(prevState, formData) {
    const errors = {};

    await DBConnect();

    // Fields for validation
    const credentials = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email").toLowerCase(),
        contactNumber: formData.get("contactNumber"),
        contactNumberCountry: formData.get("contactNumberCountry"),
        phoneCode: "+" + formData.get("phoneCode"),
        username: formData.get("username"),
        password: formData.get("password"),
        // Shipping
        address1: formData.get("address1"),
        city: formData.get("city"),
        state: formData.get("state"),
        country: formData.get("country"),
        countryCode: formData.get("countryCode"),
        postalCode: formData.get("postalCode"),
    };

    // Validate the required field has text
    for (const [key, value] of Object.entries(credentials)) {
        if (validateHasText(value)) {
            errors[key] = "Invalid input.";
        }
    }

    if (!validatePhone(credentials.contactNumber)) {
        // Validate Phone
        errors.contactNumber = "Not a valid contact number.";
    }

    // Validate email
    if (!validateEmail(credentials.email)) {
        errors.email = "Invalid email syntax.";
    }

    // Match username regex
    if (!credentials.username.match(/^[a-zA-Z0-9_-]*$/)) {
        errors.username =
            "Please only use letters, numbers, hyphen and underscore for your username.";
    }

    // Match password regex
    if (
        !credentials.password.match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
    ) {
        errors.password =
            "Please use eight characters, at least one letter, one number and one special character.";
    }

    // Return errors before proceeding
    if (Object.keys(errors).length > 0) {
        errors.system = "Please check for errors.";
        return { errors };
    }

    const createClientBody = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        phoneCode: credentials.phoneCode,
        phoneCountryCode: credentials.contactNumberCountry,
        contactNumber: credentials.contactNumber
            .replace(credentials.phoneCode, "")
            .replaceAll(" ", "")
            .trim(),
        clientBusiness: {
            businessType: formData.get("businessType"),
            name: formData.get("businessName"),
            address1: formData.get("businessAddress1"),
            address2: formData.get("businessAddress2"),
            landmark: formData.get("businessLandmark"),
            city: formData.get("businessCity"),
            state: formData.get("businessState"),
            country: formData.get("business")
                ? formData.get("businessPostalCode")
                : "",
            countryCode: formData.get("business")
                ? formData.get("businessCountryCode")
                : "",
            postalCode: formData.get("BusinessCountry"),
        },
        shipping: {
            address1: credentials.address1,
            address2: formData.get("address2"),
            landmark: formData.get("landmark"),
            city: credentials.city,
            state: credentials.state,
            country: credentials.country,
            countryCode: await getAlpha3Code(credentials.countryCode),
            postalCode: credentials.postalCode,
        },
    };

    const postCreateClient = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/clients`,
        {
            method: "POST",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(createClientBody),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createClientBody),
        }
    );
    const createClientRes = await postCreateClient.json();
    if (!createClientRes.success) {
        if (createClientRes.errorCode == 409) {
            errors.system = "Please check for errors.";
            if (createClientRes.message.includes("Phone")) {
                errors.contactNumber = "This number already exists.";
            } else if (createClientRes.message.includes("Email")) {
                errors.email = "This email already exists.";
            }
            return { errors };
        } else {
            return SystemError(createClientRes, "User Register (DAPP API)");
        }
    }

    // MongoDB

    // Create temp password
    // const tempPass = RandomPassword(15);
    const hash = bcrypt.hashSync(credentials.password, 12);
    // Create token to verify user for passowrd change
    // const token = crypto.randomBytes(64).toString("hex");

    const createUserObject = {
        clientId: createClientRes.data.client.id,
        username: credentials.username,
        email: credentials.email,
        hash: hash,
    };

    try {
        await User.create(createUserObject);
    } catch (err) {
        if (err.code == "11000") {
            const [key] = Object.keys(err.keyValue);
            if (key == "username") {
                errors.system = "Please check for errors.";
                errors[
                    key
                ] = `This ${key} already exists. Please log in or choose another.`;
                return { errors };
            }
        }
        return SystemError(err, "User Register (Create User MONGO DB)");
    }

    return {
        success: true,
        message: `Successfully registered! Please check your email to confirm your account.`,
    };
}

export async function editUserAccount(prevState, formData) {
    const errors = {};

    await DBConnect();

    // Fields for validation
    const credentials = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email").toLowerCase(),
        contactNumber: formData.get("contactNumber"),
        contactNumberCountry: formData.get("contactNumberCountry"),
        phoneCode: "+" + formData.get("phoneCode"),
        // Shipping
        address1: formData.get("address1"),
        city: formData.get("city"),
        state: formData.get("state"),
        country: formData.get("country"),
        countryCode: formData.get("countryCode"),
        postalCode: formData.get("postalCode"),
    };

    // Validate the required field has text
    for (const [key, value] of Object.entries(credentials)) {
        if (validateHasText(value)) {
            errors[key] = "Invalid input.";
        }
    }

    if (!validatePhone(credentials.contactNumber)) {
        // Validate Phone
        errors.contactNumber = "Not a valid contact number.";
    }

    // Validate email
    if (!validateEmail(credentials.email)) {
        errors.email = "Invalid email syntax.";
    }

    // Return errors before proceeding
    if (Object.keys(errors).length > 0) {
        errors.system = "Please check for errors.";
        return { errors };
    }

    const createClientBody = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        phoneCode: credentials.phoneCode,
        phoneCountryCode: credentials.contactNumberCountry,
        contactNumber: credentials.contactNumber
            .replace(credentials.phoneCode, "")
            .replaceAll(" ", "")
            .trim(),
        clientBusiness: {
            businessType: formData.get("businessType"),
            name: formData.get("businessName"),
            address1: formData.get("businessAddress1"),
            address2: formData.get("businessAddress2"),
            landmark: formData.get("businessLandmark"),
            city: formData.get("businessCity"),
            state: formData.get("businessState"),
            country: formData.get("business")
                ? formData.get("businessPostalCode")
                : "",
            countryCode: formData.get("business")
                ? formData.get("businessCountryCode")
                : "",
            postalCode: formData.get("BusinessCountry"),
        },
        shipping: {
            address1: credentials.address1,
            address2: formData.get("address2"),
            landmark: formData.get("landmark"),
            city: credentials.city,
            state: credentials.state,
            country: credentials.country,
            countryCode: await getAlpha3Code(credentials.countryCode),
            postalCode: credentials.postalCode,
        },
    };

    const postCreateClient = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/clients/${formData.get(
            "clientId"
        )}`,
        {
            method: "PATCH",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(createClientBody),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createClientBody),
        }
    );
    const createClientRes = await postCreateClient.json();
    if (!createClientRes.success) {
        if (createClientRes.errorCode == 409) {
            errors.system = createClientRes.message + ".";
            return { errors };
        } else {
            return SystemError(createClientRes, "User Change Email (DAPP API)");
        }
    }

    try {
        await User.findByIdAndUpdate(formData.get("userId"), {
            email: credentials.email,
        }).exec();
    } catch (err) {
        if (err.code == "11000") {
            const [key] = Object.keys(err.keyValue);
            if (key == "email") {
                errors.system = "Please check for errors.";
                errors[key] = `This ${key} already exists.`;
                return { errors };
            }
        }
        return SystemError(
            err,
            "User Edit Account (Find and update email MONGO DB)"
        );
    }

    return {
        success: true,
        message: `Successfully updated your account.`,
    };
}

export async function userLogin(prevState, formData) {
    const errors = {};

    // Fields for validation
    const credentials = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    // Validate the field has text
    for (const [key, value] of Object.entries(credentials)) {
        if (validateHasText(value)) {
            errors[key] = "Invalid input.";
        }
    }

    if (Object.keys(errors).length > 0) {
        // Return errors before proceeding
        errors.system = "Please check for errors.";
        return { errors };
    } else {
        return {
            username: credentials.username,
            password: credentials.password,
            success: true,
        };
    }
}

export async function PasswordReset(prevState, formData) {
    const errors = {};

    await DBConnect();

    // Fields for validation
    if (formData.get("email")) {
        const credentials = {
            email: formData.get("email").toLowerCase(),
        };

        // Validate the field has text
        for (const [key, value] of Object.entries(credentials)) {
            if (validateHasText(value)) {
                errors[key] = "Invalid input.";
            }
        }

        if (Object.keys(errors).length > 0) {
            // Return errors before proceeding
            errors.system = "Please check for errors.";
            return { errors };
        }

        const token = crypto.randomBytes(64).toString("hex");

        const matchedEmail = await User.findOneAndUpdate(
            { email: credentials.email },
            { token: token, tokenCreatedAt: Date.now() },
            { lean: true, new: true }
        ).exec();

        if (!matchedEmail) {
            errors.system = "Please check for errors.";
            errors["email"] = "This email does not exist on our system.";
            return { errors };
        } else {
            const payload = { clientId: matchedEmail.clientId };
            const getClient = await fetch(
                `https://stage-api.drgreennft.com/api/v1/dapp/clients/${payload.clientId}`,
                {
                    method: "GET",
                    redirect: "follow",
                    headers: {
                        "x-auth-apikey": process.env.DAPP_API,
                        "x-auth-signature": GenerateSignature(payload),
                        "Content-Type": "application/json",
                    },
                }
            );
            const firstName = (await getClient.json())?.data?.firstName;

            const sendToken = await transporter.sendMail({
                from: `"Dr. Green Website" <${process.env.EMAIL_FROM}>`, // sender address
                to: credentials.email, // list of receivers
                subject: "Password Reset", // Subject line
                attachments: [
                    {
                        filename: "dr-green-logo-email.png",
                        path: `${process.env.NEXT_PUBLIC_URL}/images/email/dr-green-logo-email.png`,
                        cid: "dr-green-logo", //same cid value as in the html img src
                    },
                    {
                        filename: "dr-green-logo-dk-email.png",
                        path: `${process.env.NEXT_PUBLIC_URL}/images/email/dr-green-logo-dk-email.png`,
                        cid: "dr-green-logo-dk", //same cid value as in the html img src
                    },
                    {
                        filename: "dr-green-dark.png",
                        path: `${process.env.NEXT_PUBLIC_URL}/images/email/dr-green-dark.png`,
                        cid: "dr-green-dark", //same cid value as in the html img src
                    },
                    {
                        filename: "logo-dark.png",
                        path: `${process.env.NEXT_PUBLIC_URL}/images/email/logo-dark.png`,
                        cid: "logo-dark", //same cid value as in the html img src
                    },
                ],
                html: ` 
                        <html style="background: white; color: black;">
                            <head>
                                <meta name="color-scheme" content="light dark">
                                <meta name="supported-color-schemes" content="light dark only">
                                <style>
                                    :root { color-scheme: light dark; supported-color-schemes: light dark; }
                                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=WindSong:wght@400;500&display=swap');
                                    @media (prefers-color-scheme: light)
                                    body { margin: 0; padding: 0; padding-left: 5%; padding-right:5%; left: 0; top: 0; font-family: 'Montserrat'; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
                                    table { color: black; background-color: black; }
                                    p, a { font-family: 'Montserrat'; color: black; font-size: 16px; font-weight: 400; }

                                    @media (prefers-color-scheme: dark) {
                                        .light-image { display: none }
                                    }
                                    @media (prefers-color-scheme: light) {
                                        .dark-image { display: none }
                                    }
                                </style>
                            </head>
                            <body style="max-width: 600px; margin: 50px auto;">
                                <table width="100%;" border="0" cellpadding="0" cellspacing="0">
                                    <div style="width: 100%; text-align:center;">
                                        <img class="light-image" style="margin: 0 auto;" width="350" height="134" src="cid:dr-green-logo" alt="Dr Green Logo"/>
                                        <img class="dark-image" style="margin: 0 auto;" width="170" height="196" src="cid:logo-dark" alt="Dr Green Logo"/>
                                    </div>
                                    <p style="font-size: 48px;font-weight: 700; line-height: 1; margin-bottom:20px;">Hello${
                                        firstName ? " " + firstName : ""
                                    }!</p>
                                    <div style="border: 2px solid black; border-radius: 20px; padding: 10%; margin-bottom: 50px;">
                                        <p style="font-size: 37px;font-weight: 500; margin-bottom:20px;">Here's the link to reset your password...</p>
                                        <p style="margin-bottom:20px;">Click the password reset button below to reset your Dr Green password for your ${
                                            credentials.email
                                        } account.</p>
                                        <p style="margin-bottom:20px;">
                                            <a style="text-decoration: none; display: block; width: 100%; background: #0ABA90; font-weight: 700; text-align:center; padding-top: 1rem;padding-bottom: 1rem; border-radius: 100px;" href="${
                                                process.env.NEXT_PUBLIC_URL
                                            }/reset-password?token=${token}&id=${
                    matchedEmail._id
                }">RESET</a>
                                        </p>
                                        <p style="margin-bottom:20px;">If you didn't ask to reset your password, please ignore this email.</p>
                                        <p style="margin-bottom:20px;">If you're having trouble clicking the button, copy this link instead:</p>
                                        <p style="margin-bottom:20px;">
                                            ${
                                                process.env.NEXT_PUBLIC_URL
                                            }/reset-password?token=${token}&id=${
                    matchedEmail._id
                }
                                        </p>
                                        <p>Thanks!</p>
                                        <p>Dr Green Team</p>
                                    </div>
                                    <div style="width: 100%; text-align:center;">
                                        <img class="light-image" style="margin: 0 auto; margin-bottom:50px;" width="263" height="103" src="cid:dr-green-logo-dk" alt="Dr Green Digital Key"/>
                                        <img class="dark-image" style="margin: 0 auto; margin-bottom:50px;" width="263" height="103" src="cid:dr-green-dark" alt="Dr Green Digital Key"/>
                                        <p>2024 © DR. GREEN NFT</p>
                                    </div>
                                </table>
                            </body>
                        </html>`,
            });

            if (sendToken) {
                return {
                    success: true,
                    message:
                        "Please check your emails to complete your password reset. This link will expire in 24 hours.",
                };
            } else {
                return SystemError(
                    sendToken,
                    "User Password Reset (Send Email)"
                );
            }
        }
    } else {
        const credentials = {
            password: formData.get("password"),
            password_confirm: formData.get("password_confirm"),
            token: formData.get("token"),
            id: formData.get("id"),
        };

        // Validate the field has text
        for (const [key, value] of Object.entries(credentials)) {
            if (validateHasText(value)) {
                errors[key] = "Invalid input.";
            }
        }

        if (Object.keys(errors).length > 0) {
            // Return errors before proceeding
            errors.system = "Please check for errors.";
            return { errors };
        }

        let user = null;

        try {
            user = await User.findById(
                credentials.id,
                "token tokenCreatedAt"
            ).exec();
        } catch (err) {
            return SystemError(
                err,
                "User Password Reset (Change Password - User not found or malicious behaviour)"
            );
        }

        if (!user) {
            return SystemError(
                user,
                "User Password Reset (Change Password - Parameters changed or malicious behaviour)"
            );
        }

        if (user.token != credentials.token) {
            errors.system =
                "Token expired. Please request another password change.";
            return { errors };
        }

        // Match password regex
        if (
            !credentials.password.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            )
        ) {
            errors.password =
                "Please use eight characters, at least one letter, one number and one special character.";
            return { errors };
        }

        if (credentials.password != credentials.password_confirm) {
            errors["password_confirm"] = "This password does not match.";
            errors.system = "Please check for errors.";
            return { errors };
        }

        const OneDay = new Date().getTime();

        const tokenTime = new Date(user.tokenCreatedAt).getTime();

        if (tokenTime < OneDay) {
            // The yourDate time is less than 1 days from now
            const hash = bcrypt.hashSync(credentials.password, 12);
            const updatePass = await User.findByIdAndUpdate(credentials.id, {
                hash: hash,
                token: null,
                tokenCreatedAt: null,
            }).exec();

            if (!updatePass) {
                return SystemError(
                    updatePass,
                    "User Password Reset (Change Password - Couldn't change hash in MongoDB)"
                );
            } else {
                return {
                    success: true,
                    message: "Password successfully changed.",
                };
            }
        } else {
            // The yourDate time is exactly/more than 1 days from now
            errors.system =
                "Link expired. Please request another password change.";
            return { errors };
        }
    }
}

export async function ReferDoctor(prevState, formData) {
    const errors = {};

    if (formData.get("email") != formData.get("confirm_email")) {
        errors["confirm_email"] = "This email does not match.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    if (!formData.getAll("medical_condition[]").length) {
        errors["medical_condition"] = "Please select at least one.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    if (!formData.getAll("medicalHistory5[]").length) {
        errors["medicalHistory5"] = "Please select at least one.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    if (!formData.getAll("medicalHistory7[]").length) {
        errors["medicalHistory7"] = "Please select at least one.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    if (!formData.getAll("medicalHistory14[]").length) {
        errors["medicalHistory14"] = "Please select at least one.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    if (!formData.get("consent_agree")) {
        errors["consent_agree"] = "Please confirm the consent form first.";
        errors.system = "Please check for errors.";
        return { errors };
    }

    const formObject = {
        medicalRecord: {
            dob: formData.get("dob"),
            gender: formData.get("gender"),
            medicalConditions: formData.getAll("medical_condition[]"),
            otherMedicalCondition: formData.get("other_medical_condition"),
            medicinesTreatments: formData.getAll("medicines_treatments[]"),
            otherMedicalTreatments: formData.get("other_medicines_treatments"),
            medicalHistory0: formData.get("medicalHistory0") === "true",
            medicalHistory1: formData.get("medicalHistory1") === "true",
            medicalHistory2: formData.get("medicalHistory2") === "true",
            medicalHistory3: formData.get("medicalHistory3") === "true",
            medicalHistory4: formData.get("medicalHistory4") === "true",
            medicalHistory5: formData.getAll("medicalHistory5[]"),
            medicalHistory6: formData.get("medicalHistory6") === "true",
            medicalHistory7: formData.getAll("medicalHistory7[]"),
            medicalHistory8: formData.get("medicalHistory8") === "true",
            medicalHistory9: formData.get("medicalHistory9") === "true",
            medicalHistory10: formData.get("medicalHistory10") === "true",
            medicalHistory11: formData.get("medicalHistory11"),
            medicalHistory12: formData.get("medicalHistory12") === "true",
            medicalHistory13: formData.get("medicalHistory13"),
            medicalHistory14: formData.getAll("medicalHistory14[]").toString(),
            medicalHistory15: formData.get("medicalHistory15"),
            medicalHistory16: formData.get("medicalHistory16") === "true",
            prescriptionsSupplements: formData.get("prescriptionsSupplements"),
        },
    };

    //Add relation
    formObject.medicalRecord.medicalHistory7.push(
        formData.get("medicalHistory7Relation")
    );

    const patchClientReq = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/clients/${formData.get(
            "clientId"
        )}`,
        {
            method: "PATCH",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(formObject),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        }
    );

    const patchClientRes = await patchClientReq.json();

    if (!patchClientRes.success) {
        return SystemError(
            patchClientRes,
            "Update User Eligibility (DAPP API)"
        );
    } else {
        return {
            success: true,
            message: "Form successfully saved. You will be contacted shortly.",
        };
    }
}
