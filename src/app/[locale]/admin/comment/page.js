import CommentPage from "@/components/admin/Comment";
import React from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const CommentsAdmin = () => {
  return <CommentPage />;
};

export default CommentsAdmin;
