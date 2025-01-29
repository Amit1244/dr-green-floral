import RegisterForm from "../components/forms/register-form";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Register",
    description: "Dr Green Web App",
};

export default async function Register() {
    const session = await getServerSession(options);
    if (session) redirect("/dashboard/account");

    return (
        <main>
            <section id="register" className="pt-20">
                <div className="container mx-auto px-4">
                    <div className="mb-10">
                        <h1 className="h2 relative z-10">Register</h1>
                        <p className="text-xl font-medium">
                            Fill out information about yourself.
                        </p>
                    </div>
                    <div className="rounded-[20px] border-2 border-white p-20">
                        <RegisterForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
