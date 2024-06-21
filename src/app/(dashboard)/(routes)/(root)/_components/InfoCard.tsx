// import { IconBadge } from '@/components/IconBadge';
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

const InfoCard = ({
  variant,
  numberOfItems,
  label,
  icon: Icon,
}: InfoCardProps) => {
  return (
    <div className="rounded-md flex items-center gap-x-3 p-3 bg-slate-700">
      {/* <IconBadge variant={variant} icon={Icon}/> */}
      <Icon />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-slate-300 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
