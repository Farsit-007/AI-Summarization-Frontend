"use client";

import React, { useEffect, useState } from "react";
import { getAllArticles } from "@/services/Article";
import { ArticleCard } from "./Card";
import { useSearchParams } from "next/navigation";
import { ArticleFilters } from "./FIlter";

export function ArticleContainer() {
  const searchParams = useSearchParams();

  // Extract query params
  const searchTerm = searchParams.get("searchTerm") || "";
  const tag = searchParams.get("tag") || "all";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);

      // Prepare query object, ignoring 'all' tag to avoid unnecessary filter
      const query: { [key: string]: string } = {};
      if (searchTerm) query.searchTerm = searchTerm;
      if (tag && tag !== "all") query.tag = tag;

      const res = await getAllArticles(query);
      if (res.success) {
        setArticles(res.data || []);
      } else {
        setArticles([]);
      }
      setLoading(false);
    }

    fetchArticles();
  }, [searchTerm, tag]);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div>
      <div>
        <ArticleFilters />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.length > 0 ? (
          articles.map((article, idx) => (
            <ArticleCard key={idx} article={article} />
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}
