"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialPayments = [
  { id: "2025003", fullName: "Jane Doe", email: "jane.doe@example.com", status: "Pending", paymentMethod: "Cash" },
  { id: "2025004", fullName: "Maria Santos", email: "maria.santos@example.com", status: "Paid", paymentMethod: "E-Wallet" },
  { id: "2025005", fullName: "Juan Dela Cruz", email: "juan.delacruz@example.com", status: "Pending", paymentMethod: "Cash" },
  { id: "2025006", fullName: "Anna Reyes", email: "anna.reyes@example.com", status: "Pending", paymentMethod: "E-Wallet" },
  { id: "2025007", fullName: "Carlos Mendoza", email: "carlos.mendoza@example.com", status: "Paid", paymentMethod: "Cash" },
  { id: "2025008", fullName: "Luis Garcia", email: "luis.garcia@example.com", status: "Pending", paymentMethod: "E-Wallet" },
  { id: "2025009", fullName: "Sofia Torres", email: "sofia.torres@example.com", status: "Paid", paymentMethod: "Cash" },
  { id: "2025010", fullName: "Miguel Ramos", email: "miguel.ramos@example.com", status: "Pending", paymentMethod: "Cash" },
  { id: "2025011", fullName: "Isabella Cruz", email: "isabella.cruz@example.com", status: "Pending", paymentMethod: "E-Wallet" },
  { id: "2025012", fullName: "Javier Morales", email: "javier.morales@example.com", status: "Paid", paymentMethod: "Cash" },
];

export default function StickyColumnsTableDemo() {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState(initialPayments);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter payments by search
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.fullName.toLowerCase().includes(search.toLowerCase()) ||
      payment.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleStatusChange = (payment, status) => {
    setSelectedPayment(payment);
    setNewStatus(status);
    setIsDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (selectedPayment && newStatus) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === selectedPayment.id ? { ...p, status: newStatus } : p
        )
      );
    }
    setSelectedPayment(null);
    setNewStatus(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search input */}
      <Input
        placeholder="Search by ID, Name, or Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {/* Table */}
      <div className="grid w-full [&>div]:max-h-[300px] [&>div]:border [&>div]:rounded overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="[&>*]:whitespace-nowrap hover:bg-background">
              <TableHead className="pl-4 sticky left-0 bg-background z-10 min-w-[50px]">
                ID
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Method</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-hidden">
            {filteredPayments.length ? (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="group odd:bg-muted [&>td]:whitespace-nowrap [&>td]:hover:bg-blue-100 dark:[&>td]:hover:bg-blue-400"
                >
                  <TableCell className="pl-4 sticky left-0 bg-background group-odd:bg-muted group-hover:bg-blue-100 z-10">
                    {payment.id}
                  </TableCell>
                  <TableCell>{payment.fullName}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Select
                      value={payment.status}
                      onValueChange={(value) =>
                        handleStatusChange(payment, value)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "w-[120px] text-xs font-semibold border rounded",
                          payment.status === "Unpaid"
                            ? "border-red-500 text-red-500"
                            : payment.status === "Pending"
                            ? "border-yellow-500 text-yellow-500"
                            : payment.status === "Paid"
                            ? "border-green-500 text-green-500"
                            : "border-gray-500 text-gray-500"
                        )}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-white">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to set{" "}
              <span className="font-semibold">{selectedPayment?.fullName}</span>{" "}
              to{" "}
              <span className="font-semibold">{newStatus}</span> status?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
