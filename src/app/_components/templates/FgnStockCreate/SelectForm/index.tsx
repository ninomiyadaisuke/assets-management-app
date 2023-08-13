"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { ComboboxWithError } from "@/app/_components/molecules/ComboboxWithError";
import type { SearchInputSchema } from "@/libs/schema/searchStock";
import { searchInputSchema } from "@/libs/schema/searchStock";

const options = ["VYM", "HDV", "SPYD", "AGG", "ARCC"];

type Props = {
  title: string;
  className?: string;
};

export const SelectForm: FC<Props> = (props) => {
  const { title, className } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputSchema>({
    resolver: zodResolver(searchInputSchema),
  });

  const onSubmit: SubmitHandler<SearchInputSchema> = (code) => {
    const test = code;
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
          <>
            <option hidden>選択してください</option>
            <option key={label} value={label}>
              {label}
            </option>
          </>
        ))}
      </ComboboxWithError>
      <SearchButton disabled={isSubmitting} />
    </form>
  );
};
