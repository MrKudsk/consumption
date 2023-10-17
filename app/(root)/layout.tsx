import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const property = await prismadb.property.findFirst({
    where: {
      userId,
    }
  });

  if (property) {
    redirect(`/${property.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};