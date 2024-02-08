import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { measurementId: string, categoryId: string, propertyId: string } }
) {
  try {

    return NextResponse.json(measurement);
  } catch (error) {
    console.log('MEASUREMENT_PATCH', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
