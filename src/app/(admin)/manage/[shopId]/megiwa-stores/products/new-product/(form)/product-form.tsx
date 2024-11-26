"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { upsertProductSchema, UpsertProductSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import cuid from "cuid";
import { MoreHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "./default-imports";
import ImagesAndVideos from "./images-and-videos";
import Pricing from "./pricing";
import ProductInfo from "./product-info";

export default function ProductForm() {
  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      id: cuid(),
      name: "",
    },
  });
  const watchedName = form.watch("name");

  return (
    <section className="size-full px-4 max-w-[100rem] mx-auto">
      <header className="flex sticky py-4 top-0 bg-sidebar-content-background h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {/* TODO: figure out this link  */}
                  <BreadcrumbLink href="">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <Separator orientation="vertical" />
                <BreadcrumbItem className="hidden md:block">
                  {!watchedName ? " Untitled product" : watchedName}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="gap-4  items-center flex">
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontalIcon />
            </Button>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </header>
      <Form {...form}>
        <form className="size-full  grid lg:grid-cols-3 gap-4 py-4 pt-0 *:flex-1">
          <div className="lg:col-span-2 w-full auto-cols-max   flex flex-col gap-4">
            <ImagesAndVideos form={form} />
            <ProductInfo form={form} />
            <Pricing form={form} />
          </div>
          <div className="lg:col-span-1 flex auto-cols-max "></div>
        </form>
      </Form>
    </section>
  );
}
