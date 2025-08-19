import { ThemeProvider } from "@/components/theme-provider";
import Waves from '../../../ReactBits/Waves/Waves';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";




export default function ForgotPasswordPage() {

    const navigate = useNavigate();
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
                <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
                    <div className="w-full max-w-sm md:max-w-3xl">
                        <Card className="overflow-hidden mt-2 mb-4 p-0">
                            <CardContent className="grid p-0 md:grid-cols-2 min-h-full">
                                <form className="p-8 md:p-10 flex flex-col gap-8">
                                    <div className="self-start -mb-1">
                                        <Button
                                            variant="link"
                                            onClick={() => navigate("/")}
                                            className="flex items-center underline underline-offset-4 text-sm"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-col items-center text-center gap-2">
                                        <h1 className="text-3xl font-bold">Forgot Password</h1>
                                        <p className="text-muted-foreground text-base">
                                            Enter your email to reset your password
                                        </p>
                                    </div>


                                    <div className="grid gap-4">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@slu.edu.ph"

                                        />
                                    </div>


                                    <Button type="submit" className="w-full py-3 mt-4">
                                        Send Reset Link
                                    </Button>
                                </form>


                                <div className="bg-muted relative hidden md:flex items-center justify-center">
                                    <img
                                        src="ICON.png"
                                        alt="Image"
                                        className="h-110 w-110 object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 mt-4">
                            By submitting, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
