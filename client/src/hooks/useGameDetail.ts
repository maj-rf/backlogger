import { skipToken, useQuery } from '@tanstack/react-query';
import * as games from '../services/games';

export const useGameDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['games', 'detail', id],
    queryFn: id ? () => games.getGame(id) : skipToken,
    retry: false,
  });
};
