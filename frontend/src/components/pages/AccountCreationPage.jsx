"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "../theme-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import api from "@/api/axios";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AccountCreationPage() {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        id: "",
        email: "",
        password: "",
        role: "Member",
        course: "CS",
        year: "1st",
        paymentStatus: "",
        paymentMethod: "",
        amountPaid: "",
        referenceCode: "",
        remarks: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const memberPayload = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role.toLowerCase(),
                course: formData.course,
                year: Number(formData.year.replace(/\D/g, "")),
            };

            const memberRes = await api.post("/members", memberPayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const newMember = memberRes.data;
            console.log("Member created:", newMember);

            if (formData.paymentStatus || formData.amountPaid) {
                const paymentPayload = {
                    user: newMember._id,
                    amount: Number(formData.amountPaid) || 0,
                    status: formData.paymentStatus || "Unpaid",
                    paymentMethod: formData.paymentMethod || "Cash",
                    transactionId: formData.paymentMethod === "Digital"
                        ? formData.referenceCode || `MANUAL-${Date.now()}`
                        : `CASH-${Date.now()}`,
                    remarks: formData.remarks || "manual_account_creation",
                };

                const paymentRes = await api.post("/payments", paymentPayload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                console.log("Payment created:", paymentRes.data);
            }

    

            // reset form
            setFormData({
                name: "",
                id: "",
                email: "",
                password: "",
                role: "Member",
                course: "CS",
                year: "1st",
                paymentStatus: "",
                amountPaid: "",
                remarks: "",
            });
        } catch (error) {
            console.error("Error creating account:", error.response?.data || error.message);
        }
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Manual Account Creation</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    <div className="flex flex-1 items-center justify-center p-2">
                        <Card className="w-full max-w-2xl shadow-none ">
                            <CardContent className="p-4 md:p-6 flex flex-col gap-4">
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2 text-center mb-2">
                                        <h1 className="text-lg font-bold">Manual Account Creation</h1>
                                        <p className="text-muted-foreground text-xs">
                                            Create a user account manually if registration fails
                                        </p>
                                    </div>

                                    {/* Full Name */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>

                                    {/* ID Number */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="id">ID Number</Label>
                                        <Input
                                            id="id"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                            placeholder="XXXXXXX"
                                            maxLength={7}
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="m@slu.edu.ph"
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="password">Password</Label>
                                        <PasswordInput
                                            id="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>

                                    {/* Role */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="role">Role</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-8">{formData.role}</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, role: "Member" })}>Member</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, role: "Admin" })}>Admin</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Course */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="course">Course</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-8">{formData.course}</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, course: "CS" })}>BSCS</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, course: "IT" })}>BSIT</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Year */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="year">Year</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-8">{formData.year}</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, year: "1st" })}>1st</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, year: "2nd" })}>2nd</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, year: "3rd" })}>3rd</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, year: "3rd" })}>4th</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Payment Status (Optional) */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="paymentStatus">Payment Status (Optional)</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-8">
                                                    {formData.paymentStatus || "Select"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Unpaid", paymentMethod: "", amountPaid: "", referenceCode: "" })}>Unpaid</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Pending", paymentMethod: "", amountPaid: "", referenceCode: "" })}>Pending</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Paid" })}>Paid</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Show only if Paid */}
                                    {formData.paymentStatus === "Paid" && (
                                        <>
                                            {/* Payment Method */}
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="paymentMethod">Payment Method</Label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between h-8">
                                                            {formData.paymentMethod || "Select"}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                        <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentMethod: "Cash", referenceCode: "" })}>
                                                            Cash
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentMethod: "Digital" })}>
                                                            Digital
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            {/* Amount Paid */}
                                            <div className="flex flex-col gap-4">
                                                <Label htmlFor="amountPaid">Amount Paid</Label>
                                                <Input
                                                    id="amountPaid"
                                                    name="amountPaid"
                                                    type="number"
                                                    value={formData.amountPaid}
                                                    onChange={handleChange}
                                                    placeholder="Enter amount"
                                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>

                                            {/* Reference Code - show only if Digital */}
                                            {formData.paymentMethod === "Digital" && (
                                                <div className="flex flex-col gap-4">
                                                    <Label htmlFor="referenceCode">Reference Code / Transaction ID</Label>
                                                    <Input
                                                        id="referenceCode"
                                                        name="referenceCode"
                                                        value={formData.referenceCode || ""}
                                                        onChange={handleChange}
                                                        placeholder="Enter reference code"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Remarks */}
                                    <div className="flex flex-col gap-4 col-span-2">
                                        <Label htmlFor="remarks">Remarks</Label>
                                        <Input
                                            id="remarks"
                                            name="remarks"
                                            value={formData.remarks}
                                            onChange={handleChange}
                                            placeholder="Enter remarks"
                                        />
                                    </div>

                                    {/* Submit Button */}
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
