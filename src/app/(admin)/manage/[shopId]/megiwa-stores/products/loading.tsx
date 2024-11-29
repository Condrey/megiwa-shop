import DataTableLoadingSkeleton from "@/components/ui/data-table-loading-skeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <header className="flex h-16 shrink-0  items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Skeleton className="size-8 bg-card" />
          <Separator orientation="vertical" className="mr-2 h-4 " />
          <Skeleton className="h-8 w-32 bg-card" />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex gap-4 justify-between items-center">
          <Skeleton className="h-10 w-24 bg-card" />
          <div className="gap-4 items-center flex">
            <Skeleton className="w-24 h-10  bg-card" />
            <Skeleton className="w-24 h-10 bg-card" />
          </div>
        </div>

        <DataTableLoadingSkeleton />
      </div>
    </>
  );
}
