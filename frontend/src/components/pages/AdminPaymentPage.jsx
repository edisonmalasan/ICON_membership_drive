import React, { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Waves from '../../../ReactBits/Waves/Waves';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function AdminPaymentPage() {
    const initialPayments = [
        { id: "2025003", fullName: "Jane Doe", email: "jane.doe@example.com", status: "Pending" },
        { id: "2025004", fullName: "Maria Santos", email: "maria.santos@example.com", status: "Complete" },
        { id: "2025005", fullName: "Juan Dela Cruz", email: "juan.delacruz@example.com", status: "Pending" },
        { id: "2025006", fullName: "Anna Reyes", email: "anna.reyes@example.com", status: "Pending" },
        { id: "2025007", fullName: "Carlos Mendoza", email: "carlos.mendoza@example.com", status: "Complete" },
        { id: "2025008", fullName: "Liza Gutierrez", email: "liza.gutierrez@example.com", status: "Pending" },
        { id: "2025009", fullName: "Miguel Ramos", email: "miguel.ramos@example.com", status: "Complete" },
        { id: "2025010", fullName: "Sofia Navarro", email: "sofia.navarro@example.com", status: "Pending" },
        { id: "2025011", fullName: "Rafael Cruz", email: "rafael.cruz@example.com", status: "Pending" },
        { id: "2025012", fullName: "Isabella Torres", email: "isabella.torres@example.com", status: "Complete" },
        { id: "2025013", fullName: "Lucas Garcia", email: "lucas.garcia@example.com", status: "Pending" },
        { id: "2025014", fullName: "Emma Flores", email: "emma.flores@example.com", status: "Complete" },
        { id: "2025015", fullName: "Noah Lim", email: "noah.lim@example.com", status: "Pending" },
        { id: "2025016", fullName: "Clara Santos", email: "clara.santos@example.com", status: "Pending" },
        { id: "2025017", fullName: "Ethan Reyes", email: "ethan.reyes@example.com", status: "Complete" },
        { id: "2025018", fullName: "Maya Dela Cruz", email: "maya.delacruz@example.com", status: "Pending" },
        { id: "2025019", fullName: "Adrian Mendoza", email: "adrian.mendoza@example.com", status: "Pending" },
        { id: "2025020", fullName: "Victoria Lim", email: "victoria.lim@example.com", status: "Complete" },
        { id: "2025021", fullName: "Leo Torres", email: "leo.torres@example.com", status: "Pending" },
        { id: "2025022", fullName: "Olivia Cruz", email: "olivia.cruz@example.com", status: "Complete" },
        { id: "2025023", fullName: "Benjamin Ramos", email: "benjamin.ramos@example.com", status: "Pending" },
        { id: "2025024", fullName: "Sophia Garcia", email: "sophia.garcia@example.com", status: "Pending" },
        { id: "2025025", fullName: "Daniel Navarro", email: "daniel.navarro@example.com", status: "Complete" },
        { id: "2025026", fullName: "Ava Mendoza", email: "ava.mendoza@example.com", status: "Pending" },
        { id: "2025027", fullName: "Liam Santos", email: "liam.santos@example.com", status: "Pending" },
        { id: "2025028", fullName: "Chloe Reyes", email: "chloe.reyes@example.com", status: "Complete" },
        { id: "2025029", fullName: "Nathan Cruz", email: "nathan.cruz@example.com", status: "Pending" },
        { id: "2025030", fullName: "Isla Dela Cruz", email: "isla.delacruz@example.com", status: "Pending" },
    ];


    const [payments, setPayments] = useState(initialPayments);

    const markComplete = (id) => {
        setPayments((prev) =>
            prev.map((payment) => (payment.id === id ? { ...payment, status: "Complete" } : payment))
        );
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="relative min-h-screen overflow-hidden">
                {/* Wave background */}
                <div className="absolute -z-10 w-full h-full">
                    <Waves
                        lineColor="#202020ff"
                        backgroundColor="#1a1a1aff"
                        waveSpeedX={0.02}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={12}
                        yGap={36}
                    />
                </div>

                <div className="relative flex min-h-screen items-center justify-center p-6 md:p-10 z-10">
                    <Card className="w-full max-w-6xl">
                        <CardHeader>
                            <CardTitle className="text-center text-lg">Payment Submissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800">

                                <Table className="bg-transparent">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[120px]">ID Number</TableHead>
                                            <TableHead className="w-[200px]">Full Name</TableHead>
                                            <TableHead className="w-[200px]">Email</TableHead>
                                            <TableHead className="w-[150px] text-center">Payment Status</TableHead>
                                            <TableHead className="w-[150px] text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payments.length ? (
                                            payments.map((payment) => (
                                                <TableRow key={payment.id}>
                                                    <TableCell className="font-medium text-white px-3 py-1">{payment.id}</TableCell>
                                                    <TableCell className="text-white px-3 py-1">{payment.fullName}</TableCell>
                                                    <TableCell className="text-white px-3 py-1">{payment.email}</TableCell>
                                                    <TableCell className="text-center px-3 py-1">
                                                        <span
                                                            className={`inline-block px-3 py-1 text-center w-24 h-8 ${payment.status === "Complete"
                                                                ? "bg-green-500 text-white"
                                                                : "bg-[#F29339] text-black"
                                                                }`}
                                                        >
                                                            {payment.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {payment.status === "Pending" ? (
                                                            <Button
                                                                className="text-xs h-8"
                                                                size="sm"
                                                                onClick={() => markComplete(payment.id)}
                                                            >
                                                                Mark Complete
                                                            </Button>
                                                        ) : (
                                                            <span className="inline-flex items-center justify-center h-8 text-gray-400">
                                                                —
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-4 text-white">
                                                    No payment submissions.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="w-full text-center text-xs">
                                Admin view of payment submissions.
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    );
}
