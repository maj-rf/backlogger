import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GameForm } from './GameForm';

export function GameDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new game</DialogTitle>
          <DialogDescription>Track your added game!</DialogDescription>
        </DialogHeader>
        <GameForm />
      </DialogContent>
    </Dialog>
  );
}
