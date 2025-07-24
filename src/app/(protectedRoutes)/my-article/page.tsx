import Breadcrum from "@/components/modules/OwnArticle/Breadcrum";
import { ArticleCardWithActions } from "@/components/modules/OwnArticle/Card2";
import { getOwnAllArticles } from "@/services/Article";
import { IArticle } from "@/types/article";

const page = async() => {
 const { data: articles } = await getOwnAllArticles();
  return (
    <div>
      <Breadcrum />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {articles?.map((article : IArticle, index : number) => (
          <ArticleCardWithActions key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default page;
