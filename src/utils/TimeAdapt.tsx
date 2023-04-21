import { formatDistanceToNow, parseISO } from 'date-fns';

export const TimeAdapt = (createdDate: string) => {
  const date = parseISO(createdDate);

  return formatDistanceToNow(date);
};
