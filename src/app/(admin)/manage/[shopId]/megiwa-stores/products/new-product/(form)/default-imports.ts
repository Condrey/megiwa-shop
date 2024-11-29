import { MeasurementEnumUnit } from "@prisma/client";
export { Label } from "@/components/ui/label";

export { Button } from "@/components/ui/button";
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export { Checkbox } from "@/components/ui/checkbox";
export {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export { Input } from "@/components/ui/input";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
export { Switch } from "@/components/ui/switch";
export { Textarea } from "@/components/ui/textarea";
export { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const groupedUnits = {
  Weight: [
    { unit: MeasurementEnumUnit.MG, label: "Milligram", abbreviation: "MG" },
    { unit: MeasurementEnumUnit.G, label: "Gram", abbreviation: "G" },
    { unit: MeasurementEnumUnit.KG, label: "Kilogram", abbreviation: "KG" },
    { unit: MeasurementEnumUnit.OZ, label: "Ounce", abbreviation: "OZ" },
    { unit: MeasurementEnumUnit.LB, label: "Pound", abbreviation: "LB" },
  ],
  Area: [
    {
      unit: MeasurementEnumUnit.SQM,
      label: "Square Meter",
      abbreviation: "SQM",
    },
    {
      unit: MeasurementEnumUnit.SQFT,
      label: "Square Foot",
      abbreviation: "SQFT",
    },
  ],
  Length: [
    { unit: MeasurementEnumUnit.MM, label: "Millimeter", abbreviation: "MM" },
    { unit: MeasurementEnumUnit.CM, label: "Centimeter", abbreviation: "CM" },
    { unit: MeasurementEnumUnit.M, label: "Meter", abbreviation: "M" },
    { unit: MeasurementEnumUnit.IN, label: "Inch", abbreviation: "IN" },
    { unit: MeasurementEnumUnit.FT, label: "Foot", abbreviation: "FT" },
    { unit: MeasurementEnumUnit.YD, label: "Yard", abbreviation: "YD" },
  ],
  Volume: [
    { unit: MeasurementEnumUnit.ML, label: "Milliliter", abbreviation: "ML" },
    { unit: MeasurementEnumUnit.CL, label: "Centiliter", abbreviation: "CL" },
    { unit: MeasurementEnumUnit.L, label: "Liter", abbreviation: "L" },
    {
      unit: MeasurementEnumUnit.CBM,
      label: "Cubic Meter",
      abbreviation: "CBM",
    },
    {
      unit: MeasurementEnumUnit.FLOZ,
      label: "Fluid Ounce",
      abbreviation: "FLOZ",
    },
    { unit: MeasurementEnumUnit.PT, label: "Pint", abbreviation: "PT" },
    { unit: MeasurementEnumUnit.QT, label: "Quart", abbreviation: "QT" },
    { unit: MeasurementEnumUnit.GAL, label: "Gallon", abbreviation: "GAL" },
  ],
  Unspecified: [
    {
      unit: MeasurementEnumUnit.UNSPECIFIED,
      label: "Unspecified",
      abbreviation: "-",
    },
  ],
};
