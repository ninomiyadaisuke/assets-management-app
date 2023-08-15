import { FC } from "react";

import { RadioGroup } from "@/app/_components/molecules/RadioGroup";
import { SearchedInfoTable } from "@/app/_components/organisms/SearchedInfoTable";
import { UnauthorizedError } from "@/libs/error";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

import { FgnStockCreateForm } from "./FgnStockCreateForm";
import { SelectForm } from "./SelectForm";

export const FgnStockCreate: FC = async () => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  if (!uid) throw new UnauthorizedError();
  return (
    <div className="flex grow flex-col gap-9">
      <SelectForm title="" />
      <SearchedInfoTable unit="＄" />
      <RadioGroup />
      <FgnStockCreateForm uid={uid} />
    </div>
  );
};
