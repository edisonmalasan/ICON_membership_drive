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
    DialogClose,
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
        <>
            <Card className="w-full md:w-[500px] p-6 rounded-xl shadow-lg">
                <CardHeader className="text-center mb-6">
                    <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
                    <CardDescription>
                        Select your preferred mobile payment method.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-6">
                    <RadioGroup
                        value={selectedPayment}
                        onValueChange={setSelectedPayment}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div>
                            <RadioGroupItem value="maya" id="maya" className="peer sr-only" aria-label="Maya" />
                            <Label
                                htmlFor="maya"
                                className={`border-2 rounded-lg flex flex-col items-center justify-center p-6 text-primary 
            hover:bg-green-50 dark:hover:bg-green-900 
            peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-100 dark:peer-data-[state=checked]:bg-green-800
            transition-all`}
                            >
                                Maya
                            </Label>
                        </div>

                        <div>
                            <RadioGroupItem value="gcash" id="gcash" className="peer sr-only" aria-label="GCash" />
                            <Label
                                htmlFor="gcash"
                                className={`border-2 rounded-lg flex flex-col items-center justify-center p-6 text-primary  
            hover:bg-blue-50 dark:hover:bg-blue-900 
            peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-100 dark:peer-data-[state=checked]:bg-blue-800
            transition-all`}
                            >
                                GCash
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>

                <CardFooter className="mt-4">
                    <Button
                        className="w-full py-3 text-md font-medium"
                        onClick={() => {
                            if (selectedPayment) setIsDialogOpen(true);
                        }}
                    >
                        Continue
                    </Button>
                </CardFooter>
            </Card>


            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-center">Complete Your Payment</DialogTitle>
                        <DialogDescription className="text-center text-sm">
                            Scan the QR code or use the account number below and upload your payment screenshot to confirm.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 m-4 justify-items-center">
                        <img
                            src={qrCodes[selectedPayment]}
                            alt={`${selectedPayment} QR`}
                            className="w-64 h-64 object-contain"
                        />
                        <p className="text-center m-2 font-medium">{accountNumbers[selectedPayment]}</p>

                        <div className="grid gap-2">
                            <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                            <Input type="file" id="screenshot" accept="image/*" />
                        </div>
                    </div>

                    <DialogFooter className="w-full">
                        <div className="flex justify-center m-1 gap-4 w-full">
                            <Button className="md:w-auto px-6 py-3 text-md" onClick={() => setIsDialogOpen(false)}>
                                Confirm Payment
                            </Button>
                        </div>
                    </DialogFooter>


                    <DialogDescription className="text-center text-xs mt-4">
                        Note: Your payment will be verified within 24 hours. You'll receive a confirmation email once approved.
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
}
