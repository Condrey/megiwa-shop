import { Button } from "@/components/ui/button";
import { UpsertProductSchema } from "@/lib/validation";
import { ImagePlusIcon, VideotapeIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./default-imports";

interface ImagesAndVideosProps {
  form: UseFormReturn<UpsertProductSchema>;
}
export default function ImagesAndVideos({ form }: ImagesAndVideosProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Images and Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 ">
          <Button
            type="button"
            variant={"secondary"}
            className="flex  size-full mr-2 items-center justify-center gap-4"
          >
            <ImagePlusIcon />
            <span className="uppercase">Add images</span>
          </Button>
          <Button
            type="button"
            variant={"secondary"}
            className="flex  size-full ml-2 items-center justify-center gap-4"
          >
            <VideotapeIcon />
            <span className="uppercase">Add videos</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
