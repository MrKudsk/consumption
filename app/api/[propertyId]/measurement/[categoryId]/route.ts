
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { propertyId: string, categoryId: string }}
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { date, measurement, consumption } = body;

    console.log("BODY", body);
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!date) {
      return new NextResponse("Date is required", { status: 400 });
    }

    if (!params.propertyId) {
      return new NextResponse("Property id is required", { status: 400 });
    }

    const propertyById = await prismadb.property.findFirst({
      where: {
        id: params.propertyId,
      }
    });

    if (!propertyById) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const categoryByPropertyId = await prismadb.category.findFirst({
      where: {
        id: params.categoryId, 
        propertyId: params.propertyId,
      }
    });

    if (!categoryByPropertyId) {
      return new NextResponse("Category is not define.", { status: 400 });
    }

    const measurementData = await prismadb.measurement.create({
      data: {
        propertyId: params.propertyId,
        categoryId: params.categoryId,
        date,
        measurement,
        consumption,
      }
    });

    return NextResponse.json(measurementData);
  } catch (error) {
    console.log('[MEASURMENT_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};