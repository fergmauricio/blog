import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime";

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  console.log(dateTime);
  return (
    <time
      className="text-slate-600 block text-sm/tight"
      dateTime={dateTime}
      title={formatRelativeDate(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
