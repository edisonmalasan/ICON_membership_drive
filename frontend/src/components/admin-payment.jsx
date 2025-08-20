"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminPaymentComponent() {
    const initialPayments = [
        { id: "2025003", fullName: "Jane Doe", email: "jane.doe@example.com", status: "Pending" },
        { id: "2025004", fullName: "Maria Santos", email: "maria.santos@example.com", status: "Done" },
        { id: "2025005", fullName: "Juan Dela Cruz", email: "juan.delacruz@example.com", status: "Pending" },
        { id: "2025006", fullName: "Anna Reyes", email: "anna.reyes@example.com", status: "Pending" },
        { id: "2025007", fullName: "Carlos Mendoza", email: "carlos.mendoza@example.com", status: "Done" },
        { id: "2025008", fullName: "Luis Garcia", email: "luis.garcia@example.com", status: "Pending" },
        { id: "2025009", fullName: "Sofia Torres", email: "sofia.torres@example.com", status: "Done" },
        { id: "2025010", fullName: "Miguel Ramos", email: "miguel.ramos@example.com", status: "Pending" },
        { id: "2025011", fullName: "Isabella Cruz", email: "isabella.cruz@example.com", status: "Pending" },
        { id: "2025012", fullName: "Javier Morales", email: "javier.morales@example.com", status: "Done" },
        { id: "2025013", fullName: "Camila Reyes", email: "camila.reyes@example.com", status: "Pending" },
        { id: "2025014", fullName: "Ricardo Lopez", email: "ricardo.lopez@example.com", status: "Done" },
        { id: "2025015", fullName: "Lucia Fernandez", email: "lucia.fernandez@example.com", status: "Pending" },
        { id: "2025016", fullName: "Diego Martinez", email: "diego.martinez@example.com", status: "Done" },
        { id: "2025017", fullName: "Valeria Gutierrez", email: "valeria.gutierrez@example.com", status: "Pending" }
    ];

    const [payments, setPayments] = useState(initialPayments);

    const markComplete = (id) => {
        setPayments((prev) =>
            prev.map((payment) => (payment.id === id ? { ...payment, status: "Done" } : payment))
        );
    };

    // Limit displayed rows to 10
    const displayedPayments = payments.slice(0, 10);

    return (
        <div className="w-full flex flex-col gap-4 px-4 sm:px-8 md:px-16 text-sm sm:text-base md:text-lg">

            {/* Scrollable table for all screens */}
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800">
                <Table className="w-full min-w-[600px] table-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">ID</TableHead>
                            <TableHead className="w-[200px]">Full Name</TableHead>
                            <TableHead className="w-[200px]">Email</TableHead>
                            <TableHead className="w-[150px] text-center">Status</TableHead>
                            <TableHead className="w-[100px] text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedPayments.length ? (
                            displayedPayments.map((payment) => (
                                <TableRow key={payment.id} className="text-md hover:bg-neutral-800 transition-colors">
                                    <TableCell className="px-3 py-2 font-medium">{payment.id}</TableCell>
                                    <TableCell className="px-3 py-2">{payment.fullName}</TableCell>
                                    <TableCell className="px-3 py-2">{payment.email}</TableCell>
                                    <TableCell className="px-3 py-2 text-center">
                                        <span
                                            className={`inline-block px-3 py-1 rounded text-md ${payment.status === "Done" ? "bg-green-500 text-white" : "bg-[#F29339] text-black"
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-2 text-center h-12 flex items-center justify-center">
                                        {payment.status === "Pending" ? (
                                            <Button
                                                aria-label="Mark as Done"
                                                size="sm"
                                                className="p-2"
                                                onClick={() => markComplete(payment.id)}
                                            >
                                                <Check />
                                            </Button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">—</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4 text-white text-base">
                                    No payment submissions.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
