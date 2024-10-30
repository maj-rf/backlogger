import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full bg-red-200">
        <SidebarTrigger />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
