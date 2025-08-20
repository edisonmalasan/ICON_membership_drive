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
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function AccountCreationPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Account Created:", formData);
        alert("Account created successfully (mock).");
        setFormData({ name: "", email: "", password: "", role: "User" });
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

                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-0">
                        <div className="flex-1 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground font-medium min-h-0">
                            <Card className="w-full max-w-2xl mx-auto shadow-none">
                                <CardContent className="p-6 md:p-8 flex flex-col gap-6">
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-lg font-bold">Manual Account Creation</h1>
                                            <p className="text-muted-foreground text-balance text-xs">
                                                Create a user account manually if registration fails
                                            </p>
                                        </div>

                                        <div className="grid gap-3">
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

                                        <div className="grid gap-3">
                                            <Label htmlFor="id">ID Number</Label>
                                            <Input
                                                id="id"
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="XXXXXXX"
                                                maxLength={7}
                                                required />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email Address</Label>
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

                                        <div className="grid gap-3">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                            </div>
                                            <div className="relative">
                                                <PasswordInput id="password" required />
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="role">Role</Label>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-between"
                                                        id="role"
                                                    >
                                                        {formData.role}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="start"
                                                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                                                >
                                                    <DropdownMenuItem onClick={() => setFormData({ ...formData, role: "User" })}>
                                                        User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setFormData({ ...formData, role: "Admin" })}>
                                                        Admin
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>


                                        <Button type="submit" className="w-full">
                                            Create Account
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}
