"use client";

import { useEffect, useState } from "react";
import api from "@/api/axios";
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
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { BarChart, Bar, XAxis, YAxis, Area, AreaChart, CartesianGrid, Cell } from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

export default function Dashboard() {
    const [courseData, setCourseData] = useState([]);
    const [chartConfig, setChartConfig] = useState({});
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [paidCount, setPaidCount] = useState(0);

    // Fetch members for Chart 1
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await api.get("/members", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const members = res.data;
                const counts = {};
                members.forEach((m) => {
                    counts[m.course] = (counts[m.course] || 0) + 1;
                });

                // Build chart data with colors
                const colors = [
                    "var(--chart-1)",
                    "var(--chart-2)",
                    "var(--chart-3)",
                    "var(--chart-4)",
                    "var(--chart-5)",
                ];

                const chartData = Object.keys(counts).map((course, idx) => ({
                    course,
                    members: counts[course],
                    fill: colors[idx % colors.length],
                }));

                const config = {
                    members: { label: "Members" },
                };
                chartData.forEach((d, i) => {
                    config[d.course] = {
                        label: d.course,
                        color: colors[i % colors.length],
                    };
                });

                setCourseData(chartData);
                setChartConfig(config);
            } catch (error) {
                console.error("Failed to fetch members:", error);
            }
        };

        fetchMembers();
    }, []);


    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await api.get("/payments?filter[status]=Paid", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const payments = res.data;

                const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

                const count = payments.length;

                setTotalEarnings(total);
                setPaidCount(count);
            } catch (error) {
                console.error("Failed to fetch payments:", error);
            }
        };

        fetchPayments();
    }, []);

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
                                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="bg-muted/50 aspect-video rounded-xl p-4 flex flex-col items-center justify-center">
                                {courseData.length > 0 ? (
                                    <div className="flex flex-col items-center justify-between w-full h-full">
                                        <p className="text-lg font-semibold text-muted-foreground mb-2">
                                            Members per Course
                                        </p>
                                        <div className="flex flex-1 items-center justify-center w-full">
                                            <ChartContainer
                                                config={chartConfig}
                                                className="w-[90%] h-full flex items-center justify-center"
                                            >
                                                <BarChart data={courseData}>
                                                    <XAxis dataKey="course" />
                                                    <YAxis />
                                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                                    <Bar dataKey="members">
                                                        {courseData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ChartContainer>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm text-center">
                                        Loading member data...
                                    </p>
                                )}
                            </div>
                            {/* Chart 2 - Total Earnings */}
                            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center text-muted-foreground font-medium p-6">
                                <p className="text-lg text-muted-foreground">Total Earnings</p>
                                <p className="text-4xl font-bold text-primary mt-2">
                                    ₱{totalEarnings.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Based on {paidCount} successful transactions
                                </p>
                            </div>

                            {/* Chart 3 - Placeholder */}
                            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center text-muted-foreground font-medium">
                                Placeholder Chart 3
                            </div>

                        </div>
                        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                    </div>
                </SidebarInset>
            </SidebarProvider >
        </ThemeProvider >
    );
}
