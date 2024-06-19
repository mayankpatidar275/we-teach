// import { formatPrice } from "@/lib/format";
// import { BookOpen } from "lucide-react";
import { Play } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// import CourseProgress from "./CourseProgress";

interface AcitivityCardProps {
  id: string;
  title: string;
  imageUrl: StaticImageData;
  category: string;
}

const ActivityCard = ({ id, title, imageUrl }: AcitivityCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden rounded-lg p-3 h-full bg-slate-700">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="flex p-3 gap-2 text-lg md:text-base font-medium group-hover:text-sky-400 transition line-clamp-2">
            <Play />
            <span>{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
