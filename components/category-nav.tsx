"use client"; 

import prismadb from "@/lib/prismadb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CategoryNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const [categories, setCategories] = useState([]);

  console.log("CateNav", params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await prismadb.category.findMany({
          where: {
            //propertyId: params.propertyId,
          }
        });
        console.log(categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('[CATEGORY_NAV] Error fetching categories: ', error);
      }
    };

    fetchData();  // Call the fecthData function when the component mounts.
  }, []);
  
  const propertyId = "test";
  console.log("CatNav", categories);

  const routes = [
    {
      href: `/${propertyId}`,
      label: 'Overview',
      active: pathname === `/${propertyId}`,
    },
  ];
/*
  const routes = categories.map((route) {
    href: `/measurement/${route.id}`,
    label: route.name,
    active: pathname === `/measurement/${route.id}`,
  }));
*/
  //console.log(routes);
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn("test-sm font-medium transition-colors hover:text-black", route.active ? 'text-black' : 'text-neutral-500')}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
};
