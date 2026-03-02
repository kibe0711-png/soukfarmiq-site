import { getSession } from "@/lib/analytics-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/analytics/Sidebar";

export const metadata = {
  title: "Analytics | FarmIQ by Altiora",
};

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  if (!user) {
    redirect("/analytics/auth/error");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} />

      {/* Main content area */}
      <div className="ml-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-gray-900">
              {user.farm}
            </h2>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {user.role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              Logged in as {user.name}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
