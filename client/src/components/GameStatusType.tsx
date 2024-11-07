import { GameStatus } from '@/services/games';

export function GameStatusType({ status }: { status: GameStatus }) {
  switch (status) {
    case 'playing':
      return (
        <div className="bg-yellow-200 text-yellow-600 px-2 rounded-sm">
          <p>{status}</p>
        </div>
      );
    case 'finished':
      return (
        <div className="bg-green-200 text-green-600 px-2 rounded-sm">
          <p>{status}</p>
        </div>
      );
    default:
      return (
        <div className="bg-red-200 text-red-500 px-2 rounded-sm">
          <p>{status}</p>
        </div>
      );
  }
}
