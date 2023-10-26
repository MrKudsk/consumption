"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  data: Category[];
}

export function MainNav({
  className,
  data,
  ...props
}: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();
  
  // console.log("PathName: ", pathname);
  // console.log("Params: ", params); 

  const dynRoutes = data.map((category) => ({
    href: `/${params.propertyId}/measurement/${category.id}`,
    label: category.name,
    active: pathname === `/${params.propertyId}/measurement/${category.id}`,
  }));
  //console.log(dynRoutes);
  
  const routes = [
    {
      href: `/${params.propertyId}`,
      label: 'Overview',
      active: pathname === `/${params.propertyId}`,
    },
    {
      href: `/${params.propertyId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.propertyId}/categories`,
    },
    {
      href: `/${params.propertyId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.propertyId}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {dynRoutes.map((route) => (
        <Link
        key={route.href}
        href={route.href}
        className={cn("text-sm font-medium transition-colors hover:text-primary",
        route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}
      >
        {route.label}
      </Link>        ))}
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary",
          route.active ? 'text-black dark:text-white' : 'text-muted-foreground')}
        >
          {route.label}
        </Link>  
      ))}
    </nav>
  )
}