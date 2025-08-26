import { ThemeProvider } from "@/components/theme-provider";
import WaveBackground from "@/components/wave-background";
import PaymentForm from "@/components/payment-option";

export default function PaymentOptionPage() {
  const memberData = JSON.parse(localStorage.getItem("memberData")) || null;
  console.log("Member Data in PaymentOptionPage:", memberData);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WaveBackground />
      <div className="relative flex items-center justify-center max-h-screen">
        <div className="w-full max-w-4xl">
          <PaymentForm memberData={memberData} />
        </div>
      </div>
    </ThemeProvider>
  );
}