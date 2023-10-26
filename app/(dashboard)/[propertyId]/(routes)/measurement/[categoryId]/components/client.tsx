"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { MeasurementColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface MeasurementsClientProps {
  data: MeasurementColumn[];
}

export const MeasurementsClient: React.FC<MeasurementsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Measurements (${data.length})`}
          description="Manage measurements for your property."
        />
        <Button onClick={() => router.push(`/${params.propertyId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="date" columns={columns} data={data} />
    </>
  )
};