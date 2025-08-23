import { ThemeProvider } from "@/components/theme-provider";
import WaveBackground from "@/components/wave-background";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WaveBackground />
      <LoginForm />
    </ThemeProvider>
  );
}
