
import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

// export const span =
//   "col-span-full even:mb-4 xs:even:mb-0 xs:odd:col-span-3 xs:even:col-span-9";
export const span = {
  label: "col-span-full xs:mb-0 xs:col-span-3",
  input: "col-span-full xs:col-span-9 mb-4",
  error: "col-span-full xs:col-start-4",
}
export const grid = "grid grid-cols-12 gap-x-4 gap-y-0 xs:gap-y-4";
export const inputLabel =
  "text-start xs:text-end font-manrope text-sm font-normal text-slate-200/50";
export const inputDisable =
  "-mt-2 md:mt-0 rounded-none bg-slate-800 font-manrope text-sm !text-slate-200 disabled:!bg-transparent";
export const inputEnable =
  "-mt-2 md:mt-0 rounded-sm !border-gray-500 bg-slate-800 font-manrope !text-slate-200 ring-4 ring-transparent placeholder:text-gray-500/95 focus:!border-slate-100";

interface FormContainerProps {
  children: ReactNode;
  header: string;
  content: string;
}
export const FormContainer = (props: FormContainerProps) => {
  const { children, header, content } = props;

  return (
    <section
      className={`flex h-fit min-h-[384px] flex-col gap-1 rounded bg-form px-8 py-4`}
    >
      <div className="mb-3 xs:h-12">
        <Typography variant="h5" className="font-manrope text-slate-200">
          {header}
        </Typography>
        <Typography variant="small" className="font-manrope text-slate-200/50">
          {content}
        </Typography>
      </div>
      <hr className="my-2 w-full border-divider" />
      <div className="w-full pb-6 pt-2">{children}</div>
    </section>
  );
};
