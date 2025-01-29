import { getServerSession } from "next-auth";
import LoginForm from "../components/forms/login-form";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
    title: "Login",
    description: "Dr Green Web App",
};

export default async function Login(props) {
    const searchParams = await props.searchParams;
    const session = await getServerSession(options);
    if (session) redirect("/dashboard/account");

    return (
        <main>
            <section id="login" className="pt-20">
                <div className="container mx-auto px-4">
                    <div className="mb-10 text-center">
                        <h1 className="h2 relative z-10">Login</h1>
                    </div>
                    <LoginForm callbackUrl={searchParams.callbackUrl} />
                    <div className="text-center mt-8">
                        <Link
                            href="/reset-password"
                            className="block font-medium cursor-pointer mx-auto"
                        >
                            Forgotten Password?
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
