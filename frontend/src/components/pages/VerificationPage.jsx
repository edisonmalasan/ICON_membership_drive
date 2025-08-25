"use client";

import { MailCheck, Clock, Send, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeProvider } from "../theme-provider";

export default function VerificationPendingPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-[calc(100dvh)] w-full flex items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-2xl grid place-items-center border">
              <MailCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Check your inbox</CardTitle>
            <CardDescription className="text-sm">
              Expect an email within <span className="font-semibold">24 hours</span> to verify your membership.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-4 pt-6">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription className="text-sm">
                Verification emails can sometimes land in Spam/Promotions. If you don't see it soon, try searching for your organization's sender or subject line.
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <a href="/home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </a>
            </Button>
            <div className="flex w-full sm:w-auto gap-2">
              <Button variant="secondary" className="flex-1 sm:flex-none" asChild>
                <a href="https://gmail.com" target="_blank">Open Mail App</a>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </ThemeProvider>
  );
}
