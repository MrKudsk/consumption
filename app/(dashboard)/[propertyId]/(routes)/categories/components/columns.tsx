"use client"

import { ColumnDef } from "@tanstack/react-table";


export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",    
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
];