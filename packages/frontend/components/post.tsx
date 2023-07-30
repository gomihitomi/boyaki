import { Post } from "@libs/microcms";
import { LINK_CLASSNAME } from "@libs/utils";
import dayjs from "dayjs";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

type Props = { post: Post; isDetails?: boolean };
export default async function Post({ post, isDetails }: Props) {
  const title = <h2 className="text-xl font-bold">{post.title}</h2>;
  return (
    <article className="border-b border-dotted border-black">
      <div className="relative mb-6">
        {isDetails ? title : <Link href={`/posts/${post.slug}`}>{title}</Link>}
        <div className="text-sm absolute -bottom-4 flex gap-2 items-center">
          <span>
            {dayjs(post.publishedAt).add(9, "h").format("YYYY.MM.DD")}
          </span>
          {post.tags.map((tag) => (
            <span key={tag.slug} className={`${LINK_CLASSNAME}`}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
      <div>{parse(post.body, { replace })}</div>
    </article>
  );
}

const replace = (domNode: DOMNode) => {
  if (!(domNode instanceof Element)) {
    return;
  }
  const tagName = domNode.tagName;
  if (tagName === "p") {
    return (
      <p className="mb-3 leading-6">
        {domToReact(domNode.children, { replace })}
      </p>
    );
  }
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
