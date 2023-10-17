"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { usePropertyModal } from "@/hooks/use-property-modal";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const PropertyModal = () => {
  const propertyModal = usePropertyModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/propertys', values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Property"
      description="Add a new property to manage the consumption."
      isOpen={propertyModal.isOpen}
      onClose={propertyModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <div className="space-y-2">
            <Form {...form}> 
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="Højgårdshaven 13" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} variant="outline" onClick={propertyModal.onClose}>Cancel</Button>
                  <Button disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}