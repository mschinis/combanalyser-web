"use client";

import { FileDrop } from "@/components/file-drop";
import { useMemo, useState } from "react";
import Papa from "papaparse";
import { GraphView } from "@/components/graph-view";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import {
  type CombustionMeasurement,
  type ParsedCombustionCSV,
} from "@/types/csv";
import { Sensor } from "@/enums/sensor";
import { TemperatureUnit } from "@/enums/temperature-unit";
import { convertCelsiusToFahrenheit } from "@/utils/temperature";

export default function Home() {
  // Get configuration from the query parameters, to enable shareable links in the future
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

  // State management for parsed file
  const [parsedCSV, setParsedCSV] = useState<ParsedCombustionCSV>();

  // Handle file selection or dropped
  const onFileSelected = async (file: File) => {
    const fileContents = await file.text();
    const [headers, csvContents] = fileContents.split("\n\n");

    const { data } = Papa.parse<CombustionMeasurement>(csvContents, {
      header: true,
      dynamicTyping: true,
    });

    setParsedCSV({
      headers,
      measurements: data,
    });
  };

  // Convert measurements to Fahrenheit / Celsius if needed
  const measurements = useMemo(() => {
    return parsedCSV?.measurements.map((measurement) => {
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
  }, [temperatureUnit, parsedCSV?.measurements]);

  // If a file has been parsed display it - otherwise show the file picker UI
  return measurements ? (
    <div className={"h-full w-full p-16"}>
      <GraphView
        data={measurements}
        sensors={sensors}
        temperatureUnit={temperatureUnit}
      />
    </div>
  ) : (
    <FileDrop onFileSelected={onFileSelected} />
  );
}
