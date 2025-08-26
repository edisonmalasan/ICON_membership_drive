"use client";

import { useState } from "react";
import api from "@/api/axios";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ThemeProvider } from "../theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

export default function AccountCreationPage() {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        id: "",
        email: "",
        password: "",
        role: "Member",
        course: "BSCS",
        year: "1st",
        paymentStatus: "",
        paymentMethod: "",
        amountPaid: "",
        referenceCode: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage("");
        setSuccessMessage("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const memberPayload = {
                id: formData.id,
                email: formData.email,
                name: formData.name,
                role: (formData.role || "Member").toLowerCase(),
                course: formData.course,
                year: Number(formData.year.replace(/\D/g, "")),
                password: formData.role === "Admin" ? formData.password : undefined,
            };


            const { data: newMember } = await api.post("/members", memberPayload);

            const paymentPayload = {
                user: newMember._id,
                amount: Number(formData.amountPaid) || 0,
                paymentMethod: (formData.paymentMethod || "Cash").toLowerCase(),
                status: formData.paymentStatus,

                transactionId: formData.referenceCode
                    ? formData.referenceCode
                    : formData.paymentMethod === "Digital"
                        ? `DIGITAL-${Date.now()}`
                        : `CASH-${Date.now()}`,
                remarks: formData.remarks || "manual_account_creation",
            };

            await api.post("/payments", paymentPayload);

            setSuccessMessage("Account and payment created successfully!");

            setFormData({
                id: "",
                email: "",
                password: "",
                name: "",
                role: "Member",
                course: "BSCS",
                year: "1st",
                paymentStatus: "",
                paymentMethod: "",
                amountPaid: "",
                referenceCode: "",
                remarks: "",
            });
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Failed to create account.");
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Manual Account Creation</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    <div className="flex flex-1 justify-center items-center p-4 min-h-[calc(100vh-64px)]">
                        <Card className="w-full max-w-2xl shadow-none">
                            <CardContent className="p-6">
                                <h1 className="text-lg font-bold text-center mb-2">
                                    Manual Account Creation
                                </h1>
                                <p className="text-muted-foreground text-center text-sm mb-4">
                                    Create a user account manually if registration fails
                                </p>

                                {/* Alerts */}
                                {successMessage && (
                                    <Alert className="mb-4 text-green-600">
                                        <CheckCircle2Icon className="h-4 w-4" />
                                        <AlertTitle>Success</AlertTitle>
                                        <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
                                    </Alert>
                                )}

                                {errorMessage && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircleIcon className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{errorMessage}</AlertDescription>
                                    </Alert>
                                )}

                                <form className="grid grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                            className="h-10 w-full"
                                        />
                                    </div>

                                    {/* ID Number */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="id">ID Number</Label>
                                        <Input
                                            id="id"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                            placeholder="XXXXXXX"
                                            maxLength={7}
                                            required
                                            className="h-10 w-full"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="m@slu.edu.ph"
                                            required
                                            className="h-10 w-full"
                                        />
                                    </div>

                                    {/* Role */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="role">Role</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-10">
                                                    {formData.role || "Member"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full">
                                                {["Member", "Admin"].map((role) => (
                                                    <DropdownMenuItem
                                                        key={role}
                                                        onClick={() => setFormData({ ...formData, role })}
                                                    >
                                                        {role}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <PasswordInput
                                            id="password"
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({ ...formData, password: e.target.value })
                                            }
                                            required
                                            className="h-10 w-full"
                                        />
                                    </div>

                                    {/* Course */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="course">Course</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-10">
                                                    {formData.course}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full">
                                                {["BSCS", "BSIT", "BSMMA"].map((course) => (
                                                    <DropdownMenuItem
                                                        key={course}
                                                        onClick={() => setFormData({ ...formData, course })}
                                                    >
                                                        {course}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Year */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-10">
                                                    {formData.year}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-full">
                                                {["1st", "2nd", "3rd", "4th"].map((year) => (
                                                    <DropdownMenuItem
                                                        key={year}
                                                        onClick={() => setFormData({ ...formData, year })}
                                                    >
                                                        {year}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="paymentStatus">Payment Status (Optional)</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-10">
                                                    {formData.paymentStatus || "Unpaid"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Unpaid", paymentMethod: "", amountPaid: "", referenceCode: "" })}>Unpaid</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Pending", paymentMethod: "", amountPaid: "", referenceCode: "" })}>Pending</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Paid" })}>Paid</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>


                                    {/* Payment Method */}
                                    {formData.paymentStatus === "Paid" && (
                                        <>
                                            <div className="flex flex-col space-y-2">
                                                <Label htmlFor="paymentMethod">Payment Method</Label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-between h-10"
                                                        >
                                                            {formData.paymentMethod || "Select"}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" className="w-full">
                                                        {["Cash", "Digital"].map((method) => (
                                                            <DropdownMenuItem
                                                                key={method}
                                                                onClick={() =>
                                                                    setFormData({ ...formData, paymentMethod: method, referenceCode: "" })
                                                                }
                                                            >
                                                                {method}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Amount Paid */}
                                            <div className="flex flex-col space-y-2">
                                                <Label htmlFor="amountPaid">Amount Paid</Label>
                                                <Input
                                                    id="amountPaid"
                                                    name="amountPaid"
                                                    type="number"
                                                    value={formData.amountPaid}
                                                    onChange={handleChange}
                                                    placeholder="Enter amount"
                                                    className="h-10 w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&-moz-appearance:textfield]"
                                                />
                                            </div>

                                            {/* Reference Code */}

                                            <div className="flex flex-col space-y-2 col-span-2">
                                                <Label htmlFor="referenceCode">Reference Code</Label>
                                                <Input
                                                    id="referenceCode"
                                                    name="referenceCode"
                                                    value={formData.referenceCode}
                                                    onChange={handleChange}
                                                    placeholder="Enter reference code"
                                                    className="h-10 w-full"
                                                />
                                            </div>

                                        </>
                                    )}

                                    {/* Remarks */}
                                    <div className="flex flex-col space-y-2 col-span-2">
                                        <Label htmlFor="remarks">Remarks</Label>
                                        <Input
                                            id="remarks"
                                            name="remarks"
                                            value={formData.remarks}
                                            onChange={handleChange}
                                            placeholder="Enter remarks"
                                            className="h-10 w-full"
                                        />
                                    </div>

                                    {/* Create Account */}
                                    <div className="col-span-2">
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button" className="w-full h-10">Create Account</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription>
                                                    This will create a new account with the details you entered.
                                                </DialogDescription>
                                                <DialogFooter className="flex justify-end gap-2">
                                                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                                                    <Button
                                                        onClick={(e) => {
                                                            setOpen(false);
                                                            handleSubmit(e);
                                                        }}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
