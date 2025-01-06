import { twMerge } from "tailwind-merge"; // or CSLX for simpel merging
export type HeadingProps = React.ComponentPropsWithoutRef<"h1"> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
// define base style (or reuse existing styles)
const BASE_CARD_HEADER_CLASSNAME = "text-xl font-bold";

// Oversimplified version of the Heading component; not taking the 'as' prop into account for now; not a proper polymorphic type, just default to h1

export const Heading: React.FunctionComponent<HeadingProps> = (props) => {
  const { as = "h1", className, children, ...rest } = props;

  const Comp = as;

  return (
    <Comp className={twMerge(BASE_CARD_HEADER_CLASSNAME, className)} {...rest}>
      {children}
    </Comp>
  );
};
