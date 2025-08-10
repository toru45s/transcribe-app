import Link from "next/link";

import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/client/components/ui/breadcrumb";
import { Fragment } from "react";
import { Skeleton } from "./ui/skeleton";

type BreadcrumbProps = {
  items: {
    label: string;
    href: string;
  }[];
  isLoading?: boolean;
};

export const Breadcrumb = ({ items, isLoading }: BreadcrumbProps) => {
  return (
    <BreadcrumbUI className="pb-4">
      <BreadcrumbList>
        {items?.map((item, index) => (
          <Fragment key={item.label}>
            {index === items.length - 1 && isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              <>
                <BreadcrumbItem key={item.label}>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
};
