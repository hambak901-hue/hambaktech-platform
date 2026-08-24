import PortalHeader from "./PortalHeader";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <PortalSidebar />

      <div className="min-w-0 flex-1">
        <PortalHeader />

        <main className="min-h-[calc(100vh-73px)] p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}