"use client";

import PhChatCircleDotsFill from "@/components/icons/PhChatCircleDotsFill";
import { useBoyakiStorage } from "@/hooks/useBoyakiStorage";
import { usePostDetail } from "@/hooks/usePostDetail";
import { LINK_CLASSNAME } from "@/libs/constants";
import { postApiLikeOrPost } from "@/libs/microcms";
import { Post } from "@boyaki/lib";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import PhHeartStraightBold from "./icons/PhHeartStraightBold";
import PhHeartStraightFill from "./icons/PhHeartStraightFill";

type Props = { post: Post; isDetails?: boolean };
export default function PostDetail({ post, isDetails }: Props) {
  const { slug } = post;

  const { hasLike, onLike } = useBoyakiStorage(post);
  const { postDetail, setPostDetail } = usePostDetail(slug);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const submitProcessing = useRef(false);
  const disabled = useMemo(() => submitProcessing.current, []);

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (submitProcessing.current) {
      return;
    }
    if (!!postDetail && !!name && !!body) {
      submitProcessing.current = true;
      const detail = await postApiLikeOrPost({
        type: "comment",
        id: post.id,
        name,
        body,
      });
      setPostDetail(detail);
      setName("");
      setBody("");
      submitProcessing.current = false;
    }
  };

  const handleLike = async () => {
    if (!hasLike && !!postDetail) {
      setPostDetail({ ...postDetail, like: postDetail.like + 1 });
      const detail = await onLike();
      setPostDetail(detail);
    }
  };

  if (!postDetail) {
    return <div id="comments"></div>;
  }

  return (
    <div className="flex flex-col gap-4" id="comments">
      <div className="flex gap-3 mt-2 cursor-default">
        <div
          className={`flex items-center text-pink-500 ${
            !hasLike && "cursor-pointer"
          }`}
          onClick={() => handleLike()}
        >
          {hasLike ? (
            <PhHeartStraightFill className="text-xl" />
          ) : (
            <PhHeartStraightBold className="text-xl" />
          )}
          {postDetail?.like ?? 0}
        </div>
        <div className="flex items-center">
          {isDetails ? (
            <>
              <PhChatCircleDotsFill className="text-xl" />
              {postDetail?.comments?.length ?? 0}
            </>
          ) : (
            <Link
              className={`flex items-center ${LINK_CLASSNAME} font-medium`}
              href={`/posts/${slug}#comments`}
            >
              <PhChatCircleDotsFill className="text-xl" />
              {postDetail?.comments?.length ?? 0}
            </Link>
          )}
        </div>
      </div>
      {isDetails && (
        <>
          {postDetail?.comments?.map((comment, index) => (
            <div key={index}>
              <div className="font-bold">
                {index + 1}. {comment.name}
              </div>
              <div className="whitespace-pre-wrap break-words">
                {comment.body}
              </div>
            </div>
          ))}
          <form className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-bold">名前</label>
              <input
                className="border-2 rounded p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <span className="text-sm">※100文字まで</span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold">コメント</label>
              <textarea
                className="border-2 rounded p-2"
                rows={4}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                maxLength={1000}
                required
              />
              <span className="text-sm">※1000文字まで</span>
            </div>
            <button
              type="submit"
              className="text-white bg-emerald-700 p-2 rounded w-24 disabled:bg-grey-800 disabled:text-gray-500"
              onClick={(e) => onSubmit(e)}
              disabled={disabled}
            >
              送信
            </button>
          </form>
        </>
      )}
    </div>
  );
}
