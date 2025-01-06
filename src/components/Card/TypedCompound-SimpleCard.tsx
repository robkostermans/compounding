/**
 * Premise: Typed children
 * a card that only allows children of specific types
 */

import React from "react";
import { type CardHeaderProps } from "./components/Header";
import { type CardFooterProps } from "./components/Footer";

type CardProps = {
  children:
    | React.ReactElement<CardHeaderProps>
    | Array<React.ReactElement<CardFooterProps>>;
};
export const Card = (props: CardProps) => {
  const { children } = props;

  return (
    <div>
      <h2>Simple Card</h2>
      {Header}
      {children}
      {Footer}
    </div>
  );
};

// export CArd and its subcomponent and expose to front-end. Orchistration is done by implmentation and not component itself (imports are only done by implemntation)
export { CardHeader, CardHeader as Header } from "./components/Header";
export { CardFooter, CardFooter as Footer } from "./components/Footer";
export { CardActions, CardActions as Actions } from "./components/Actions";

// CARD acts as main Orchistrator
export default Card;
