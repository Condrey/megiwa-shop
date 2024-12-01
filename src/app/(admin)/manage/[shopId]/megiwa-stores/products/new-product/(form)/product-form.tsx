"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { env } from "@/env";
import { upsertProductSchema, UpsertProductSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import cuid from "cuid";
import { MoreHorizontalIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import ProductInfo from "./(product-info)/product-info";
import AdvancedSetting from "./advanced-setting";
import Categories from "./categories";
import CustomText from "./custom-text";
import { Form } from "./default-imports";
import HireAProfessional from "./hire-a-professional";
import ImagesAndVideos from "./images-and-videos";
import InventoryAndShipping from "./inventory-and-shipping";
import MarketingAndSeo from "./marketing-and-seo";
import { useNewProductMutation } from "./mutation";
import PreOrder from "./pre-order";
import Pricing from "./pricing";
import ProductOptions from "./product-options";
import Subscriptions from "./subscriptions";
import Visibilities from "./visibilities";

export default function ProductForm() {
  const currency = "USh";
  const mutation = useNewProductMutation();
  const pathName = usePathname();
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    defaultValues: {
      id: undefined,
      name: "",
      ribbon: "",
      ribbons: [],
      description: "",
      discount: { type: "PERCENT", value: 0 },
      pricePerUnitData: undefined,
      costAndProfitData: {
        itemCost: 0,
        profit: 0,
        profitMargin: 0,
      },
      customTextFields: [],
      stock: {
        trackInventory: false,
        inventoryStatus: "IN_STOCK",
      },
      sku: undefined,
      shopId: cuid(),
      weight: undefined,
      visible: true,
      brand: undefined,
      additionalInfoSections: [],
      slug: "",
      productType: "PHYSICAL",
      weightRange: undefined,
      priceData: {
        currency,
        price: undefined,
        discountedPrice: 0,
        formatted: {
          price: "",
          discountedPrice: "",
        },
      },
      priceRange: undefined,
      costRange: undefined,
      manageVariants: false,
      productOptions: [],
      productPageUrl: {
        base: baseUrl,
        path: pathName,
      },
      numericId: "",
      collectionIds: [],
      variants: [],
    },
  });
  const watchedName = form.watch("name");

  function onSubmit(input: UpsertProductSchema) {
    mutation.mutate(input);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="size-full px-4 max-w-[80rem] mx-auto"
      >
        <header className="flex z-20 sticky py-4 top-0 bg-sidebar-content-background h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
              <Button type="button" variant={"ghost"} size={"icon"}>
                <MoreHorizontalIcon />
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            </div>
          </div>
        </header>

        <div className="size-full  grid lg:grid-cols-3 gap-4 py-4 pt-0 *:flex-1">
          <div className="lg:col-span-2 w-full auto-cols-max   flex flex-col gap-8">
            <ImagesAndVideos form={form} />
            <ProductInfo form={form} />
            <Pricing form={form} />
            <CustomText form={form} />
            <ProductOptions form={form} />
            <InventoryAndShipping form={form} />
            <PreOrder form={form} />
            <Subscriptions form={form} />
          </div>
          <div className="lg:col-span-1 flex auto-cols-max  flex-col gap-8 w-full ">
            {/* <pre>{JSON.stringify(form.watch(form), null, 2)}</pre> */}
            <pre className="text-destructive  ">
              {JSON.stringify(form.formState.errors, null, 2)}
            </pre>
            <Visibilities form={form} />
            <Categories form={form} />
            <MarketingAndSeo form={form} />
            <AdvancedSetting form={form} />
            <HireAProfessional />
          </div>
        </div>
      </form>
    </Form>
  );
}
