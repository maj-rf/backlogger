import * as games from '../services/games';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/Loading';

export function Games() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: games.getAllGames,
    queryKey: ['games'],
  });
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <h1>Games</h1>
      <ul>
        {data?.map((game) => (
          <li key={'game' + game.id}>
            <p>{game.title}</p>
            <p>{game.game_status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
