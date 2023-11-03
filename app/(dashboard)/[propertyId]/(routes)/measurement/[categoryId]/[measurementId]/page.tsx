import prismadb from "@/lib/prismadb";
import MeasurementForm from "./components/measurement-form";

const MeasurementPage = async ({
  params
}: {
  params: { measurementId: string }
}) => {
  const measurement = await prismadb.measurement.findUnique({
    where: {
      id: params.measurementId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <MeasurementForm initialData={measurement} />
      </div>
    </div>
   );
}
 
export default MeasurementPage;