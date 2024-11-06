import { Loading } from '@/components/Loading';
import { useGameDetail } from '@/hooks/useGameDetail';
import { useParams } from 'react-router-dom';
import { GameDetailDialog } from '@/components/gameDetail/GameDetailDialog';

const useRequiredParams = <T extends Record<string, unknown>>() => useParams() as T;

export function GameDetail() {
  const { id } = useRequiredParams<{ id: string }>();
  const { data, isPending, isError, error } = useGameDetail(id);
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="px-2">
      <h1>Title: {data?.title}</h1>
      <p>Game Status: {data?.status}</p>
      <ul className="flex gap-2 mb-2">
        <p>Genre:</p>
        {data?.genre.map((genre) => (
          <li key={data.id + genre} className="inline-flex bg-accent px-2 rounded-sm">
            {genre}
          </li>
        ))}
      </ul>
      <GameDetailDialog />
    </div>
  );
}
