import { Post } from "@libs/microcms";
import dayjs from "dayjs";
import parse, { DOMNode, Element, domToReact } from "html-react-parser";

type Props = { post: Post };
export default async function Post({ post }: Props) {
  return (
    <article className="border-b border-dotted border-black">
      <div className="relative mb-6">
        <h4 className="text-xl font-bold">{post.title}</h4>
        <div className="text-sm absolute -bottom-4 flex gap-2 items-center">
          <span>
            {dayjs(post.publishedAt).add(9, "h").format("YYYY.MM.DD")}
          </span>
          {post.tags.map((tag) => (
            <span key={tag.id}>{tag.name}</span>
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
  if (tagName === "a") {
    return (
      <a {...domNode.attribs} className="text-emerald-600 font-bold">
        {domToReact(domNode.children, { replace })}
      </a>
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
