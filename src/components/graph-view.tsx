import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { CombustionMeasurement, Sensor } from "@/types";

const chartConfig = {
  T1: {
    label: "T1",
    color: "var(--chart-1)",
  },
  T2: {
    label: "T2",
    color: "var(--chart-2)",
  },
  T3: {
    label: "T3",
    color: "var(--chart-2)",
  },
  T4: {
    label: "T4",
    color: "var(--chart-2)",
  },
  T5: {
    label: "T5",
    color: "var(--chart-2)",
  },
  T6: {
    label: "T6",
    color: "var(--chart-2)",
  },
  T7: {
    label: "T7",
    color: "var(--chart-2)",
  },
  T8: {
    label: "T8",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function GraphView({
  data,
  sensors,
}: {
  data: CombustionMeasurement[];
  sensors: Sensor[];
}) {
  return (
    <ChartContainer config={chartConfig} className={"min-h-[calc(100vh_/_2)]"}>
      <LineChart accessibilityLayer data={data} height={400}>
        <CartesianGrid vertical={false} />
        <YAxis
          type={"number"}
          //        tickFormatter={value => {
          //     return `${value}`.slice(0,3)
          // }}
        />
        <XAxis
          dataKey="Timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          // tickFormatter={(value) => {
          //     console.log('value', value)
          //     return `${value}`.slice(0, 3)
          // }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        {sensors.map((sensor, i) => (
            <Line
                key={i}
                dataKey={sensor}
                type="monotone"
                // stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
            />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
