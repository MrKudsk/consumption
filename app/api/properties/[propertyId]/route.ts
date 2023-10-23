import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { propertyId: string }}
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();

      const { name } = body;
      console.log("Update ", params.propertyId, name);
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }

      if (!name) {
        return new NextResponse("Name is required!", { status: 400 });
      }
      
      if (!params.propertyId) {
        return new NextResponse("Property id is required", { status: 400 });
      }
      
      const updateProperty = await prismadb.property.update({
        where: {
          id: params.propertyId,
        },
        data: {
          name,
        },
      });
      console.log("Prisma: ", updateProperty);
      return NextResponse.json(updateProperty);
    } catch (error) {
      console.log('[PROPERTY_PATCH]', error);
      return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE(
  req: Request,
  { params }: { params: { propertyId: string }}
  ) {
    try {
      const { userId } = auth();
      console.log("Delete ", params.propertyId);
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }

      if (!params.propertyId) {
        return new NextResponse("Property id is required", { status: 400 });
      }
      
      const property = await prismadb.property.delete({
        where: {
          id: params.propertyId,
        },
      });

      return NextResponse.json(property);
    } catch (error) {
      console.log('[PROPERTY_DELETE]', error);
      return new NextResponse("Internal error", {status: 500});
    }
};
