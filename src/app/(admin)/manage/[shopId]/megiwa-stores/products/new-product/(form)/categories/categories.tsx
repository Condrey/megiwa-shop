import LoadingButton from "@/components/LoadingButton";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/utils";
import {
  upsertCollectionSchema,
  UpsertCollectionSchema,
  UpsertProductSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { debounce } from "lodash";
import { CheckIcon, Loader2, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../default-imports";
import { createFormCollection, fetchFormCollections } from "./action";

interface CategoriesProps {
  form: UseFormReturn<UpsertProductSchema>;
}

export default function Categories({ form }: CategoriesProps) {
  const [showInputField, setShowInputField] = useState(false);

  const watchedCollections = form.watch("collections");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "collections",
  });

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["form-collections"];

  const { status, data, refetch, isRefetching } = useQuery({
    queryKey: queryKey,
    queryFn: fetchFormCollections,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: createFormCollection,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueriesData<Collection[]>({
        queryKey,
      });

      queryClient.setQueryData<Collection[]>(queryKey, (oldData) => {
        if (!oldData) return [variables as Collection];
        return [...oldData, variables as Collection];
      });
      return { previousData };
    },
    onError(error, variables, context) {
      console.error(error);
      queryClient.setQueryData(queryKey, context?.previousData);
      toast({
        description: "Failed to add category",
        variant: "destructive",
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const form2: UseFormReturn<UpsertCollectionSchema> =
    useForm<UpsertCollectionSchema>({
      resolver: zodResolver(upsertCollectionSchema),
      defaultValues: {
        name: "",
        description: "",
        id: "",
        numberOfProducts: undefined,
        shopId: undefined,
        slug: "",
        visible: true,
      },
    });

  function removeInputField() {
    form2.reset();
    setShowInputField(false);
  }

  const debouncedSetSlug = debounce((value, form) => {
    form.setValue("slug", slugify(value));
  }, 300);

  function handleForm2Submit(input: UpsertCollectionSchema) {
    toast({ description: "Form Submission" });
    mutation.mutate(input, {
      onSuccess(data, variables, context) {
        append({
          ...data,
          numberOfProducts: data.numberOfProducts ?? 0,
        } as UpsertCollectionSchema);
        removeInputField();
      },
    });
  }

  function handleCollectionCheckChange(
    collection: Collection,
    checked: CheckedState
  ) {
    if (!watchedCollections) return;

    if (checked) {
      if (!watchedCollections.some((w) => w.id === collection.id)) {
        append({
          ...collection,
          numberOfProducts: collection.numberOfProducts ?? 0,
        } as UpsertCollectionSchema);
      }
    } else {
      const index = watchedCollections.findIndex((w) => w.id === collection.id);
      if (index !== -1) {
        remove(index);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        {/* <pre>{JSON.stringify(fields, null, 2)}</pre> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {status === "pending" ? (
          <div className=" flex gap-1 items-center text-muted-foreground">
            <Loader2 className="animate-spin size-4" />
            <span>Loading categories ...</span>
          </div>
        ) : status === "success" && !data.length ? (
          <p className="text-muted-foreground">
            There are no categories yet. Please add
          </p>
        ) : status === "error" ? (
          <div className="space-y-2 flex flex-col items-center justify-center">
            <p className="text-destructive text-center">
              An error occurred while fetching categories.
            </p>
            <LoadingButton
              loading={isRefetching}
              type="button"
              variant={"destructive"}
              onClick={() => refetch()}
            >
              Refetch
            </LoadingButton>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-3">
            {!!watchedCollections &&
              data.map((collection) => (
                <div className="flex items-center gap-2" key={collection.id}>
                  <Checkbox
                    name={collection.id}
                    id={collection.id}
                    checked={watchedCollections.some(
                      (f) => f.id === collection.id
                    )}
                    disabled={!collection.visible}
                    onCheckedChange={(checked) => {
                      handleCollectionCheckChange(collection, checked);
                    }}
                  />
                  <FormLabel htmlFor={collection.id} className="line-clamp-1">
                    {collection.name}
                  </FormLabel>
                </div>
              ))}
          </div>
        )}
        {showInputField && (
          <Form {...form2}>
            <form>
              <FormField
                control={form2.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row gap-1 items-center">
                        <Checkbox
                          checked
                          onCheckedChange={() => removeInputField()}
                        />
                        <Input
                          placeholder="e.g. shoes"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            debouncedSetSlug(e.target.value, form2);
                          }}
                        />
                        <Button
                          onClick={removeInputField}
                          type="button"
                          variant={"outline"}
                          size={"icon"}
                        >
                          <XIcon className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant={"outline"}
                          size={"icon"}
                          disabled={!field.value}
                          onClick={() =>
                            form2.handleSubmit(handleForm2Submit)()
                          }
                        >
                          <CheckIcon className="size-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        {/* {JSON.stringify(form2.formState.errors, null, 2)}
        {JSON.stringify(form2.watch(form2.getValues()), null, 2)} */}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="ghost"
          className="text-primary"
          onClick={() => setShowInputField(true)}
        >
          <PlusIcon className="mr-2 size-4" />
          <span>Create category</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
