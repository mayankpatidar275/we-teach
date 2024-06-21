"use client";

import React from "react";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

function CreateCoursePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/publisher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex p-6 justify-center">
      <div>
        <h2 className="font-bold text-lg">Name your course</h2>
        <p>
          What would you like to name your course ? Don&apos; t worry you can
          always change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="eg web development course"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/"}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateCoursePage;
