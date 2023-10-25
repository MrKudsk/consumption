import prismadb from "@/lib/prismadb";

interface MeasurementData {
  [key: string]: number;
}

export const getMeasurement = async (propertyId: string): Promise<MeasurementData> => {
  const measurements = await prismadb.measurement.findMany({
    where: {
      propertyId,
    },
    orderBy: {
      categoryId: 'asc',
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      propertyId,
    }
  });
  
  var measurementData: MeasurementData = {};
  for (const category of categories) {
     measurementData[category.id] = 0;
  }

  for (const measurement of measurements) {
    //console.log(measurement.categoryId, measurement.consumption.toNumber());
    measurementData[ measurement.categoryId ] += measurement.consumption.toNumber();
  }
   
  return measurementData;
};