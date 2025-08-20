import { ThemeProvider } from "@/components/theme-provider";
import WaveBackground from "@/components/wave-background";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WaveBackground />
      <SignupForm />
    </ThemeProvider>
  );
}
