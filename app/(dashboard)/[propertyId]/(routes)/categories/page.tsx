import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

const CategoriesPage = async ({
  params
}: {
  params: { propertyId: string }
}) => {
  const categories = await prismadb.category.findMany({
    where: {
      propertyId: params.propertyId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  const formatedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "dd-MM-yyyy"),
  }));

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-5">
        <CategoriesClient data={formatedCategories} />
      </div>
    </div>
   );
};
 
export default CategoriesPage;