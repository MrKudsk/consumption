import prismadb from "@/lib/prismadb";

import { digiFormatter, formatter } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getMeasurementByCategory } from "@/actions/get-measurement-by-category";
import { getMeasurement } from "@/actions/get-measurement";
import { Overview } from "@/components/overview";
import { getGraphMeasurementByCategory } from "@/actions/get-graph-measurement-by-category";

interface DashboardPageProps {
  params: {
    propertyId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const property = await prismadb.property.findFirst({
    where: {
      id: params.propertyId
    },
    include: {
      categories: true
    }
  });

  //console.log(property);
  const measure = await getMeasurement(params.propertyId);
  const graphData = await getGraphMeasurementByCategory(params.propertyId);

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6" >
        <Heading title={`${property?.name}`}  description="Dashboard for the property" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          {property?.categories.map((category) =>(
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{digiFormatter.format(measure[category.id])}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
   );
}
 
export default DashboardPage;