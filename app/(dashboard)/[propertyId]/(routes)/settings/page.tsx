import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SettingsFrom } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { propertyId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const property = await prismadb.property.findFirst({
    where: {
      id: params.propertyId
    }
  });

  if (!property) {
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsFrom initialData={property} />
      </div>
    </div>
  );
};
 
export default SettingsPage;