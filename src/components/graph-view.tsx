import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { CombustionMeasurement } from "@/types/csv";
import { Sensor } from "@/enums/sensor";

const chartConfig = {
  T1: {
    label: "T1 (Tip)",
    color: "#FF9E0B",
  },
  T2: {
    label: "T2",
    color: "#BF5AF2",
  },
  T3: {
    label: "T3",
    color: "#5AC8F5",
  },
  T4: {
    label: "T4",
    color: "#6AC4DC",
  },
  T5: {
    label: "T5",
    color: "#63E6E2",
  },
  T6: {
    label: "T6",
    color: "#FF375F",
  },
  T7: {
    label: "T7",
    color: "#AC8E68",
  },
  T8: {
    label: "T8 (Handle)",
    color: "#000000",
  },
  VirtualCoreTemperature: {
    label: "Core Temperature",
    color: "#0B84FF",
  },
  VirtualSurfaceTemperature: {
    label: "Surface Temperature",
    color: "#FED709",
  },
  VirtualAmbientTemperature: {
    label: "Ambient Temperature",
    color: "#FF453A",
  }
} satisfies ChartConfig;

export function GraphView({
  data,
  sensors,
}: {
  data: CombustionMeasurement[];
  sensors: Sensor[];
}) {
  return (
    <ChartContainer config={chartConfig} className={"w-full min-h-[calc(100vh_/_2)]"}>
      <LineChart accessibilityLayer data={data} height={400}>
        <CartesianGrid vertical={false} />
        <YAxis
          type={"number"}
        />
        <XAxis
          dataKey="Timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        {sensors.map((sensor, i) => (
            <Line
                key={i}
                dataKey={sensor}
                stroke={`var(--color-${sensor})`}
                type="monotone"
                strokeWidth={2}
                dot={false}
            />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
