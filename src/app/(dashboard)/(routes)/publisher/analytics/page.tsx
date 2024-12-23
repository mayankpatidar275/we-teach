import { getAnalytics } from "@/actions/get-analytics";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";
import { auth } from "@/auth";

const AnalyticsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  // const userId = "1";

  if (!userId) {
    return redirect("/");
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
        <Chart data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
