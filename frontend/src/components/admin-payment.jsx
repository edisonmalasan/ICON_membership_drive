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
import { cn } from "@/lib/utils";

export default function AdminPaymentComponent() {
  const initialPayments = [
    { id: "2025003", fullName: "Jane Doe", email: "jane.doe@example.com", status: "Pending", paymentMethod: "Cash", course: "CS", year: "1st" },
    { id: "2025004", fullName: "Maria Santos", email: "maria.santos@example.com", status: "Paid", paymentMethod: "E-Wallet", course: "IT", year: "2nd" },
    { id: "2025005", fullName: "Juan Dela Cruz", email: "juan.delacruz@example.com", status: "Pending", paymentMethod: "Cash", course: "CS", year: "3rd" },
    { id: "2025006", fullName: "Anna Reyes", email: "anna.reyes@example.com", status: "Pending", paymentMethod: "E-Wallet", course: "IT", year: "1st" },
    { id: "2025007", fullName: "Carlos Mendoza", email: "carlos.mendoza@example.com", status: "Paid", paymentMethod: "Cash", course: "CS", year: "2nd" },
    { id: "2025008", fullName: "Luis Garcia", email: "luis.garcia@example.com", status: "Pending", paymentMethod: "E-Wallet", course: "IT", year: "3rd" },
    { id: "2025009", fullName: "Sofia Torres", email: "sofia.torres@example.com", status: "Paid", paymentMethod: "Cash", course: "CS", year: "1st" },
    { id: "2025010", fullName: "Miguel Ramos", email: "miguel.ramos@example.com", status: "Pending", paymentMethod: "Cash", course: "IT", year: "2nd" },
    { id: "2025011", fullName: "Isabella Cruz", email: "isabella.cruz@example.com", status: "Pending", paymentMethod: "E-Wallet", course: "CS", year: "3rd" },
    { id: "2025012", fullName: "Javier Morales", email: "javier.morales@example.com", status: "Paid", paymentMethod: "Cash", course: "IT", year: "1st" },
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");

  // Filters
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const confirmStatusChange = () => {
    if (selectedPayment && newStatus) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === selectedPayment.id ? { ...p, status: newStatus } : p
        )
      );
    }
    setIsDialogOpen(false);
    setSelectedPayment(null);
    setNewStatus(null);
  };

  const handleStatusChange = (payment, nextStatus) => {
    setSelectedPayment(payment);
    setNewStatus(nextStatus);
    setIsDialogOpen(true);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.fullName.toLowerCase().includes(search.toLowerCase()) ||
      payment.email.toLowerCase().includes(search.toLowerCase());

    const matchesCourse =
      filterCourse === "All" ? true : payment.course === filterCourse;

    const matchesYear =
      filterYear === "All" ? true : payment.year === filterYear;

    const matchesStatus =
      filterStatus === "All" ? true : payment.status === filterStatus;

    return matchesSearch && matchesCourse && matchesYear && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-4 px-4 sm:px-8 md:px-16 text-sm sm:text-base md:text-lg">
      <div className="flex flex-col w-full mb-2">
        <label className="text-sm font-medium mb-1">Search</label>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[150px] h-10 text-sm"
        />
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-start items-end mt-2">
        {/* Course Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Course</label>
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-[150px] h-10 text-sm">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Year Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Year</label>
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-[150px] h-10 text-sm">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="1st">1st</SelectItem>
              <SelectItem value="2nd">2nd</SelectItem>
              <SelectItem value="3rd">3rd</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] h-10 text-sm">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800 mt-2">
        <Table className="w-full min-w-[700px] table-auto p-5">
          <TableHeader>
            <TableRow className="[&>*]:whitespace-nowrap hover:bg-background">
              <TableHead className="w-[120px] sticky left-0 z-10">ID</TableHead>
              <TableHead className="w-[200px]">Full Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px] text-center">Payment Method</TableHead>
              <TableHead className="w-[75px] text-center">Course</TableHead>
              <TableHead className="w-[75px] text-center">Year</TableHead>
              <TableHead className="w-[150px] text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {filteredPayments.length ? (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="text-md transition-colors"
                >
                  <TableCell className="px-3 py-2">{payment.id}</TableCell>
                  <TableCell className="px-3 py-2">{payment.fullName}</TableCell>
                  <TableCell className="px-3 py-2">{payment.email}</TableCell>
                  <TableCell className="px-3 py-2 text-center">{payment.paymentMethod}</TableCell>
                  <TableCell className="px-3 py-2 text-center">{payment.course}</TableCell>
                  <TableCell className="px-3 py-2 text-center">{payment.year}</TableCell>
                  <TableCell className="px-3 py-2 text-center">
                    <div className="flex justify-center">
                      <Select
                        value={payment.status}
                        onValueChange={(value) => handleStatusChange(payment, value)}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-[120px] h-10 text-xs font-semibold border-1",
                            payment.status === "Unpaid"
                              ? "border-red-600 text-red-600"
                              : payment.status === "Pending"
                                ? "border-yellow-600 text-yellow-600"
                                : payment.status === "Paid"
                                  ? "border-green-600 text-green-600"
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
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-white text-base">
                  No payment submissions or no search results found.
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
              <span className="font-semibold text-white">{newStatus}</span>{" "}
              status?
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
