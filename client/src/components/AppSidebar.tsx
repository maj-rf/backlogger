import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useQuery } from '@tanstack/react-query';
import * as genre from '../services/genre';
import { Loading } from './Loading';

export function AppSidebar() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: genre.getAll,
    queryKey: ['genre'],
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genre</SidebarGroupLabel>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <SidebarGroupContent>
              <SidebarMenu>
                {data?.map((g) => (
                  <SidebarMenuItem key={g.name + g.id}>
                    <SidebarMenuButton asChild>
                      <a href={g.name}>
                        <span>{g.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
