import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/login?callbackUrl=/dashboard/account");
    } else {
        return (
            <main>
                <section className="pt-10 xl:pt-20 relative">
                    <div className="container mx-auto px-4">
                        <div className="hidden md:block mb-20">
                            <h1 className="h2 relative z-10 text-[#EBCFA6]">Dashboard</h1>
                            <p className="text-xl font-medium text-[#EBCFA6]">
                                Welcome back
                                {session?.user?.dappUser?.firstName
                                    ? ", " +
                                    session?.user?.dappUser?.firstName +
                                    "."
                                    : "."}
                            </p>
                        </div>
                        {children}
                    </div>
                </section>
            </main>
        );
    }
}
