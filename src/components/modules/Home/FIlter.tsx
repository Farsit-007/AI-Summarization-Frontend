"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function ArticleFilters() {
  const { user, isLoading, setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableTags = [
    "all",
    "React",
    "Next.js",
    "JavaScript",
    "CSS",
    "TypeScript",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const search = searchParams.get("searchTerm") || "";
    const tag = searchParams.get("tag") || "all";

    setSearchTerm(search);
    setSelectedTag(tag);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    updateQuery("searchTerm", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    updateQuery("tag", selectedTag);
  }, [selectedTag]);

  const updateQuery = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(query);
    } else {
      params.set(query, value);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
  };

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
  };

  if (isLoading) return <div className="h-16">Loading...</div>;

  return (
    <div className="flex flex-col my-10 sm:flex-row gap-4 items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-1 gap-4 w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-md"
        />

        <Select value={selectedTag} onValueChange={handleTagChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by tag" />
          </SelectTrigger>
          <SelectContent>
            {availableTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag === "all" ? "All Tags" : tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            router.push(`${pathname}`, {
              scroll: false,
            });
          }}
          className="flex items-center gap-2 cursor-pointer bg-transparent"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {user ? (
        <div className="flex gap-2">
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/my-article">My Articles</Link>
          </Button>
          <Button
            variant="outline"
            className="border-black text-black cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-black text-white hover:bg-gray-800">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
