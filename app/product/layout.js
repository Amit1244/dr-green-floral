import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProductLayout({ children }) {
    const session = await getServerSession(options);
    const eligible = session?.user?.dappUser?.adminApproval == "VERIFIED";
    if (!eligible) {
        redirect("/dashboard/eligibility");
    } else {
        return <>{children}</>;
    }
}
