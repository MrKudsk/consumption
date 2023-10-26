"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";


export type MeasurementColumn = {
  id: string;
  date: string;
  measurement: string;
  consumption: string;
  createdAt: string;
}

export const columns: ColumnDef<MeasurementColumn>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }, 
  },
  {
    accessorKey: "measurement",
    header: "Måling",
  },
  {
    accessorKey: "consumption",
    header: "Forbrug",
  },
  {
    accessorKey: "createdAt",
    header: "Created at date",
  }
];