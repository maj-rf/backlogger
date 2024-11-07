import { Loading } from '@/components/Loading';
import { useGameDetail } from '@/hooks/useGameDetail';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDialog } from '@/components/ResponsiveDialog';
import { GameDetailForm } from '@/components/gameDetail/GameDetailForm';
import { useState } from 'react';
import { deleteGame } from '@/services/games';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { GameStatusType } from '@/components/GameStatusType';
import { useRequiredParams } from '@/lib/utils';

export function GameDetail() {
  const { id } = useRequiredParams<{ id: string }>();
  const { data, isPending, isError, error } = useGameDetail(id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['games'] }),
        queryClient.invalidateQueries({ queryKey: ['genre'] }),
      ]);
      navigate('/');
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="px-2 space-y-2">
      <h1>Title: {data.title}</h1>
      <div>
        <span>Game Status: </span>
        <div className="inline-block">
          <GameStatusType status={data.status} />
        </div>
      </div>
      <ul className="flex gap-2 mb-2">
        <p>Genre:</p>
        {data?.genre.map((genre) => (
          <li key={data.id + genre} className="inline-flex bg-accent px-2 rounded-sm">
            {genre}
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="destructive"
        className="mr-3"
        disabled={deleteMutation.isPending}
        onClick={() => handleDelete(data.id)}
      >
        {deleteMutation.isPending ? <Loading /> : 'Delete'}
      </Button>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title={`Edit ${data.title}`}
        description="Edit game"
        buttonLabel="Edit"
      >
        <GameDetailForm data={data} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
    </div>
  );
}
