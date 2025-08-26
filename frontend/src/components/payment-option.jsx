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
import { usePaymentViewModel } from "@/integration/payment-view-model"

export default function PaymentForm(memberData) {
  const {
    form,
    loading,
    responseMessage,
    handleSubmit,
  } = usePaymentViewModel();

  const [selectedPayment, setSelectedPayment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSampleDialogOpen, setIsSampleDialogOpen] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  // Get membership type and calculate amount
  const membershipType = sessionStorage.getItem('membershipType') ? sessionStorage.getItem('membershipType') : "registration";
  const amount = membershipType === "renewal" ? 30 : 120;
  const isRenewal = membershipType === "renewal";

  const qrCodes = {
    maya: "https://img.freepik.com/free-vector/scan-me-qr-code_78370-9714.jpg?semt=ais_hybrid&w=740&q=80",
    gcash: "https://img.freepik.com/free-vector/scan-me-qr-code_78370-9714.jpg?semt=ais_hybrid&w=740&q=80",
  };

  const accountNumbers = {
    maya: "Maya Account: 09294030531",
    gcash: "GCash Account: 09294030531",
  };

  const handleReferenceCodeChange = (e) => {
    setReferenceCode(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (!referenceCode.trim()) {
      alert("Please enter a reference code");
      return;
    }

    const paymentData = {
      user: memberData.memberData._id,
      amount: amount,
      paymentMethod: selectedPayment,
      transactionId: referenceCode,
      remarks: `${membershipType}_${selectedPayment}_${new Date().getFullYear()}`
    }

    console.log("Payment Data:", paymentData);
    handleSubmit(paymentData);

    setIsDialogOpen(false);
    setReferenceCode("");
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen max-h-screen flex-col items-center justify-center md:p-10 overflow-hidden z-10">
        <div className="w-full max-w-6xl p-6">
          <Card className="p-0 overflow-hidden shadow-lg w-full">
            <CardContent className="grid p-0 md:grid-cols-2 h-full">
              {/* LEFT COLUMN */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <CardHeader className="text-center mb-6 p-0">
                  <CardTitle className="text-2xl font-bold">
                    Hi {memberData.memberData.name}
                  </CardTitle>
                  <CardDescription>
                    Complete your {isRenewal ? 'membership renewal' : 'registration'} payment to proceed.
                  </CardDescription>

                  {/* Payment Amount Display */}
                  <div className="mt-4 p-4 bg-muted rounded-lg border">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        {isRenewal ? 'Renewal Fee' : 'Registration Fee'}
                      </p>
                      <p className="text-3xl font-bold text-primary mt-1">
                        ₱{amount}.00
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isRenewal ? 'Annual membership renewal' : 'One-time registration fee'}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <div className="mb-4">
                  <Label className="text-sm font-medium">Select Payment Method:</Label>
                </div>

                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* Cash */}
                  <Label
                    htmlFor="cash"
                    className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md ${selectedPayment === "cash"
                      ? "border-[#00CC66] bg-[#E6F9F0] dark:bg-[#004D33] text-[#00A652]"
                      : "border-neutral-600 bg-muted dark:bg-muted"
                      }`}
                  >
                    <RadioGroupItem value="cash" id="cash" className="sr-only" />
                    <div className="text-center">
                      <div className="text-2xl mb-2">💵</div>
                      <div>Cash</div>
                    </div>
                  </Label>

                  {/* Digital */}
                  <Label
                    htmlFor="digital"
                    className={`cursor-pointer border-2 rounded-lg flex items-center justify-center p-6 font-semibold transition-all hover:shadow-md ${selectedPayment === "digital"
                      ? "border-[#0077FF] bg-[#E6F2FF] dark:bg-[#003366] text-[#1c86ff]"
                      : "border-neutral-600 bg-muted dark:bg-muted"
                      }`}
                  >
                    <RadioGroupItem value="digital" id="digital" className="sr-only" />
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div>Digital</div>
                    </div>
                  </Label>
                </RadioGroup>

                <CardFooter className="mt-6 p-0">
                  <Button
                    className="w-full py-3 text-md font-medium"
                    onClick={() => {
                      if (selectedPayment === "digital") {
                        setIsSampleDialogOpen(true);
                      } else if (selectedPayment) {
                        setIsDialogOpen(true);
                      }
                    }}
                    disabled={!selectedPayment}
                  >
                    Pay ₱{amount}.00
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

          {/* SAMPLE DIALOG (for digital payment reference code guide) */}
          <Dialog open={isSampleDialogOpen} onOpenChange={setIsSampleDialogOpen}>
            <DialogContent className="sm:max-w-[425px] mx-auto flex flex-col items-center justify-center">
              <DialogHeader className="w-full">
                <DialogTitle className="text-center mt-2">Where to Find Your Reference Code</DialogTitle>
                <DialogDescription className="text-center text-sm">
                  Here's a sample screenshot to guide you in locating your transaction reference number.
                </DialogDescription>
              </DialogHeader>

              <img
                src="SampleRefCode.png"
                alt="Sample Reference Code"
                className="w-80 h-auto rounded-lg border shadow"
              />

              <DialogFooter className="w-full">
                <Button
                  className="mt-4 text-md w-full"
                  onClick={() => {
                    setIsSampleDialogOpen(false);
                    setIsDialogOpen(true);
                  }}
                >
                  Continue to Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* MAIN PAYMENT DIALOG */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px] mx-auto flex flex-col items-center justify-center">
              <DialogHeader className="w-full">
                <DialogTitle className="mt-4 text-center">
                  Complete Your Payment
                </DialogTitle>
                <DialogDescription className="text-center text-sm">
                  {selectedPayment === "cash"
                    ? `Pay ₱${amount}.00 in person and enter the reference code provided by the cashier.`
                    : `Pay ₱${amount}.00 using the QR code or account number below, then enter your transaction reference code.`
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 m-4 justify-items-center">
                {/* Amount reminder */}
                <div className="text-center p-3 bg-muted rounded-lg border w-full">
                  <p className="text-sm text-muted-foreground">Amount to Pay</p>
                  <p className="text-2xl font-bold text-primary">₱{amount}.00</p>
                </div>

                {selectedPayment === "digital" && (
                  <>
                    <img
                      src={qrCodes[selectedPayment]}
                      alt={`${selectedPayment} QR`}
                      className="w-64 h-64 object-contain"
                    />
                    <p className="text-center m-2 font-medium">
                      {accountNumbers[selectedPayment]}
                    </p>
                  </>
                )}

                {selectedPayment === "cash" && (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">💵</div>
                    <p className="font-medium text-lg">Cash Payment</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pay ₱{amount}.00 at the ICON office and get your reference code
                    </p>
                  </div>
                )}

                <div className="grid gap-2 text-center w-full">
                  <Label className="block text-center" htmlFor="referenceCode">
                    Enter Reference Code
                  </Label>
                  <Input
                    type="text"
                    id="referenceCode"
                    placeholder={selectedPayment === "cash" ? "Cash receipt code" : "Transaction reference number"}
                    value={referenceCode}
                    onChange={handleReferenceCodeChange}
                    className="w-full text-center"
                  />
                </div>

                <DialogFooter className="w-full">
                  <Button
                    className="mt-4 text-md w-full"
                    onClick={handleConfirmPayment}
                    disabled={!referenceCode.trim()}
                  >
                    Confirm Payment (₱{amount}.00)
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
