import { useAppSelector } from "@/redux/hooks";
import { Spinner, Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

export const span = "col-span-full even:mb-4 xs:even:mb-0 xs:odd:col-span-3 xs:even:col-span-9";
export const grid = "grid grid-cols-12 gap-x-4 gap-y-0 xs:gap-y-4";
export const inputHeader =
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
  const { loading } = useAppSelector((state) => state.user);

  return (
    <section
      className={`flex h-auto min-h-[384px] max-w-[719.2px] flex-col ${
        loading ? "items-center" : "items-start"
      } justify-around gap-1 rounded-md bg-[#242526] px-8 py-4`}
    >
      {loading ? (
        <Spinner className="h-8 w-8" />
      ) : (
        <>
          <div className="mb-3 h:auto xs:h-12">
            <Typography variant="h5" className="font-manrope text-slate-200">
              {header}
            </Typography>
            <Typography
              variant="small"
              className="font-manrope text-slate-200/50"
            >
              {content}
            </Typography>
          </div>
          <hr className="my-2 w-full border-slate-50/[0.06]" />

          <div className="pb-6 pt-2 w-full h-full">{children}</div>
        </>
      )}
    </section>
  );
};
