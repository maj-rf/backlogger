import { useQuery } from '@tanstack/react-query';
import * as genre from '../services/genre';
import { Loading } from '@/components/Loading';
import { NavLink, Outlet } from 'react-router-dom';

export function Genre() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: genre.getAll,
    queryKey: ['genre'],
    throwOnError: true,
  });
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="px-2">
      <h1 className="text-lg font-semibold mb-2">Genre</h1>
      <ul className="inline-flex flex-wrap gap-2 justify-center items-center">
        {data.map((genre) => (
          <li key={genre.name + genre.id} className="bg-accent px-1 rounded-sm">
            <NavLink to={`/genre/${genre.id}`}>{genre.name}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
