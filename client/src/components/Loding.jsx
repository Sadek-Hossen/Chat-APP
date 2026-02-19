import React from "react";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center  ">
      <div className="w-64 space-y-4 p-6 rounded-xl bg-base-600 shadow-lg">
        <div className="skeleton h-32 w-full rounded-lg"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
      </div>
    </div>
  );
}

export default Loading;
