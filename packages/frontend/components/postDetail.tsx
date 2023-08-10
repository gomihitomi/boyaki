"use client";

import PhChatCircleDotsFill from "@/components/icons/PhChatCircleDotsFill";
import { useBoyakiStorage } from "@/hooks/useBoyakiStorage";
import { usePostDetail } from "@/hooks/usePostDetail";
import { LINK_CLASSNAME } from "@/libs/constants";
import Link from "next/link";
import { useState } from "react";
import PhHeartStraightBold from "./icons/PhHeartStraightBold";
import PhHeartStraightFill from "./icons/PhHeartStraightFill";

type Props = { slug: string; isDetails?: boolean };
export default function PostDetail({ slug, isDetails }: Props) {
  const { hasLike, onLike } = useBoyakiStorage(slug);
  const { postDetail } = usePostDetail(slug);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = () => {
    console.log(name, body);
    // TODO: 送信処理
    setName("");
    setBody("");
  };

  return (
    <div className="flex flex-col gap-4" id="comments">
      <div className="flex gap-3 mt-2 cursor-default">
        <div
          className={`flex items-center text-pink-500 ${
            !hasLike && "cursor-pointer"
          }`}
          onClick={() => !hasLike && onLike()}
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm font-bold">名前</label>
              <input
                className="border-2 rounded p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold">コメント</label>
              <textarea
                className="border-2 rounded p-2"
                rows={4}
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </div>
            <button
              className="text-white bg-emerald-700 p-2 rounded w-24"
              onClick={() => onSubmit()}
            >
              送信
            </button>
          </div>
        </>
      )}
    </div>
  );
}
