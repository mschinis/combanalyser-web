import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";
import {CombustionMeasurement} from "@/app/page";

const chartConfig = {
    T1: {
        label: "T1",
        color: "var(--chart-1)",
    },
    T2: {
        label: "T2",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function GraphView({ data }: { data: CombustionMeasurement[] }) {
    return (
        <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={data}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                    dataKey="T1"
                    type="monotone"
                    // stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="T2"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                /> <Line
                    dataKey="T3"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                /> <Line
                    dataKey="T4"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                /> <Line
                    dataKey="T5"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="T6"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="T7"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="T8"
                    type="monotone"
                    // stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={false}
                />

            </LineChart>
        </ChartContainer>
    )
}
