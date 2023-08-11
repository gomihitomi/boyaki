"use client";

import PhChatCircleDotsFill from "@/components/icons/PhChatCircleDotsFill";
import { useBoyakiStorage } from "@/hooks/useBoyakiStorage";
import { usePostDetail } from "@/hooks/usePostDetail";
import { postApiLikeOrPost } from "@/libs/api";
import { LINK_CLASSNAME, SITE_TITLE } from "@/libs/constants";
import { Post } from "@boyaki/lib";
import Link from "next/link";
import { useMemo, useState } from "react";
import EosIconsLoading from "./icons/EosIconsLoading";
import PhHeartStraightBold from "./icons/PhHeartStraightBold";
import PhHeartStraightFill from "./icons/PhHeartStraightFill";
import PrimeTwitter from "./icons/PrimeTwitter";

type Props = { post: Post; isDetails?: boolean };
export default function PostDetail({ post, isDetails }: Props) {
  const { slug } = post;

  const { hasLike, onLike, isLoading } = useBoyakiStorage(post);
  const { postDetail, setPostDetail } = usePostDetail(slug);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const isErrorName = useMemo(
    () => name.length === 0 || name.length > 100,
    [name]
  );
  const isErrorBody = useMemo(
    () => body.length === 0 || body.length > 1000,
    [body]
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const disabledSubmit = useMemo(() => {
    return !isProcessing && !!postDetail && !isErrorName && !isErrorBody;
  }, [isErrorBody, isErrorName, postDetail, isProcessing]);

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isProcessing || !disabledSubmit) {
      return;
    }
    setIsProcessing(true);

    const detail = await postApiLikeOrPost({
      type: "comment",
      id: post.id,
      name,
      body,
    });
    setPostDetail(detail);

    setName("");
    setBody("");
    setIsProcessing(false);
  };

  const validateLike = useMemo(
    () => !isLoading && !hasLike && !!postDetail,
    [hasLike, isLoading, postDetail]
  );
  const handleLike = async () => {
    if (validateLike) {
      setPostDetail({ ...postDetail!, like: postDetail!.like + 1 });
      const detail = await onLike();
      setPostDetail(detail);
    }
  };

  return (
    <div className="flex flex-col gap-8" id="comments">
      <div className="flex justify-between mt-2 cursor-default">
        <div className="flex gap-3">
          <div
            className={`flex items-center text-pink-500 ${
              validateLike && "cursor-pointer"
            }`}
            onClick={() => handleLike()}
          >
            {hasLike ? (
              <PhHeartStraightFill className="text-xl" />
            ) : (
              <PhHeartStraightBold className="text-xl" />
            )}
            {postDetail?.like ?? "-"}
          </div>
          <div className="flex items-center">
            {isDetails ? (
              <>
                <PhChatCircleDotsFill className="text-xl" />
                {postDetail?.comments?.length ?? "-"}
              </>
            ) : (
              <Link
                className={`flex items-center ${LINK_CLASSNAME} font-medium`}
                href={`/posts/${slug}#comments`}
              >
                <PhChatCircleDotsFill className="text-xl" />
                {postDetail?.comments?.length ?? "-"}
              </Link>
            )}
          </div>
        </div>
        {!!isDetails && !!process.env.NEXT_PUBLIC_SITE_URL && (
          <Link
            href={`https://twitter.com/share?url=${process.env.NEXT_PUBLIC_SITE_URL}posts/${post.slug}&text=${post.title}&hashtags=${SITE_TITLE}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-2xl cursor-pointer flex items-center"
          >
            <PrimeTwitter />
          </Link>
        )}
      </div>
      {isDetails && postDetail && (
        <div className="flex flex-col gap-8">
          {postDetail.comments.length > 0 && (
            <div className="flex flex-col gap-4">
              {postDetail.comments.map((comment, index) => (
                <div key={index}>
                  <div className="font-bold">
                    {index + 1}. {comment.name}
                  </div>
                  <div className="whitespace-pre-wrap break-words">
                    {comment.body}
                  </div>
                </div>
              ))}
            </div>
          )}
          <form className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-bold">名前</label>
              <input
                className="border-2 rounded p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                maxLength={100}
              />
              <span className="text-sm">{name.length}/100</span>
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
              <span className="text-sm">{body.length}/1000</span>
            </div>
            <button
              type="submit"
              className="text-white bg-emerald-700 p-2 rounded w-24 disabled:bg-gray-400 disabled:text-gray-300"
              onClick={(e) => onSubmit(e)}
              disabled={!disabledSubmit}
            >
              {!isProcessing ? (
                "送信"
              ) : (
                <EosIconsLoading className="text-xl inline-block" />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
