"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createArticle } from "@/services/Article";
import { articleFormSchema } from "./articleSchema";
import { IArticle } from "@/types/article";


const availableTags = ["React", "Next.js", "JavaScript", "CSS", "TypeScript"];

const CreateArticleForm = () => {
  const router = useRouter();
  const form = useForm<IArticle>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createArticle(data);
      console.log(res);
      if (res.success) {
        toast.success("Article published successfully!");
        router.push("/my-article");
      } else {
        toast.error(res.message || "Failed to publish article");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="w-[60%] min-w-[320px] mx-auto p-6 border border-gray-200 rounded-xl shadow-md bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your article title..."
                    {...field}
                    className="border border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Body Field */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your article content here..."
                    className="min-h-[200px] border border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Select Tags</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {availableTags.map((tag) => (
                    <FormField
                      key={tag}
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem
                          key={tag}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={field.value?.includes(tag)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, tag]);
                                } else {
                                  field.onChange(
                                    field.value.filter((t) => t !== tag)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {tag}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Publish Article</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateArticleForm;
