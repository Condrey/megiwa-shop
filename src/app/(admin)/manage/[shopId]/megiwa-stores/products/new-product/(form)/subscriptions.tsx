import avatarUrl from "@/assets/avatar/subscription.png";
import { UpsertProductSchema } from "@/lib/validation";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./default-imports";

interface SubscriptionsProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Subscriptions({ form }: SubscriptionsProps) {
  // TODO: do not forget to manage subscriptions
  return (
    <Card className="flex gap-4 justify-between ">
      <div className=" ">
        <CardHeader className="basis-2/3">
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>
            Easily offer your products on a recurring basis with subscriptions.
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <Button type="button" className="w-fit">
            <PlusIcon className="mr-2 size-4" />
            <span>Create subscription</span>
          </Button>
        </CardHeader>
      </div>
      <CardHeader className="basis-1/3">
        <Image
          src={avatarUrl}
          height={150}
          width={150}
          alt="subscription avatar"
        />
      </CardHeader>{" "}
    </Card>
  );
}
