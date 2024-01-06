"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { ComboboxWithError } from "@/app/_components/molecules/ComboboxWithError";
import { useLoading } from "@/hooks/useLoading";
import { useStockStatus } from "@/hooks/useStockStatus";
import type { SearchInputSchema } from "@/libs/schema/searchStock";
import { searchInputSchema } from "@/libs/schema/searchStock";
import { searchFgnStockClient } from "@/services/client/serchStock";

const options = [
  "VIG",
  "VYM",
  "HDV",
  "SPYD",
  "AGG",
  "BND",
  "LQD",
  "HYG",
  "ARCC",
];

type Props = {
  title: string;
  className?: string;
};

export const SelectForm: FC<Props> = (props) => {
  const { title, className } = props;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputSchema>({
    resolver: zodResolver(searchInputSchema),
  });

  const { setIsLoading } = useLoading();
  const { setStockStatus } = useStockStatus();
  const onSubmit: SubmitHandler<SearchInputSchema> = async (code) => {
    setIsLoading(true);
    try {
      const stockData = await searchFgnStockClient(code);
      if ("message" in stockData) {
        setError("code", {
          type: "manual",
          message: "この株式はすでに保有しています。",
        });
        setIsLoading(false);
        return;
      }
      clearErrors("code");
      if ("stockCode" in stockData) setStockStatus(stockData);
      setIsLoading(false);
      reset();
    } catch (error) {
      throw new Error("失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      aria-label={title}
      onSubmit={handleSubmit(onSubmit)}
      className={cx(className, "flex")}
    >
      <ComboboxWithError
        {...register("code")}
        error={errors.code?.message}
        disabled={isSubmitting}
      >
        {options.map((label) => (
          <Fragment key={label}>
            <option hidden>選択してください</option>
            <option value={label}>{label}</option>
          </Fragment>
        ))}
      </ComboboxWithError>
      <SearchButton disabled={isSubmitting} />
    </form>
  );
};
