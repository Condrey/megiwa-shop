import LoadingButton from "@/components/LoadingButton";
import ResponsiveDrawer from "@/components/responsive-drawer";
import { UpsertProductSchema } from "@/lib/validation";
import { MonitorCogIcon, PuzzleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./default-imports";

interface MarketingAndSeoProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function MarketingAndSeo({ form }: MarketingAndSeoProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [link, setLink] = useState("#");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Marketing and SEO</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-start">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              // TODO: Set link for navigation
              setShowDialog(true);
            }}
          >
            <PuzzleIcon className="mr-2 " />
            <span>Create Coupon</span>
          </Button>
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              // TODO: Set link for navigation
              setShowDialog(true);
            }}
          >
            <MonitorCogIcon className="mr-2 " />
            <span>Edit SEO settings</span>
          </Button>
        </CardContent>
      </Card>

      <ResponsiveDrawer
        open={showDialog}
        setOpen={setShowDialog}
        title="Save your changes"
      >
        <p>
          Save the changes you made to this product and then come back to
          continue this action.
        </p>
        <div className="flex gap-4 justify-end items-center">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setShowDialog(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            type="button"
            onClick={() => {
              // TODO: handle form submission and navigate
              // TODO: Use mutation is pending for loading indicator
              setIsLoading(true);
              router.push(link);
            }}
          >
            Save and continue
          </LoadingButton>
        </div>
      </ResponsiveDrawer>
    </>
  );
}
