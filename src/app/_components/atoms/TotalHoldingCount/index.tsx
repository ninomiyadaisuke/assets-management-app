import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const TotalHoldingCount: FC<Props> = async () => {
  return (
    <span className="text-sm font-semibold text-gray-500">{`全${55}件`}</span>
  );
};

export default TotalHoldingCount;
