import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { Game } from '@/services/games';

type GameFormProps = {
  setEditing: Dispatch<SetStateAction<boolean>>;
  data: Game;
};
export function GameForm({ setEditing, data }: GameFormProps) {
  return (
    <>
      <div>
        <h1>Edit {data.title}</h1>
      </div>
      <Button>Save</Button>
      <Button onClick={() => setEditing(false)}>Cancel</Button>
    </>
  );
}
