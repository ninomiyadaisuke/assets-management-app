import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"select">;

export const Combobox = forwardRef<HTMLSelectElement, Props>(
  function ComboboxBase({ ...props }, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className="line-normal inline-block w-full rounded-md border border-gray-300 bg-gray-200 px-2.5 py-1.5 align-middle text-base text-gray-600 transition duration-200 focus:bg-white focus:outline-none disabled:opacity-50  aria-invalid:border-red-500 aria-invalid:bg-input-error"
      />
    );
  }
);
