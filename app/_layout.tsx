import { Stack } from "expo-router";
import "../global.css";
import { BGMProvider } from "./contexts/BGMContext";

export default function RootLayout() {
  return (
    <BGMProvider>
      <Stack />
    </BGMProvider>
  );
}
