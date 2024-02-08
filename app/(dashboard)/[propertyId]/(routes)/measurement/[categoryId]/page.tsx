import prismadb from "@/lib/prismadb";
import { MeasurementsClient } from "./components/client";
import { MeasurementColumn } from "./components/columns";
import { format } from "date-fns";
import { digiFormatter } from "@/lib/utils";

const MeasurementPage = async ({
  params
}: {
  params: { propertyId: string, categoryId: string}
}) => {
  const measurements = await prismadb.measurement.findMany({
    where: {
      propertyId: params.propertyId,
      categoryId: params.categoryId,
    },
    orderBy: {
      date: 'desc',
    }
  });

  const formattedMeasurements: MeasurementColumn[] = measurements.map((item) => ({
    id: item.id,
    date: format(item.date, "yyyy-MM-dd"),
    measurement: digiFormatter.format(item.measurement.toNumber()),
    consumption: digiFormatter.format(item.consumption.toNumber()),
    createdAt: format(item.createdAt, "dd. MMM yyyy"),
  }));

  console.log("Page");
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MeasurementsClient data={formattedMeasurements} />
      </div>
    </div>
   );
}
 
export default MeasurementPage;