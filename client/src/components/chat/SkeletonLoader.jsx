/**
 * SkeletonLoader.jsx — Reusable shimmer skeleton components.
 * Uses the .skeleton CSS class defined in index.css.
 */

import React from "react";

// ── Chat List Skeleton ────────────────────────────────────────────────────────
export const ChatListSkeleton = ({ count = 6 }) => (
  <div className="flex flex-col gap-1 px-2 py-2">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 px-3 py-3">
        {/* Avatar */}
        <div className="skeleton w-11 h-11 rounded-full flex-shrink-0" />
        {/* Lines */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="skeleton h-3 rounded-full" style={{ width: `${50 + (i % 3) * 20}%` }} />
            <div className="skeleton h-2.5 rounded-full w-10 flex-shrink-0" />
          </div>
          <div className="skeleton h-2.5 rounded-full" style={{ width: `${40 + (i % 4) * 15}%` }} />
        </div>
      </div>
    ))}
  </div>
);

// ── Message Skeleton ──────────────────────────────────────────────────────────
export const MessageSkeleton = ({ count = 6 }) => (
  <div className="flex flex-col gap-4 px-4 py-6">
    {Array.from({ length: count }).map((_, i) => {
      const isMe = i % 3 === 0;
      return (
        <div
          key={i}
          className={`flex ${isMe ? "justify-end" : "justify-start"}`}
        >
          <div
            className="skeleton rounded-2xl"
            style={{
              width: `${120 + (i % 5) * 40}px`,
              height: "36px",
              borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
            }}
          />
        </div>
      );
    })}
  </div>
);

// ── Profile Skeleton ──────────────────────────────────────────────────────────
export const ProfileSkeleton = () => (
  <div className="flex flex-col items-center gap-4 p-6">
    <div className="skeleton w-20 h-20 rounded-full" />
    <div className="skeleton h-4 rounded-full w-36" />
    <div className="skeleton h-3 rounded-full w-24" />
    <div className="skeleton h-3 rounded-full w-48" />
  </div>
);

// ── Inline shimmer bar ────────────────────────────────────────────────────────
export const SkeletonBar = ({ width = "100%", height = "12px", className = "" }) => (
  <div
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius: "6px" }}
  />
);
