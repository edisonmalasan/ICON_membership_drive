"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

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
    { id: "2025017", fullName: "Valeria Gutierrez", email: "valeria.gutierrez@example.com", status: "Pending" },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const markComplete = (id) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status: "Done" } : payment
      )
    );
    setIsDialogOpen(false);
    setSelectedPayment(null);
  };

  const handleConfirmClick = (payment) => {
    setSelectedPayment(payment);
    setIsDialogOpen(true);
  };

  // Filtering logic
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.fullName.toLowerCase().includes(search.toLowerCase()) ||
      payment.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayedPayments = filteredPayments.slice(0, 10);

  return (
    <div className="w-full flex flex-col gap-4 px-4 sm:px-8 md:px-16 text-sm sm:text-base md:text-lg">
      <div className="flex flex-row flex-wrap gap-3 justify-between items-center w-full">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[150px] text-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] text-sm">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800">
        <Table className="w-full min-w-[600px] table-auto">
          <TableHeader className="sticky top-0 z-10 bg-neutral-900">
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
                <TableRow
                  key={payment.id}
                  className="text-md hover:bg-neutral-800 transition-colors"
                >
                  <TableCell className="px-3 py-2 font-medium">
                    {payment.id}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    {payment.fullName}
                  </TableCell>
                  <TableCell className="px-3 py-2">{payment.email}</TableCell>
                  <TableCell className="px-3 py-2 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded text-md ${payment.status === "Done"
                          ? "bg-green-500 text-white"
                          : "bg-[#F29339] text-black"
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
                        onClick={() => handleConfirmClick(payment)}
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
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-white text-base"
                >
                  No payment submissions or no search results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Are you sure{" "}
              <span className="font-semibold">
                {selectedPayment?.fullName}
              </span>{" "}
              has submitted a payment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => markComplete(selectedPayment?.id)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
