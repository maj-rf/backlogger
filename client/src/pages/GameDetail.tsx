import { Loading } from '@/components/Loading';
import { useGameDetail } from '@/hooks/useGameDetail';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GameForm } from '@/components/GameForm';

export function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [editing, setEditing] = useState(false);
  const { data, isPending, isError, error } = useGameDetail(id);
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="px-2">
      {editing ? (
        <GameForm setEditing={setEditing} data={data} />
      ) : (
        <>
          <h1>Title: {data?.title}</h1>
          <p>Game Status: {data?.status}</p>
          <ul className="flex gap-2">
            <p>Genre:</p>
            {data?.genre.map((genre) => (
              <li key={data.id + genre} className="inline-flex bg-accent px-2 rounded-sm">
                {genre}
              </li>
            ))}
          </ul>
          <Button onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
    </div>
  );
}
