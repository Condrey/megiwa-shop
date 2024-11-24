import { getWixServerClient } from "@/lib/wix-client.server";
import { getProductById } from "@/wix-api/products";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const paramValue = await params;
  const searchParamsValue = await searchParams;
  if (paramValue.id === "someId") {
    redirect(
      `/products/i-m-a-product-1?${new URLSearchParams(searchParamsValue)}`
    );
  }

  const client = await getWixServerClient();
  const product = await getProductById(client, paramValue.id);

  if (!product) notFound();

  redirect(
    `/products/${product.slug}?${new URLSearchParams(searchParamsValue)}`
  );
}
