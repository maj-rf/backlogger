import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { GameDetailForm } from './GameDetailForm';

export function GameDetailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit game details</DialogTitle>
          <DialogDescription>Make changes to your game!</DialogDescription>
        </DialogHeader>
        <GameDetailForm />
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="game-form">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
