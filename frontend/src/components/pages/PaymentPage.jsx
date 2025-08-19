import { ThemeProvider } from "@/components/theme-provider";
import Waves from '../../../ReactBits/Waves/Waves';
import PaymentForm from "@/components/payment-form";

export default function PaymentPage({ memberData }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="relative min-h-screen overflow-hidden">
                <div className="absolute -z-10 w-full h-full">
                    <Waves
                        lineColor="#202020ff"
                        backgroundColor="#1a1a1aff"
                        waveSpeedX={0.02}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={12}
                        yGap={36}
                    />
                </div>
                <div className="relative flex items-center justify-center min-h-screen p-6 md:p-10 overflow-hidden z-10">
                    <div className="w-full max-w-[450px]">
                        <PaymentForm memberData={memberData} />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
