import prismadb from "@/lib/prismadb";

export const getMeasurementByCategory = async (categoryId: string) => {
  const measurements = await prismadb.measurement.findMany({
    where: {
      categoryId,
    }
  });

  const totalMeasurement = measurements.reduce((total, item) => {
    return total + item.consumption.toNumber();
  }, 0); 

  //console.log("get", categoryId, totalMeasurement);
  return totalMeasurement;
};