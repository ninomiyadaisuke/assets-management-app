"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { ConfirmSubmitButton } from "@/app/_components/organisms/ConfirmSubmitButton";
import { useAssetType } from "@/hooks/useAssetType";
import { useResetStockFrom } from "@/hooks/useResetStockFrom";
import { createStockSchema, CreateStockType } from "@/libs/schema/createStock";

const defaultValues = {
  numberOfSharesHeld: [0],
  acquisitionPrice: [0],
};

type Props<T extends FieldValues = CreateStockType> = {
  title: string;
  message: string;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
};

export const JaStockCreateForm: FC<Props> = (props) => {
  const { title, onValid, onInvalid, message } = props;
  const { getAccountTypes } = useAssetType();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStockType>({
    defaultValues,
    resolver: zodResolver(createStockSchema),
  });

  useResetStockFrom(defaultValues, reset);

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      aria-label={title}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5">
        {getAccountTypes().map((account, i) => {
          return (
            <fieldset key={account} className="flex flex-col gap-3">
              <legend className="pb-1 font-semibold text-gray-600">
                {account}
              </legend>
              <div>
                <label
                  htmlFor={`保有株数-${i}`}
                  className="text-sm text-gray-600"
                >
                  保有株数
                </label>
                <TextboxWithError
                  disabled={isSubmitting}
                  id={`保有株数-${i}`}
                  type="tel"
                  {...register(`numberOfSharesHeld.${i}`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors.numberOfSharesHeld &&
                    errors.numberOfSharesHeld[i]?.message
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`取得単価-${i}`}
                  className="text-sm text-gray-600"
                >
                  取得単価
                </label>
                <TextboxWithError
                  disabled={isSubmitting}
                  id={`取得単価-${i}`}
                  type="tel"
                  {...register(`acquisitionPrice.${i}`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors.acquisitionPrice &&
                    errors.acquisitionPrice[i]?.message
                  }
                />
              </div>
            </fieldset>
          );
        })}
      </div>
      <ConfirmSubmitButton
        isSubmitting={isSubmitting}
        alertDialogState={{ message }}
      />
    </form>
  );
};
