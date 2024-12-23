"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect, Suspense } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedValue, router, pathname, currentCategoryId]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center align-middle">Loading...</div>
      }
    >
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-400" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="text-slate-400 w-full md:w-[300px] pl-9 rounded-full bg-slate-700 border-none"
          placeholder="Search for a course"
        />
      </div>
    </Suspense>
  );
};

export default SearchInput;
