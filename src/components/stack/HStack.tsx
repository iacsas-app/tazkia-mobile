import Stack, { StackProps } from './Stack';

export default function HStack({ children, ...props }: StackProps) {
  return (
    <Stack flexDirection="row" {...props}>
      {children}
    </Stack>
  );
}
