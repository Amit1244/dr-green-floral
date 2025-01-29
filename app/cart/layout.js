import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CartLayout({ children }) {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/login?callbackUrl=/cart");
    } else {
        return <>{children}</>;
    }
}
