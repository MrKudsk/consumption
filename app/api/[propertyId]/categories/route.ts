import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;
    console.log('Name: ', name);
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        propertyId: params.propertyId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { propertyId: string } }
) {
  try {    
    if (!params.propertyId) {
      return new NextResponse("Property id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        id: params.propertyId,
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};