import { skipToken, useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import * as genre from '../services/genre';
import { Loading } from '@/components/Loading';

export function GenreGames() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['genre', id],
    queryFn: id ? () => genre.getGamesInGenre(id) : skipToken,
    retry: false,
  });
  if (isPending)
    return (
      <div className="flex justify-center items-center mt-8">
        <Loading />
      </div>
    );
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data.length === 0)
    return (
      <div className="flex justify-center items-center mt-8">
        <h1>No games to show.</h1>
      </div>
    );

  return (
    <div className="mt-8">
      <h1>Games</h1>
      <ul>
        {data.map((game) => (
          <li key={game.id + game.title}>
            <Link to={`/games/${game.id}`} className="underline">
              {game.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
