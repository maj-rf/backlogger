import { Loading } from '@/components/Loading';
import { useGames } from '@/hooks/useGames';
import { Link } from 'react-router-dom';

export function Games() {
  const { data, isPending, isError, error } = useGames();
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
            <Link to={`/games/${game.id}`}>
              <p>{game.title}</p>
            </Link>
            <p>{game.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
