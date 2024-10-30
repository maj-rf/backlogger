import { Loading } from '@/components/Loading';
import { useGameDetail } from '@/hooks/useGameDetail';
import { useParams } from 'react-router-dom';

export function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useGameDetail(id);
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <h1>Title: {data?.title}</h1>
      <p>Game Status: {data?.status}</p>
      <ul className="flex gap-2">
        <p>Genre:</p>
        {data?.genre.map((genre) => (
          <li key={data.id + genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
