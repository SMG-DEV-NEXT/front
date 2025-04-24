import NotFoundView from "@/components/pages/NotFound";
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
