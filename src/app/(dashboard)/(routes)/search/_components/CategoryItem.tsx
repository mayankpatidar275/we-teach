"use client";

import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <Suspense
      fallback={
        <div className="flex justify-center align-middle">Loading...</div>
      }
    >
      <button
        onClick={onClick}
        className={cn(
          "py-2 px-3 text-sm bg-slate-700 border border-slate-700 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-slate-800 bg-slate-800"
        )}
        type="button"
      >
        {Icon && <Icon />}
        <div className="truncate">{label}</div>
      </button>
    </Suspense>
  );
};

export default CategoryItem;
