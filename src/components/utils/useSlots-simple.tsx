import React, { Children, ReactElement, ReactNode } from "react";

type Slots = {
  [slotKey: string]: string;
};

type SlotComponents = {
  [slotKey: string]: ReactElement;
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
      /**
       * Return a simple child
       */
      if (slotKey) {
        slotComponents[slotKey] = child;
      } else {
        remainingChildren.push(child);
      }
    } else {
      remainingChildren.push(child);
    }
  });

  slotComponents.children =
    remainingChildren.length > 0 ? remainingChildren : null;

  return slotComponents;
};
