import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { propertyId: string }}
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();

      const { name } = body;

      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }

      if (!name) {
        return new NextResponse("Name is required!", { status: 400 });
      }
      
      if (!params.propertyId) {
        return new NextResponse("Property id is required", { status: 400 });
      }
      
      const property = prismadb.property.updateMany({
        where: {
          id: params.propertyId,
        },
        data: {
          name
        }
      });

      return NextResponse.json(property);
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
      
      const property = prismadb.property.deleteMany({
        where: {
          id: params.propertyId,
        }
      });

      return NextResponse.json(property);
    } catch (error) {
      console.log('[PROPERTY_DELETE]', error);
      return new NextResponse("Internal error", {status: 500});
    }
};
