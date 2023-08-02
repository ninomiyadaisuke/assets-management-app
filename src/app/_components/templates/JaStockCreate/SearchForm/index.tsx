"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { useLoading } from "@/hooks/useLoading";
import {
  SearchInputSchema,
  searchInputSchema,
} from "@/libs/schema/searchStock";

type Props = {
  className?: string;
};

export const SearchForm: FC<Props> = ({ className }) => {
  const { setIsLoading } = useLoading();
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

  const onSubmit: SubmitHandler<SearchInputSchema> = (input) => {
    setIsLoading(true);
  };

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
