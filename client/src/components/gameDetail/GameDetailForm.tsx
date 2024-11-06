import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { editGame, Game } from '@/services/games';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  title: z.string().min(3, 'Title is required').max(50),
  status: z.enum(['playing', 'backlog', 'finished'], {
    required_error: 'You need to select a game status type.',
  }),
});

export function GameDetailForm({
  data,
  setIsOpen,
}: {
  data: Game;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      status: data.status,
    },
  });

  const queryClient = useQueryClient();
  const gameDetailMutation = useMutation({
    mutationFn: editGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games', 'detail', data.id] });
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    gameDetailMutation.mutate({ ...values, id: data.id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="game-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Game Title</FormLabel>
              <FormControl>
                <Input placeholder="Pokemon Red" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel htmlFor="status">Game is currently...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="playing" />
                    </FormControl>
                    <FormLabel className="font-normal">being played</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="backlog" />
                    </FormControl>
                    <FormLabel className="font-normal">a backlog</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="finished" />
                    </FormControl>
                    <FormLabel className="font-normal">finished</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse md:justify-end px-4 md:px-0">
          <Button type="submit" form="game-form" disabled={false}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
