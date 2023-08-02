"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { useLoading } from "@/hooks/useLoading";
import { useStockStatus } from "@/hooks/useStockStatus";
import {
  SearchInputSchema,
  searchInputSchema,
} from "@/libs/schema/searchStock";
import { searchStockData } from "@/services/client/serchStock";

type Props = {
  className?: string;
};

export const SearchForm: FC<Props> = ({ className }) => {
  const { setIsLoading, isLoading } = useLoading();
  const { setStockStatus } = useStockStatus();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputSchema>({
    resolver: zodResolver(searchInputSchema),
  });

  const onSubmit: SubmitHandler<SearchInputSchema> = async (code) => {
    setIsLoading(true);
    try {
      const stockData = await searchStockData(code);
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

  useEffect(() => {
    if (!isLoading) return;
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <form
      aria-label="新規日本株作成"
      onSubmit={handleSubmit(onSubmit)}
      className={cx(className, "flex")}
    >
      <TextboxWithError
        {...register("code")}
        error={errors.code?.message}
        disabled={isSubmitting}
      />
      <SearchButton disabled={isSubmitting} />
    </form>
  );
};
