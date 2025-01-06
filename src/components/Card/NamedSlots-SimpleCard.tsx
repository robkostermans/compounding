import React from "react";
import { type CardHeaderProps } from "./components/Header";
import { type CardFooterProps } from "./components/Footer";

/**
 * Issue here is that CardFooterProps and CardHeaderProps are not distinctive enough both satisfy each other type; so both will validate.
 */
type CardProps = {
  slots: {
    Header: React.ReactElement<CardHeaderProps>;
    Footer: React.ReactElement<CardFooterProps>;
  };
  children: React.ReactNode;
};
export const Card = (props: CardProps) => {
  const {
    slots: { Header, Footer },
    children,
  } = props;
  return (
    <div>
      <h2>Named Slots</h2>
      {Header}
      {children}
      {Footer}
    </div>
  );
};

// export Card and its subcomponent and expose to front-end. Orchistration is done by implmentation and not component itself (imports are only done by implemntation)
export { CardHeader, CardHeader as Header } from "./components/Header";
export { CardFooter, CardFooter as Footer } from "./components/Footer";
export { CardActions, CardActions as Actions } from "./components/Actions";

// CARD acts as main Orchistrator
export default Card;
