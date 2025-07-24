/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/VerifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createArticle = async (payload: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/articles`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("ARTICLE");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getOwnAllArticles = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/getOwnArticles`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["BOOK"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllArticles = async (query?: {
  searchTerm?: string;
  tag?: string;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append("searchTerm", query.searchTerm);
  }
  if (query?.tag && query.tag !== "all") {
    params.append("tag", query.tag);
  }
console.log(`${process.env.NEXT_PUBLIC_BASE_API}/articles?${params.toString()}`);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["ARTICLE"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleArticle = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["ARTICLE"],
        },
      }
    );
    revalidateTag("ARTICLE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteArticle = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("ARTICLE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const summarizeArticle = async (id: string) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/articles/summarize-article/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("ARTICLE");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
