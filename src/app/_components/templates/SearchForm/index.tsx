"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import { FC } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { SearchButton } from "@/app/_components/atoms/SearchButton";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { SearchInputSchema } from "@/libs/schema/searchStock";

type Schema = z.infer<typeof SearchInputSchema>;

type Props = {
  title: string;
  onValid: SubmitHandler<Schema>;
  onInvalid?: SubmitErrorHandler<Schema>;
  className?: string;
};

export const SearchForm: FC<Props> = (props) => {
  const { title, onValid, onInvalid, className } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(SearchInputSchema),
  });

  return (
    <form
      aria-label={title}
      onSubmit={handleSubmit(onValid, onInvalid)}
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
