"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MeasurementColumn } from "./columns";
import { Edit, MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: MeasurementColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
 
  console.log(params);
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/${params.propertyId}/measurement/${params.categoryId}/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4" />Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};
/*
export const CellAction = () => {
  return (
    <div>Action</div>
  );
};
*/