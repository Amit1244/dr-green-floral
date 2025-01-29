import { getServerSession } from "next-auth";
import DashboardNav from "../components/dashboard/dashboard-nav";
import { options } from "../api/auth/[...nextauth]/options";

export default async function PageDashboard() {
    const session = await getServerSession(options);
    return (
        <div>
            <div className="mb-10 pb-10 border-b-2 border-white block md:hidden">
                <h1 className="h2 relative z-10">Dashboard</h1>
                <p className="text-xl font-medium">
                    Welcome back
                    {session?.user?.dappUser?.firstName
                        ? ", " + session?.user?.dappUser?.firstName + "."
                        : "."}
                </p>
            </div>
            <DashboardNav menuPage={true} />
        </div>
    );
}
