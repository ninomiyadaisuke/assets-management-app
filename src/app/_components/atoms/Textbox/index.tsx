import { forwardRef } from "react";

type Props = Omit<React.ComponentPropsWithRef<"input">, "type" | "className">;

export const Textbox = forwardRef<HTMLInputElement, Props>(function TextboxBase(
  props,
  ref
) {
  return (
    <input
      ref={ref}
      type="text"
      {...props}
      className="bg-gray-200 border border-gray-300 rounded-md text-gray-600 inline-block text-base w-full align-middle px-2.5 py-1.5 line-normal transition duration-200 focus:outline-none focus:bg-white
      aria-invalid:border-red-500  aria-invalid:bg-input-error disabled:opacity-50"
    />
  );
});
