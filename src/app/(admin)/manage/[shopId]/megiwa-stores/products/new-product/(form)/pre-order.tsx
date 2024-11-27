import { UpsertProductSchema } from "@/lib/validation";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
} from "./default-imports";

interface PreOrderProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function PreOrder({ form }: PreOrderProps) {
  // TODO: create a page for pre-order information
  return (
    <Card>
      <CardHeader className="flex gap-3 justify-between flex-row">
        <div>
          <CardTitle>Pre-order</CardTitle>
          <CardDescription>
            {`Let customers buy this product before it’s released or when it’s
              out of stock.`}
          </CardDescription>
          <Link href={`#`} className="text-primary hover:underline">
            Learn more about pre-order
          </Link>
        </div>
        <Switch />
      </CardHeader>
    </Card>
  );
}
