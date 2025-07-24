"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { getSingleArticle } from "@/services/Article";
import { IArticle } from "@/types/article";



const ViewArticle = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return; 

    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await getSingleArticle(id);
        if (res.success) {
          setArticle(res.data);
        } else {
          setArticle(null);
        }
      } catch {
        setArticle(null);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            {loading ? "Loading..." : article?.title || "No Title"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="prose max-w-none">
            {loading ? (
              <p>Loading content...</p>
            ) : (
              <p className="text-gray-700 whitespace-pre-line">
                {article?.body || "No content available."}
              </p>
            )}
          </div>

          {!loading && article?.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
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

export default ViewArticle;
