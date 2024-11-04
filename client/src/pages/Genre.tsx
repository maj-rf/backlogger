import { useQuery } from '@tanstack/react-query';
import * as genre from '../services/genre';
import { Loading } from '@/components/Loading';

export default function Genre() {
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
    <div>
      <h1>Genre</h1>
      <ul>
        {data.map((genre) => (
          <li key={genre.name + genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}
