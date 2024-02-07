import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  varme: number;
  vand: number;
  el: number;
}

export const getGraphMeasurementByCategory = async (categoryId: string) => {
  const measurements = await prismadb.$queryRawUnsafe(`select * from consumptionbycategorymonth`);

  const montlyData1: { [key: number]: number} = {};
  const montlyData2: { [key: number]: number} = {};
  const montlyData3: { [key: number]: number} = {};

  console.log("test");
  console.log("get", measurements);
  
  for (const mesure of measurements) {
    const month = mesure.yearmonth.getMonth();
    let consumption = 0;

    if (mesure.category == 'Fjernvarme') {
      montlyData1[month] = mesure.consumption.toNumber();
  }
  if (mesure.category == 'Vand') {
    montlyData2[month] = mesure.consumption.toNumber();
}  if (mesure.category == 'El') {
  montlyData3[month] = mesure.consumption.toNumber();
}
}

  const graphData: GraphData[] = [
    { name: "Jan", varme: 0, vand: 0, el: 0 },
    { name: "Feb", varme: 0, vand: 0, el: 0 },
    { name: "Mar", varme: 0, vand: 0, el: 0 },
    { name: "Apr", varme: 0, vand: 0, el: 0 },
    { name: "Maj", varme: 15, vand: 10, el: 0 },
    { name: "Jun", varme: 0, vand: 0, el: 10 },
    { name: "Jul", varme: 10, vand: 0, el: 0 },
    { name: "Aug", varme: 20, vand: 10, el: 0 },
    { name: "Sep", varme: 0, vand: 10, el: 10 },
    { name: "Okt", varme: 0, vand: 0, el: 0 },
    { name: "Nov", varme: 0, vand: 0, el: 0 },
    { name: "Dec", varme: 10, vand: 0, el: 0 },
  ];

  for (const month in montlyData1) {
    graphData[parseInt(month)].varme = montlyData1[parseInt(month)];
  }

  for (const month in montlyData2) {
    graphData[parseInt(month)].vand = montlyData2[parseInt(month)];
  }

  for (const month in montlyData3) {
    graphData[parseInt(month)].el = montlyData3[parseInt(month)];
  }

  return graphData;
};