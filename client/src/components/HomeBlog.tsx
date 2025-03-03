import { IBlog, } from "@/lib/Interfaces";
import Container from "@/components/Container";
import StrapiImage from "@/components/StrapiImage";
import Link from "next/link";
import SvgIcon from "./SvgIcon";

interface HomeBlogProps {
  posts: IBlog[];
  className?: string;
}

const HomeBlog: React.FC<HomeBlogProps> = ({ posts, className }) => {
  const classNameValue = className ? `${className}` : "";

  const date = (dateString: string) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "Augest", "September", "October", "November", "December"];
    const date = new Date(dateString)
    if(date.valueOf()) {
        return `${monthNames[date.getMonth()]} ${date.getDate()}`;
    }
  };

  return (
    <Container className={`mt-40 mb-25 lg:mt-138 md:mb-100 ${classNameValue}`}>
      <h1 className="text-center font-bold text-[20px] md:text-[30px]">
        Our Blog Posts
      </h1>
      <p className="text-center text-[14px] leading-24 text-dove-gray mt-5">
        We are an online plant shop offering a wide range of cheap and trendy
        plants.
      </p>
      <div className="mt-35 flex gap-44 flex-wrap xl:flex-nowrap">
        {posts.map((post) => (
          <div className="w-full md:max-w-268" key={post.documentId}>
            <StrapiImage
              src={post.cover?.url || "#"}
              width={268}
              height={195.17}
              alt={post?.cover?.name || ""}
            />
            <div className="bg-alabaster pt-9 pr-11 pb-12 pl-15">
              <p className="text-chateau-green font-medium text-[14px] leading-16">
                {`${date(post?.publishedAt || "")} | Read in ${post?.readTime} minutes`}
              </p>
              <h3 className="font-bold text-[20px] leading-26 mt-4">
                {post?.title}
              </h3>
              <p className="mt-4 text-[14px] leading-22 text-dove-gray">
                {post?.description}
              </p>
              <Link
                href={`/blogs/${post?.slug}`}
                className="flex gap-3 items-center text-[14px] leading-16 mt-9 hover:text-chateau-green"
              >
                <p>Read More</p>
                <SvgIcon iconName="arrowRight2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomeBlog;
