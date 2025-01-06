import { twMerge } from "tailwind-merge"; // or CSLX for simpel merging
import { Heading } from "../../Primitives/Heading";
export type CardHeaderProps = React.ComponentPropsWithoutRef<"div">;

// define base style (or reuse existing styles)
const BASE_CARD_HEADER_CLASSNAME = "text-2xl font-bold";

export const CardHeader: React.FunctionComponent<CardHeaderProps> = (props) => {
  const { className, children, ...rest } = props;
  return (
    <h1 className={twMerge(BASE_CARD_HEADER_CLASSNAME, className)} {...rest}>
      {children}
    </h1>
  );
};

/**
 * Alternative implementation
 * CardHeading, by naming, is an extension of the more primitive Heading component
 */
export const CardHeading: React.FunctionComponent<CardHeaderProps> = (
  props
) => {
  const { className, children, ...rest } = props;
  return (
    <Heading
      as="h1"
      className={twMerge(BASE_CARD_HEADER_CLASSNAME, className)}
      {...rest}
    >
      {children}
    </Heading>
  );
};
