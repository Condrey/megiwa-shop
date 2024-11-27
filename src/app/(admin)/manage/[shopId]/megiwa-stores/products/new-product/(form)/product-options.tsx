import avatarUrl from "@/assets/avatar/product-options.png";
import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./default-imports";

interface ProductOptionsProps {
  form: UseFormReturn<UpsertProductSchema>;
}
// TODO: implement the pop up dialog
export default function ProductOptions({ form }: ProductOptionsProps) {
  return (
    <Card className="flex flex-row justify-between gap-4">
      <div className="flex flex-col basis-2/3">
        <CardHeader>
          <CardTitle>Product options</CardTitle>
          <CardDescription>
            Does your product come in different options, like size, color or
            material? Add them here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button">
            <PlusIcon className="mr-2 size-4" />
            <span>Add options</span>
          </Button>
        </CardContent>
      </div>
      <CardHeader className="basis-1/3">
        <Image
          src={avatarUrl}
          alt="product_options_avatar"
          height={150}
          width={150}
        />
      </CardHeader>
    </Card>
  );
}
