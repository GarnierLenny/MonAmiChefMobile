import { useTheme, View, YStack, Text } from "tamagui";

export default function ChatRoot() {
  const theme = useTheme({ name: "yellow" });

  console.log("tt", theme.base);
  return (
    <YStack background="$background">
      <Text>chatLayout</Text>
    </YStack>
  );
}
