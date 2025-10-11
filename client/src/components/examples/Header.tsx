import Header from "../Header";
import { ThemeProvider } from "../ThemeProvider";

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <Header onSettingsClick={() => console.log("Settings clicked")} />
    </ThemeProvider>
  );
}
