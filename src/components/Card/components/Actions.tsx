export type CardActionsProps = { children: React.ReactNode };

export const CardActions = (props: CardActionsProps) => {
  const { children } = props;
  return <div className="">{children}</div>;
};
