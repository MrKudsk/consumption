"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

import { Measurement } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { CalendarIcon, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
 
const formSchema = z.object({
  date: z.date({required_error: "A date of measurement is required.", }),
  measurement: z.coerce.number(),
  consumption: z.coerce.number(),
});

type MeasurementFormValues = z.infer<typeof formSchema>

interface MeasurementFormProps {
  initialData: Measurement | null;
};

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit measurement' : 'Create measurement';
  const description = initialData ? 'Edit a measurement' : 'Add a new measurement';
  const toastMessage = initialData ? 'Measurement updated.' : 'Measurement created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
    measurement: parseFloat(String(initialData?.measurement)),
    consumption: parseFloat(String(initialData?.consumption)),
  } : {
    date: new Date(),
    measurement: '0.00',
    consumption: '0.00',
  };

  
  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: MeasurementFormValues) => {
    try {
      setLoading(true);
      // console.log("onSubmit");
      if (initialData) {
        await axios.patch(`/api/${params.propertyId}/measurement/${params.categoryId}/${params.measurementId}`, data);
      } else {
        //console.log('onSubmit data: ', data);
        await axios.post(`/api/${params.propertyId}/measurement/${params.categoryId}`, data);
      }
      router.refresh();
      router.push(`/${params.propertyId}/measurement/${params.categoryId}`);
      toast.success(toastMessage);     
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.propertyId}/measurement/${params.categoryId}/${params.measurementId}`);
      router.refresh();
      router.push(`/${params.propertyId}/measurement/${params.categoryId}`);
      toast.success('Measurement deleted.');     
    } catch (error: any) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading} 
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button 
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField 
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                       <FormControl>
                        <Button variant={"outline"}
                          className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="measurement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Measurement</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="The measurement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="consumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumption</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="The consumption" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
   );
}
 
export default MeasurementForm;