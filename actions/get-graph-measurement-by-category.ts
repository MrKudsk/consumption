import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphMeasurementByCategory = async (categoryId: string) => {
  const measurements = await prismadb.$queryRawUnsafe(`select * from consumptionbycategorymonth`);



  console.log("test");
  console.log("get", measurements);
  
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "Maj", total: 15 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 10 },
    { name: "Aug", total: 20 },
    { name: "Sep", total: 0 },
    { name: "Okt", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 10 },
  ];

  return graphData;
};