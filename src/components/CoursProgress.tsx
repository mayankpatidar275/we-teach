import { Progress } from "./ui/progress";

interface CoursProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const CoursProgress = ({ value, variant, size }: CoursProgressProps) => {
  return (
    <div>
      <Progress />
    </div>
  );
};

export default CoursProgress;
