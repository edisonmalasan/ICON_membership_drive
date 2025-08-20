import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function PaymentForm() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const qrCodes = {
    maya: "https://img.freepik.com/free-vector/scan-me-qr-code_78370-9714.jpg?semt=ais_hybrid&w=740&q=80",
    gcash: "https://img.freepik.com/free-vector/scan-me-qr-code_78370-9714.jpg?semt=ais_hybrid&w=740&q=80",
  };

  const accountNumbers = {
    maya: "Maya Account: 09171234567",
    gcash: "GCash Account: 09181234567",
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
        <div className="w-full max-w-6xl">
          <Card className="p-0 overflow-hidden shadow-lg w-full">
            <CardContent className="grid p-0 md:grid-cols-2 h-full">
              {/* LEFT COLUMN */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <CardHeader className="text-center mb-6 p-0">
                  <CardTitle className="text-2xl font-bold">
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Select your preferred mobile payment method.
                  </CardDescription>
                </CardHeader>

                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="grid grid-cols-2 gap-4 mt-4"
                >
                  {/* Maya */}
                  <Label
                    htmlFor="maya"
                    className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md ${selectedPayment === "maya"
                      ? "border-[#00CC66] bg-[#E6F9F0] dark:bg-[#004D33] text-[#00A652]"
                      : "border-neutral-600bg-muted dark:bg-muted"
                      }`}
                  >
                    <RadioGroupItem value="maya" id="maya" className="sr-only" />
                    Maya
                  </Label>

                  {/* GCash */}
                  <Label
                    htmlFor="gcash"
                    className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md ${selectedPayment === "gcash"
                      ? "border-[#0077FF] bg-[#E6F2FF] dark:bg-[#003366] text-[#1c86ff]"
                      : "border-neutral-600 bg-muted dark:bg-muted"
                      }`}
                  >
                    <RadioGroupItem value="gcash" id="gcash" className="sr-only" />
                    GCash
                  </Label>
                </RadioGroup>

                <CardFooter className="mt-6 p-0">
                  <Button
                    className="w-full py-3 text-md font-medium"
                    onClick={() => {
                      if (selectedPayment) setIsDialogOpen(true);
                    }}
                  >
                    Continue
                  </Button>
                </CardFooter>
              </div>

              {/* RIGHT COLUMN - Logo */}
              <div className="bg-muted relative hidden md:flex items-center justify-center">
                <img
                  src="ICON.png"
                  alt="ICON Logo"
                  className="h-110 w-110 object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] mx-auto flex flex-col items-center justify-center">
              <DialogHeader className="w-full">
                <DialogTitle className="mt-4 text-center">
                  Complete Your Payment
                </DialogTitle>
                <DialogDescription className="text-center text-sm">
                  Scan the QR code or use the account number below and upload your
                  payment screenshot to confirm.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 m-4 justify-items-center">
                <img
                  src={qrCodes[selectedPayment]}
                  alt={`${selectedPayment} QR`}
                  className="w-64 h-64 object-contain"
                />
                <p className="text-center m-2 font-medium">
                  {accountNumbers[selectedPayment]}
                </p>

                <div className="grid gap-2 text-center w-full">
                  <Label className="block text-center" htmlFor="screenshot">
                    Upload Payment Screenshot
                  </Label>
                  <Input type="file" id="screenshot" accept="image/*" className="w-full" />
                </div>
                <DialogFooter className="w-full">
                  <Button
                    className="mt-4 text-md w-full"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Confirm Payment
                  </Button>
                </DialogFooter>
              </div>
              <DialogDescription className="text-center text-xs mt-4">
                Note: Your payment will be verified within 24 hours. You&apos;ll
                receive a confirmation email once approved.
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
}
