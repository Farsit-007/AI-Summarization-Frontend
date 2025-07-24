"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { IArticle } from "@/types/article";
import { summarizeArticle } from "@/services/Article";

const SummarizeArticle = ({ article }: { article: IArticle }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (open) {
      handleSummarize();
    } else {
      setSummary("");
    }
  }, [open]);

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const response = await summarizeArticle(article.id!);
      if (response.success) {
        setSummary(response.data.summary);
      } else {
        setSummary("Failed to generate summary. Please try again.");
      }
    } catch (error) {
      console.error("Summarization failed:", error);
      setSummary("Something went wrong while summarizing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
          <Sparkles className="h-4 w-4" />
          Summarize Article
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {article.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="mt-4 text-gray-600">Generating summary...</p>
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{summary}</p>
            </div>
          )}

          {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummarizeArticle;
