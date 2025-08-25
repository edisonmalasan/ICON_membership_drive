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
  const [referenceCode, setReferenceCode] = useState("");

  // Get membership type and calculate amount
  const membershipType = sessionStorage.getItem('membershipType') ? sessionStorage.getItem('membershipType') : "registration";
  const amount = membershipType === "renewal" ? 30 : 120;
  const isRenewal = membershipType === "renewal";

  // QR codes from public folder based on membership type
  const qrCodes = {
    registration: "/registration-qr.jpg", 
    renewal: "/renewal-qr.jpg",
  };

  // Account numbers based on membership type
  const accountNumbers = {
    registration: "Digital Payment (Registration): GCash/Maya - 09351262400",
    renewal: "Digital Payment (Renewal): GCash/Maya - 09351262400",
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

  // Get the appropriate QR code and account number based on membership type
  const getCurrentQR = () => {
    return qrCodes[membershipType];
  };

  const getCurrentAccountNumber = () => {
    return accountNumbers[membershipType];
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
        {/* Show response message */}
        {responseMessage && (
          <div className={`mb-4 p-3 rounded-md text-center max-w-6xl w-full ${
            responseMessage.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {responseMessage}
          </div>
        )}

        <div className="w-full max-w-6xl">
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
                      if (selectedPayment) setIsDialogOpen(true);
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
                  src="/ICON.png"
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
                  Complete Your {isRenewal ? 'Renewal' : 'Registration'} Payment
                </DialogTitle>
                <DialogDescription className="text-center text-sm">
                  {selectedPayment === "cash" 
                    ? `Pay ₱${amount}.00 in person and enter the reference code provided by the cashier.`
                    : `Pay ₱${amount}.00 using the ${isRenewal ? 'renewal' : 'registration'} QR code below, then enter your transaction reference code.`
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 m-4 justify-items-center">
                {/* Amount reminder */}
                <div className="text-center p-3 bg-muted rounded-lg border w-full">
                  <p className="text-sm text-muted-foreground">
                    {isRenewal ? 'Renewal' : 'Registration'} Amount to Pay
                  </p>
                  <p className="text-2xl font-bold text-primary">₱{amount}.00</p>
                </div>

                {selectedPayment === "digital" && (
                  <>
                    <div className="text-center mb-2">
                      <p className="text-sm text-muted-foreground">
                        {isRenewal ? 'Membership Renewal' : 'Registration'} QR Code
                      </p>
                    </div>
                    <img
                      src={getCurrentQR()}
                      alt={`${membershipType} QR Code`}
                      className="w-64 h-64 object-contain border-2 border-muted rounded-lg"
                      onError={(e) => {
                        console.error(`Failed to load QR code: ${getCurrentQR()}`);
                        e.target.src = "/ICON.png"; // Fallback to ICON logo if QR fails
                      }}
                    />
                    <p className="text-center m-2 font-medium text-sm">
                      {getCurrentAccountNumber()}
                    </p>
                  </>
                )}

                {selectedPayment === "cash" && (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">💵</div>
                    <p className="font-medium text-lg">Cash Payment</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pay ₱{amount}.00 at the ICON office for {isRenewal ? 'membership renewal' : 'registration'} and get your reference code
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
                    placeholder={
                      selectedPayment === "cash" 
                        ? "Cash receipt code" 
                        : "Digital payment reference"
                    }
                    value={referenceCode}
                    onChange={handleReferenceCodeChange}
                    className="w-full text-center"
                  />
                </div>

                <DialogFooter className="w-full">
                  <Button
                    className="mt-4 text-md w-full"
                    onClick={handleConfirmPayment}
                    disabled={!referenceCode.trim() || loading}
                  >
                    {loading ? "Processing..." : `Confirm ${isRenewal ? 'Renewal' : 'Registration'} (₱${amount}.00)`}
                  </Button>
                </DialogFooter>
              </div>

              <DialogDescription className="text-center text-xs mt-4">
                Note: Your {isRenewal ? 'renewal' : 'registration'} payment will be verified within 24 hours. You&apos;ll
                receive a confirmation email once approved.
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </ThemeProvider>
  );
}