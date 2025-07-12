import { Contents } from "@/components/contents";
import { Flex } from "@/components/flex";
import { Header } from "@/components/header";
import { Heading } from "@/components/heading";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import { Check, Pen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const breadcrumbItems = [{ label: "Subtitle Histories", href: "/histories" }];

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />

      <Contents>
        <Heading as="h2">Subtitle Histories</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subtitle data</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              "History 1",
              "History 2",
              "History 3",
              "History 4",
              "History 5",
              "History 6",
              "History 7",
            ].map((history) => (
              <TableRow key={history}>
                <TableCell>
                  <Link href="/histories/1">{history}</Link>
                </TableCell>
                <TableCell>
                  <Flex gap="small" align="center" justify="end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <Pen className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-8 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Contents>
    </>
  );
}
