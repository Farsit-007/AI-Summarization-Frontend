import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IArticle } from "@/types/article";

import ViewArticle from "./ViewArticle";
import SummarizeArticle from "./SummarizeArticle";

export function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Card className="w-full max-w-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {article.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 line-clamp-3">
          {article.body}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <ViewArticle id={article.id!}/>
         <SummarizeArticle article={article}/>
      </CardFooter>
    </Card>
  );
}
