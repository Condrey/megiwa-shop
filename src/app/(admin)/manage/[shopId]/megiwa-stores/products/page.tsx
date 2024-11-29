import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { formatNumber } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { getAllProducts } from "./(table)/action";
import ListOfProducts from "./(table)/list-of-products";
import AddProductButton from "./add-product-button";

export default async function Page() {
  const products = await getAllProducts();
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                Products
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex gap-4 justify-between items-center">
          <h1 className="text-xl font-bold">
            Products{" "}
            <span className="text-muted-foreground">
              {formatNumber(products.length)}
            </span>
          </h1>
          <div className="gap-4 items-center flex">
            <Button variant="outline">
              More actions <ChevronDownIcon />
            </Button>
            <AddProductButton />
          </div>
        </div>

        <ListOfProducts products={products} />
      </div>
    </>
  );
}
