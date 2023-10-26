
import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import PropertySwitcher from "@/components/property-switcher";
import { redirect, useParams } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { CategoryNav } from "@/components/category-nav";

interface NavBarProps {
  propertyId: string;
}

const NavBar = async ({
  propertyId
}: NavBarProps) => {
  const { userId } = auth();

  console.log("NavBar", propertyId);

  if (!userId) {
    redirect('/sign-in');
  }

  const propertys = await prismadb.property.findMany({
    where: {
      userId,
    }
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <PropertySwitcher items={propertys}/>
        <CategoryNav className="mx-6"/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
      
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
};

export default NavBar;