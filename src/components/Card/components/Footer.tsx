export type CardFooterProps = { children: React.ReactNode };

export const CardFooter = (props: CardFooterProps) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
