/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { deleteArticle } from "@/services/Article";

const DeleteModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (id) {
        const res = await deleteArticle(id);
        if (res.success) {
          toast.success(
            status === "Upcoming"
              ? "Booking cancelled successfully"
              : "Booking deleted successfully"
          );
          setOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
      toast.error("Failed to process your request");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            <DialogTitle className="text-lg font-semibold">
              Delete Article
            </DialogTitle>

            <DialogDescription className="text-gray-600">
              Are you sure you want to delete this article?
              <br />
              This action cannot be undone.
            </DialogDescription>

            <div className="w-full pt-4 flex justify-center gap-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Article
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
