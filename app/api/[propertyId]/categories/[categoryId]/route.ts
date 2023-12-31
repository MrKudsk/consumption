import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string, propertyId: string } }
) {
  try {    
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_GET', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, propertyId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const propertyById = await prismadb.property.findFirst({
      where: {
        id: params.propertyId,
      }
    });

    if (!propertyById) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_DELETE', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, propertyId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

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

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        propertyId: params.propertyId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORY_PATCH', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};