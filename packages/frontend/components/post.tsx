import { LINK_CLASSNAME } from "@/libs/constants";
import { Post } from "@boyaki/lib";
import dayjs from "dayjs";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import PostDetail from "./postDetail";

type Props = { post: Post; isDetails?: boolean };
export default async function Post({ post, isDetails }: Props) {
  const title = <h2 className="text-xl font-bold">{post.title}</h2>;
  return (
    <div>
      <article className="border-b border-dotted border-black pb-3">
        <div className="relative mb-6">
          {isDetails ? (
            title
          ) : (
            <Link className={`${LINK_CLASSNAME}`} href={`/posts/${post.slug}`}>
              {title}
            </Link>
          )}
          <div className="text-sm absolute -bottom-4 flex gap-2 items-center">
            <span>
              {dayjs(post.publishedAt).add(9, "h").format("YYYY.MM.DD")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 leading-6 break-words">
          {parse(post.body, { replace })}
        </div>
      </article>
      <PostDetail {...{ post, isDetails }} />
    </div>
  );
}

const replace = (domNode: DOMNode) => {
  if (!(domNode instanceof Element)) {
    return;
  }
  const tagName = domNode.tagName;
  if (tagName === "img") {
    return (
      <Image
        {...domNode.attribs}
        src={domNode.attribs.src}
        alt={domNode.attribs.alt}
        className="drop-shadow-md my-2"
        unoptimized
      />
    );
  }
  if (tagName === "a") {
    return (
      <Link
        {...domNode.attribs}
        href={domNode.attribs.href}
        className="text-emerald-700 font-bold"
      >
        {domToReact(domNode.children, { replace })}
      </Link>
    );
  }
  if (tagName === "h2") {
    return (
      <h2 className="text-3xl font-bold">
        {domToReact(domNode.children, { replace })}
      </h2>
    );
  }
  if (tagName === "h3") {
    return (
      <h3 className="text-2xl font-bold">
        {domToReact(domNode.children, { replace })}
      </h3>
    );
  }
  if (tagName === "h4") {
    return (
      <h4 className="text-xl font-bold">
        {domToReact(domNode.children, { replace })}
      </h4>
    );
  }
};
