import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import AdminShell from "./AdminShell";
import OrderList from "./OrderList";
import { Shimmer } from "../../components/Skeleton";
import { money } from "../../Utils/format";

const StatCard = ({ label, value, loading, hint }) => (
  <div className="rounded-lg border border-sand-400 bg-sand-50 p-6">
    <p className="u-label">{label}</p>
    {loading ? (
      <Shimmer className="mt-4 h-8 w-24" />
    ) : (
      <p className="mt-3 font-display text-[34px] font-semibold leading-none tnum">
        {value}
      </p>
    )}
    {hint && <p className="mt-3 text-[13px] text-ink-faint">{hint}</p>}
  </div>
);

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        fontFamily: "Karla, sans-serif",
        background: "transparent",
        zoom: { enabled: false },
      },
      colors: ["#B8552F"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2.5 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.28,
          opacityTo: 0.02,
          stops: [0, 100],
        },
      },
      grid: {
        borderColor: "#E4DACB",
        strokeDashArray: 4,
        padding: { left: 8, right: 8 },
      },
      markers: { size: 0, hover: { size: 5 } },
      tooltip: {
        theme: "light",
        style: { fontFamily: "Karla, sans-serif" },
        y: { formatter: (v) => `$${Number(v).toLocaleString("en-US")}` },
      },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: "#9A9086", fontSize: "12px" } },
      },
      yaxis: {
        min: 0,
        labels: {
          style: { colors: "#9A9086", fontSize: "12px" },
          formatter: (v) => `$${Math.round(v)}`,
        },
      },
      legend: { show: false },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formatted = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: { ...prev.options.xaxis, categories: formatted.map((i) => i.x) },
        },
        series: [{ name: "Sales", data: formatted.map((i) => i.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <AdminShell
      title="Overview"
      subtitle="How the shop is doing right now."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Total sales"
          loading={isLoading}
          value={money(sales?.totalSales || 0)}
          hint="All paid orders"
        />
        <StatCard
          label="Customers"
          loading={loadingCustomers}
          value={customers?.length ?? 0}
          hint="Registered accounts"
        />
        <StatCard
          label="Orders"
          loading={loadingOrders}
          value={orders?.totalOrders ?? 0}
          hint="Placed to date"
        />
      </div>

      <div className="mt-8 rounded-lg border border-sand-400 bg-sand-50 p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[18px] font-semibold">Sales over time</h2>
          <span className="text-[13px] text-ink-faint">Daily totals</span>
        </div>

        <div className="mt-6">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            height={320}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[18px] font-semibold">Recent orders</h2>
        <div className="mt-5">
          <OrderList embedded />
        </div>
      </div>
    </AdminShell>
  );
};

export default AdminDashboard;
