import React from "react";

import { useSlots } from "../utils/useSlots-simple";

type CardProps = { children: React.ReactNode };
export const Card = (props: CardProps) => {
  // Extract and map elements set from children
  const { Header, Footer, children } = useSlots(props.children, {
    Header: "CardHeader",
    Footer: "CardFooter",
    Actions: "CardActions",
  });

  /**
   *  **Simple Card implemenation**
   * * Using the mapped component to a structure; this case make sure the header is first and footer is last, the rest is in the middle
   * ! - a one to one pass though of the sub components; Card Component acting as a structure orchistrator
   * ? - note that `Actions` will be regarded as a common to `children`
   * @returns component
   */
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
