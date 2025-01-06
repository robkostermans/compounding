/**
 *
 * - use .notation as slots? or
 *
 */

import React from "react";
import { type CardHeaderProps } from "./components/Header";
import { type CardFooterProps } from "./components/Footer";

const allowedChildren = ["CardHeader", "CardFooter", "div"];

type CardProps = {
  children:
    | React.ReactElement<CardHeaderProps>
    | Array<React.ReactElement<CardFooterProps>>;
};
export const Card = (props: CardProps) => {
  const { children } = props;

  const validChildren = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      ((typeof child.type === "function" &&
        !allowedChildren.includes(child.type.name)) ||
        (typeof child.type === "string" &&
          !allowedChildren.includes(child.type)))
  );

  if (!validChildren)
    throw Error(
      "Stopped processing: Invalid children found in 'Card'. Only allowed children are " +
        allowedChildren.toString()
    );
  //throw Error("Not implemented");

  return (
    <div>
      <h2>Simple Card</h2>
      {/* {Header} */}
      {children}
      {/* {Footer} */}
    </div>
  );
};

// export Card and its subcomponent and expose to front-end. Orchistration is done by implmentation and not component itself (imports are only done by implemntation)
export { CardHeader, CardHeader as Header } from "./components/Header";
export { CardFooter, CardFooter as Footer } from "./components/Footer";
export { CardActions, CardActions as Actions } from "./components/Actions";

// CARD acts as main Orchistrator
export default Card;
