import dynamic from "next/dynamic";

const DashboardCharts = dynamic(() => import("./dashboard-charts"), {
  ssr: false,
});

export default function DashboardPage() {
  return <DashboardCharts />;
}