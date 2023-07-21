import { forwardRef } from "react";

type Props = React.ComponentPropsWithRef<"select">;

export const Combobox = forwardRef<HTMLSelectElement, Props>(
  function ComboboxBase({ ...props }, ref) {
    return (
      <select
        ref={ref}
        {...props}
        className="bg-gray-200 border border-gray-300 rounded-md text-gray-600 inline-block text-base w-full align-middle px-2.5 py-1.5 line-normal transition duration-200 focus:outline-none focus:bg-white aria-invalid:border-red-500  aria-invalid:bg-input-error disabled:opacity-50"
      />
    );
  }
);
