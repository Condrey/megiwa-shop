import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./default-imports";

interface CategoriesProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Categories({ form }: CategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>{/* TODO: Display the various categories. */}</CardContent>
      <CardFooter>
        <Button type="button" variant="ghost" className="text-primary">
          <PlusIcon className="mr-2 size-4" />
          <span>Create category</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
