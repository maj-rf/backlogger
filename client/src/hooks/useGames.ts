import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as games from '../services/games';

export const useGames = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const data = await games.getAllGames();
      data?.forEach((game) => {
        queryClient.setQueryData(['games', 'detail', game.id], game);
      });
      return data;
    },
  });
};
