"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AddProductButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PlusIcon /> New Product
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-sm py-2">
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: pathname + "/new-product",
              query: { ...queryObject, productType: "physical" },
            }}
          >
            <div className="px-2">
              <h6>Physical Product</h6>
              <p className="text-muted-foreground">
                e.g t-shirt, shoes, or trousers.
              </p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={{
              pathname: pathname + "/new-product",
              query: { ...queryObject, productType: "digital" },
            }}
          >
            <div className="px-2">
              <h6>Digital file</h6>
              <p className="text-muted-foreground">
                e.g eBook, printable, or digital album
              </p>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
