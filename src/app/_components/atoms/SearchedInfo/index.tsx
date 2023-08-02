import { FC } from "react";

type Props = {
  value: number;
  unit?: "円" | "＄" | "%";
  title: string;
};

export const SearchedInfo: FC<Props> = ({ value, unit, title }) => {
  return (
    <tr className="flex border-b border-gray-200 p-3">
      <th className="flex-1 text-left font-light">{title}</th>
      <td className="flex-1 text-right">
        {value.toLocaleString()}
        {unit}
      </td>
    </tr>
  );
};
