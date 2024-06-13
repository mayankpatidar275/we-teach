"use client";

import { Category } from "@prisma/client";
import {
  FcMultipleDevices,
  FcMusic,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { MdDesignServices } from "react-icons/md";
import { IconType } from "react-icons";
import { SiSnapcraft } from "react-icons/si";
import { GiMeditation } from "react-icons/gi";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Fitness: FcSportsMode,
  Finance: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Designing: MdDesignServices,
  Art: SiSnapcraft,
  Spirituality: GiMeditation,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
