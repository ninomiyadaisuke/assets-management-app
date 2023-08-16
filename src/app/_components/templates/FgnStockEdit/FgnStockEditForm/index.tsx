"use client";
import { FC, use } from "react";

import { FgnStockReturn } from "@/services/server/fgnStockEdit";

type Props = {
  id: string;
  fetchStock: Promise<FgnStockReturn>;
};

export const FgnStockEditForm: FC<Props> = ({ id, fetchStock }) => {
  const data = use(fetchStock);
  return <div>FgnStockEditForm</div>;
};
