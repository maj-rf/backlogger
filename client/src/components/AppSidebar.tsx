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
                    <SidebarMenuButton key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => setOpenMobile(false)}
                        className={({ isActive }) => {
                          return isActive ? 'text-green-600 font-semibold' : 'w-full';
                        }}
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
