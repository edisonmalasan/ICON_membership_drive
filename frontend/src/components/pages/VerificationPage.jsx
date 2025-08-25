"use client";

import { MailCheck, Clock, ArrowLeft } from "lucide-react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeProvider } from "@/components/theme-provider";
import WaveBackground from '@/components/wave-background';

export default function VerificationPendingPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="relative min-h-screen w-full flex items-center justify-center px-4">
        <WaveBackground />

        <Card className="relative w-full p-0 max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-lg overflow-hidden">
        
          <div className="p-6 mt-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="mx-auto h-10 w-10 rounded-xl grid place-items-center border">
                <MailCheck className="h-5 w-5" />
              </div>

              <CardTitle className="text-lg text-center">Check your inbox</CardTitle>
              <CardDescription className="text-sm text-center">
                Expect an email within <span className="font-semibold">24 hours</span> to verify your membership.
              </CardDescription>

              <Separator className="my-4" />

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription className="text-sm">
                  Verification emails can sometimes land in Spam/Promotions. If you don't see it soon, try searching for your organization's sender or subject line.
                </AlertDescription>
              </Alert>
            </div>

            <CardFooter className="flex flex-col sm:flex-row gap-2 mt-6 justify-center">
              <Button variant="outline" className="sm:w-auto" asChild>
                <a href="/home">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </a>
              </Button>
            </CardFooter>
          </div>
          <div className="hidden md:block">
            <img
              src="ICON.png"
              alt="Background"
              className="h-full w-full object-cover"
            />
          </div>
        </Card>
      </main>
    </ThemeProvider>
  );
}
