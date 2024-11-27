import avatarUrl from "@/assets/avatar/professional.png";
import Image from "next/image";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "./default-imports";

export default function HireAProfessional() {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-card-foreground font-bold">
          Hire a professional
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-start">
        <div className="flex flex-col gap-4">
          <span>
            {`Optimize your store's product pages with the help of an expert.`}
          </span>
          <Button
            type="button"
            variant={"link"}
            className="text-primary w-fit "
          >
            Get started
          </Button>
        </div>
        <Image
          src={avatarUrl}
          height={80}
          width={80}
          alt="professional avatar"
        />
      </CardContent>
    </Card>
  );
}
