import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { forwardRef, useId } from "react";

type Props = React.ComponentPropsWithRef<"button"> & {
  label: string;
};

export const Checkbox = forwardRef<HTMLButtonElement, Props>(
  function CheckboxBase({ label, ...props }, ref) {
    const id = useId();
    return (
      <div className="flex items-center">
        <RadixCheckbox.Root
          {...props}
          ref={ref}
          className="flex h-5 w-5 appearance-none items-center justify-center rounded-[4px] border border-gray-600 bg-white outline-none"
          id={id}
        >
          <RadixCheckbox.Indicator className="text-primary">
            <CheckIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <label className="pl-2 text-sm text-gray-600" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
);
