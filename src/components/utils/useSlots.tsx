import React, { Children, ReactElement, ReactNode } from "react";

type Slots = {
  [slotKey: string]: string;
};

type SlotComponents = {
  [slotKey: string]: (props: Record<string, unknown>) => ReactElement;
} & { children?: ReactNode };

export const useSlots = (children: ReactNode, slots: Slots): SlotComponents => {
  const slotComponents: SlotComponents = {};
  const remainingChildren: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const slotKey = Object.keys(slots).find((key) => {
        return (
          (typeof child.type === "function" &&
            child.type.name === slots[key]) ||
          child.type === slots[key]
        );
      });

      if (slotKey) {
        slotComponents[slotKey] = ({ ...props }) =>
          React.cloneElement(child, props);
      } else {
        remainingChildren.push(child);
      }
    } else {
      remainingChildren.push(child);
    }
  });

  slotComponents.children =
    remainingChildren.length > 0 ? remainingChildren : null;

  // TODO: not really the best outcome, will render null always will override <footer><actions/></footer> to null
  //   Object.keys(slots).forEach((slotKey) => {
  //     if (!slotComponents[slotKey]) {
  //       //slotComponents[slotKey] = null;
  //     }
  //   });

  return slotComponents;
};
