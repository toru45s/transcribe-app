import Link from "next/link";

import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

type BreadcrumbProps = {
  items: {
    label: string;
    href: string;
  }[];
};

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        {items?.map((item, index) => (
          <Fragment key={item.label}>
            {index === 0 && <BreadcrumbSeparator className="ml-2" />}
            <BreadcrumbItem key={item.label}>
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
};
