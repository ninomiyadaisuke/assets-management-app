"use client";

import { forwardRef, useId } from "react";

import { ErrorMessage } from "../../atoms/ErrorMessage";
import { Textbox } from "../../atoms/Textbox";

type Props = React.ComponentPropsWithRef<"input"> & {
  error?: string;
};

export const TextboxWithError = forwardRef<HTMLInputElement, Props>(
  function TextboxWithErrorBase({ error, ...props }, ref) {
    const errorMessageId = useId();
    return (
      <div className="relative">
        <Textbox
          {...props}
          ref={ref}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
        />
        {error && (
          <ErrorMessage id={errorMessageId} className="absolute top-10 right-0">
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  }
);
