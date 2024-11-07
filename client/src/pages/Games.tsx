//import { GameDialog } from '@/components/games/GameDialog';
import { GameForm } from '@/components/games/GameForm';
import { Loading } from '@/components/Loading';
import { ResponsiveDialog } from '@/components/ResponsiveDialog';
import { useGames } from '@/hooks/useGames';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GameStatusType } from '@/components/GameStatusType';

export function Games() {
  const { data, isPending, isError, error } = useGames();
  const [isAddOpen, setIsAddOpen] = useState(false);
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="px-2">
      <h1 className="text-lg font-semibold mb-2">Games</h1>
      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="Add Game"
        description="Add Games"
        buttonLabel="Add"
      >
        <GameForm setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>
      <ul className="space-y-2">
        {data.map((game) => (
          <li key={'game' + game.id} className="flex gap-2">
            <Link to={`/games/${game.id}`} className="underline">
              <p>{game.title}</p>
            </Link>
            <GameStatusType status={game.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
