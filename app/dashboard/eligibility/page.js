import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ReferForm from "@/app/components/forms/refer-form";
import DashboardNav from "@/app/components/dashboard/dashboard-nav";
import Link from "next/link";
import Image from "next/image";
import { getAlpha2Code } from "@/data/countryCodes";
import GetContent from "@/lib/wp/get-content";
import CalendlyClient from "@/app/components/dashboard/calendly/calendly-client";

export const dynamic = "force-dynamic";

export default async function Eligibility() {
    const session = await getServerSession(options);

    const countryCodeAlpha2 = await getAlpha2Code(
        session.user.dappUser.shippings[0].countryCode
    );

    const query = `
{
    globalContent {
        consentForm {
            textArea
        }
    }
}
    `;
    const consentForm = (await GetContent(query)).globalContent.consentForm
        .textArea;

    const formSubmitted = session?.user?.dappUser?.medicalRecord?.createdAt;
    const eligibile = session?.user?.dappUser?.adminApproval == "VERIFIED";

    console.log(new Date(session?.user?.scheduledAppointmentAt).toISOString());

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
            <div className="md:grid grid-cols-8 gap-8" id="popupRoot">
                <div className="col-span-2 relative hidden md:block">
                    <DashboardNav />
                </div>
                <div className="rounded-[20px] border-2 border-[#EBCFA6] p-8 xl:p-20 col-span-6">
                    <p className="text-2xl md:text-[28px] font-semibold mb-8 text-[#EBCFA6]">
                        My Eligibility - Your trusted source for Medical
                        Cannabis
                    </p>
                    {!formSubmitted ? (
                        <div>
                            {!eligibile ? (
                                <p className="text-[#0aba90]">
                                    You are already eligible.
                                </p>
                            ) : (
                                <div>
                                    <p className="text-orange-500 mb-4">
                                        {"Submission made at: " +
                                            new Date(
                                                formSubmitted
                                            ).toUTCString()}
                                    </p>
                                    {session?.user?.scheduledAppointmentAt ? (
                                        <p className="text-orange-500">
                                            Please check your email for the
                                            details of your Zoom meeting.
                                        </p>
                                    ) : (
                                        <CalendlyClient
                                            user={session?.user?.dappUser}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <p className="text-red-500 mb-8">
                                Please ensure all details are correct, as you
                                cannot change this once submitted.
                            </p>
                            <ReferForm
                                userId={session?.user?._id}
                                clientId={session?.user?.dappUser?.id}
                                userDetails={session?.user?.dappUser}
                                countryCode={countryCodeAlpha2}
                                consentForm={consentForm}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
