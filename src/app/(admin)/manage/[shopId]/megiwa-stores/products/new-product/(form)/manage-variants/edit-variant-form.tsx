import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TooltipContainer from "./../tooltip-container";

interface EditVariantFormProps {
  prop: string;
}

export default function EditVariantForm({ prop }: EditVariantFormProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>variant</TableHead>
          <TableHead>
            <TooltipContainer label="Price difference (+/-)">
              <p>
                Enter the difference between the base product price and the
                variant price (e.g., to lower the price by UGX500, enter -500).
              </p>
            </TooltipContainer>
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
}
