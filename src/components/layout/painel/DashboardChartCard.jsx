import React from "react";
import { Card, Title } from "@tremor/react";
import InfoTooltip from "../../ui/InfoTooltip";

export default function DashboardChartCard({ title, tooltip, children }) {
  return (
    <Card className="relative flex h-full flex-col rounded-[2rem] border-none bg-white p-6 shadow-xl shadow-blue-900/5 md:p-8">
      <Title className="mb-6 font-black text-[#0B2341]">{title}</Title>
      <div className="absolute right-6 top-6 md:right-8 md:top-8">
        <InfoTooltip text={tooltip} />
      </div>
      <div className="min-h-[300px] flex-1">{children}</div>
    </Card>
  );
}
