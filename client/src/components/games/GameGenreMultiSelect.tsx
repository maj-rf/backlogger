import { useQuery } from '@tanstack/react-query';
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '../ui/multi-select';
import * as genre from '../../services/genre';
import { Loading } from '../Loading';
type MultiSelectProps = {
  onValuesChange: (value: string[]) => void;
  values: string[];
};

export function GameGenreMultiSelect({ onValuesChange, values }: MultiSelectProps) {
  const { data, isPending, isError, error } = useQuery({
    queryFn: genre.getAll,
    queryKey: ['genre'],
    throwOnError: true,
  });
  if (isPending) return <Loading />;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <MultiSelector onValuesChange={onValuesChange} values={values}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select one or multiple genre" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {data.map((g) => (
            <MultiSelectorItem key={g.name + g.id} value={g.name}>
              <span>{g.name}</span>
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
