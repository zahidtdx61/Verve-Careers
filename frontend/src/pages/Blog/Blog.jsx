import LoadContent from "@/components/Loader/LoadContent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import placeholderImg from "/404.jpg";

const Blog = () => {
  const { id } = useParams();
  const { data: blog, isLoading: blogLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await axios(`https://dev.to/api/articles/${id}`);
      return response.data;
    },
  });

  if (blogLoading) {
    return <LoadContent />;
  }

  const { cover_image, title, tags, url, body_html } = blog;

  return (
    <div className="mx-auto max-w-screen-xl transition p-2  border-opacity-30   group hover:no-underline focus:no-underline ">
      <Helmet>
        <title>Bloom Hire | Blog</title>
      </Helmet>
      <img
        className="object-contain w-full rounded h-56 "
        src={cover_image || placeholderImg}
      />
      <div>
        <div className="flex flex-wrap py-6 gap-2 border-t border-dashed ">
          {tags &&
            tags.map((tag) => (
              <a
                key={tag}
                rel="noopener noreferrer"
                href="#"
                className="px-3 py-1 rounded-sm hover:underline "
              >
                #{tag}
              </a>
            ))}
        </div>
      </div>
      <div className="space-y-2">
        <a
          target="_blank"
          href={url}
          className="text-2xl font-semibold group-hover:underline group-focus:underline"
        >
          {title}
        </a>

        <div className="mx-auto w-fit">
          <Markdown rehypePlugins={[rehypeRaw]}>{body_html}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default Blog;
