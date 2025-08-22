"use client";

import { AppSidebar } from "@/components/app-sidebar";
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

export default function AccountCreationPage() {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        email: "",
        password: "",
        role: "User",
        course: "CS",
        year: "1st",
        paymentStatus: "Pending"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Account Created:", formData);
        alert("Account created successfully (mock).");
        setFormData({
            name: "",
            id: "",
            email: "",
            password: "",
            role: "User",
            course: "CS",
            year: "1st",
            paymentStatus: "Pending"
        });
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
                                            size="sm"
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
                                            size="sm"
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
                                            size="sm"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="password">Password</Label>
                                        <PasswordInput
                                            id="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                            size="sm"
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
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, course: "CS" })}>CS</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, course: "IT" })}>IT</DropdownMenuItem>
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
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Payment Status */}
                                    <div className="flex flex-col gap-4">
                                        <Label htmlFor="paymentStatus">Payment Status</Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between h-8">{formData.paymentStatus}</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Unpaid" })}>Unpaid</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Pending" })}>Pending</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFormData({ ...formData, paymentStatus: "Paid" })}>Paid</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-span-2">
                                        <Button type="submit" className="w-full h-10">Create Account</Button>
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
