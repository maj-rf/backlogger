import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="container">
        <SidebarTrigger />
        <main>
          <h1>Main</h1>
        </main>

        <Outlet />
      </div>
    </SidebarProvider>
  );
}
