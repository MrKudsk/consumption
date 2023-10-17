import prismadb from "@/lib/prismadb";

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
    }
  });

  return ( 
    <div>
      Active Property is {property?.name}
    </div>
   );
}
 
export default DashboardPage;