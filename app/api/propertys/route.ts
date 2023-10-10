import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    console.log("Start api/property");
    const { userId } = auth();
    const body = await req.json();
    console.log('Body, ', body);
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403});
    }
 
    if (!name) {
      return new NextResponse("Name is required", { status: 400});
    }

    const property = await prismadb.property.create({
      data: {
        name,
        userId,
      }
    });
    
    return NextResponse.json(property);
  } catch (error) {
    console.log('[PROPERTY_POST]', error);
    return new NextResponse("Interal error", {status: 500});
  }
}