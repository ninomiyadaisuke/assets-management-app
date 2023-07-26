import { forwardRef, useId } from "react";

import { ErrorMessage } from "../../atoms/ErrorMessage";
import { Combobox } from "../Combobox";

type Props = React.ComponentPropsWithRef<"select"> & {
  error?: string;
};

export const ComboboxWithError = forwardRef<HTMLSelectElement, Props>(
  function ComboboxWithErrorBase({ error, ...props }, ref) {
    const errorMessageId = useId();
    return (
      <div className="relative grow">
        <Combobox
          {...props}
          ref={ref}
          aria-invalid={!!error}
          aria-errormessage={errorMessageId}
        />
        {error && (
          <ErrorMessage id={errorMessageId} className="absolute right-0 top-10">
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  }
);
