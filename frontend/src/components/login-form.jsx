import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    gcash:
      "https://img.freepik.com/free-vector/scan-me-qr-code_78370-9714.jpg?semt=ais_hybrid&w=740&q=80",
  };

  const accountNumbers = {
    maya: "Maya Account: 09171234567",
    gcash: "GCash Account: 09181234567",
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
      <div className="w-full max-w-6xl">
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="grid p-0 md:grid-cols-2">
            
            {/* LEFT COLUMN */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <CardHeader className="text-center mb-6 p-0">
                <CardTitle className="text-2xl font-bold">Payment Method</CardTitle>
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
                  className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md
                    ${
                      selectedPayment === "maya"
                        ? "border-green-600 bg-green-100 dark:bg-green-800"
                        : "border-gray-300 bg-white dark:bg-gray-900"
                    }`}
                >
                  <RadioGroupItem value="maya" id="maya" className="sr-only" />
                  Maya
                </Label>

                {/* GCash */}
                <Label
                  htmlFor="gcash"
                  className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md
                    ${
                      selectedPayment === "gcash"
                        ? "border-blue-600 bg-blue-100 dark:bg-blue-800"
                        : "border-gray-300 bg-white dark:bg-gray-900"
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
          <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
            <DialogHeader className="text-center">
              <DialogTitle>Complete Your Payment</DialogTitle>
              <DialogDescription className="text-sm">
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

              <div className="grid gap-2">
                <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                <Input type="file" id="screenshot" accept="image/*" />
              </div>
            </div>

            <DialogFooter className="w-full">
              <div className="flex justify-center gap-4 w-full">
                <Button
                  className="px-6 py-3 text-md w-full"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Confirm Payment
                </Button>
              </div>
            </DialogFooter>

            <DialogDescription className="text-center text-xs mt-4">
              Note: Your payment will be verified within 24 hours. You'll receive a
              confirmation email once approved.
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
