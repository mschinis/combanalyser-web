import { TemperatureChart } from "@/components/temperature-chart";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import { Sensor } from "@/enums/sensor";
import { TemperatureUnit } from "@/enums/temperature-unit";
import { useMemo } from "react";
import { convertCelsiusToFahrenheit } from "@/utils/temperature";
import type { CombustionMeasurement } from "@/types/csv";

export default function GraphView({ data }: { data: CombustionMeasurement[] }) {
  const [sensors] = useQueryState(
    "sensors",
    parseAsArrayOf(
      parseAsStringEnum<Sensor>(Object.values(Sensor)),
    ).withDefault([
      Sensor.virtualCoreTemperature,
      Sensor.virtualSurfaceTemperature,
      Sensor.virtualAmbientTemperature,
    ]),
  );

  const [temperatureUnit] = useQueryState(
    "temperatureUnit",
    parseAsStringEnum<TemperatureUnit>(
      Object.values(TemperatureUnit),
    ).withDefault(TemperatureUnit.fahrenheit),
  );

  // Convert measurements to Fahrenheit / Celsius if needed
  const measurements = useMemo(() => {
    return data.map((measurement) => {
      return Object.entries(measurement).reduce((acc, [key, value]) => {
        if ((Object.values(Sensor) as string[]).includes(key)) {
          acc[key] =
            temperatureUnit === TemperatureUnit.fahrenheit
              ? convertCelsiusToFahrenheit(value)
              : value;
          return acc;
        }

        acc[key] = value;
        return acc;
      }, {});
    }) as CombustionMeasurement[];
  }, [temperatureUnit, data]);

  return (
    <div className={"h-full w-full p-16"}>
      <TemperatureChart
        data={measurements}
        sensors={sensors}
        temperatureUnit={temperatureUnit}
      />
    </div>
  );
}
