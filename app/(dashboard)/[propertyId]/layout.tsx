import NavBar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { propertyId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const property = await prismadb.property.findFirst({
    where: {
      id: params.propertyId,
      userId
    }
  });

  if (!property) {
    redirect('/');
  }

  return (
    <>
      <NavBar propertyId={params.propertyId} />
      {children}
    </>
  );
};