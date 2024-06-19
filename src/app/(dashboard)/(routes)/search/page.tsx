import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import getCourses from "../../../../actions/get-courses";
import { redirect } from "next/navigation";
import CoursesList from "@/components/CoursesList";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const userId = "1";

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  console.log("courses: ", courses);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center align-middle">Loading...</div>
        }
      >
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <div className="p-6 space-y-4">
          <Categories items={categories} />
          <CoursesList items={courses} />
        </div>
      </Suspense>
    </>
  );
}

export default SearchPage;
