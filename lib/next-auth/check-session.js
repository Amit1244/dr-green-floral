import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckSession() {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/login?callbackUrl=/dashboard/account");
    } else {
        return session;
    }
}
