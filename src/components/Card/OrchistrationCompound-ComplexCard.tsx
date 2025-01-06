/**
 * Card component which orchestrates the Header and Footer components to specific order
 * - ? also need to re ordoer into sub components; <Footer><Actions></Footer>
 */
import React from "react";

import { useSlots } from "../utils/useSlots";

type CardProps = { children: React.ReactNode };

export const Card = (props: CardProps) => {
  // Extract and map elements set from children
  const { Header, Footer, Actions, children } = useSlots(props.children, {
    Header: "CardHeader",
    Footer: "CardFooter",
    Actions: "CardActions",
  });

  /**
   * **Complex Card implemenation**
   * * Components are mapped and cloned and thus reusable in normal component markup.
   * * Allows for overriding props, values and children. And also allows re-structureing of the sub components
   * ! hurdle to overcome, if Actions is not present, it will render null but 'null' will override the footer content; solved with a ugly ternary for now.
   */

  const complexCard = () => (
    <div>
      <h2>Complex Card</h2>

      <Header className="text-[red]">Override value</Header>

      {children}

      {Actions ? (
        <Footer>
          <Actions />
        </Footer>
      ) : (
        <Footer />
      )}
    </div>
  );

  return complexCard();
};

// export CArd and its subcomponent and expose to front-end. Orchistration is done by implmentation and not component itself (imports are only done by implemntation)
export { CardHeader, CardHeader as Header } from "./components/Header";
export { CardFooter, CardFooter as Footer } from "./components/Footer";
export { CardActions, CardActions as Actions } from "./components/Actions";

// CARD acts as main Orchistrator
export default Card;
