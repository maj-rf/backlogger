import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', name: 'Games' },
  { path: '/genre', name: 'Genre' },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Backlogger</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {links.map((link) => {
                  return (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={link.path}
                        onClick={() => setOpenMobile(false)}
                        // className={({ isActive }) => {
                        //   return isActive ? "data-active='true'" : ' ';
                        // }}
                      >
                        {link.name}
                      </NavLink>
                    </SidebarMenuButton>
                  );
                })}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
