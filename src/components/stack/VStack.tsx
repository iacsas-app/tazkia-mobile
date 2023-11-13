import Stack, { StackProps } from './Stack';

export default function VStack({ children, ...props }: StackProps) {
  return (
    <Stack flexDirection="column" {...props}>
      {children}
    </Stack>
  );
}
