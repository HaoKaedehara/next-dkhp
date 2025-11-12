

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClientWrapper from "@/components/admin/AdminClientWrapper";
// import "@/styles/fonts.css";
// import "@/styles/admin/style.css";


export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // const session = await getServerSession(authOptions);
    // if (!session) redirect("/login");

    const session = null;

    // Safely extract and serialize user data to prevent hydration mismatches
    const userEmail = "session.user?.email" || "";
    const userName = "session.user?.name" || "";
    const userImage = "session.user?.image" || "";

    return (
        <AdminClientWrapper
            userEmail={userEmail}
            userName={userName}
            userImage={userImage}
        >
            {children}
        </AdminClientWrapper>
    );
}
