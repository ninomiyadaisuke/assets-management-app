"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { ComboboxWithError } from "@/app/_components/molecules/ComboboxWithError";
import type { SearchInputSchema } from "@/libs/schema/searchStock";
import { searchInputSchema } from "@/libs/schema/searchStock";

const options = ["VYM", "HDV", "SPYD", "AGG", "ARCC"];

type Props = {
  title: string;
  onValid: SubmitHandler<SearchInputSchema>;
  onInvalid?: SubmitErrorHandler<SearchInputSchema>;
  className?: string;
};

export const SelectForm: FC<Props> = (props) => {
  const { title, onValid, onInvalid, className } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputSchema>({
    resolver: zodResolver(searchInputSchema),
  });

  return (
    <form
      aria-label={title}
      onSubmit={handleSubmit(onValid, onInvalid)}
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
