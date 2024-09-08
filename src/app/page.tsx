"use client";

import { FileDrop } from "@/components/file-drop";
import { useState } from "react";
import Papa from "papaparse";
import { GraphView } from "@/components/graph-view";
import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import {CombustionMeasurement, ParsedCombustionCSV, Sensor} from "@/types";

export default function Home() {
  const [sensors, setSensors] = useQueryState(
    "sensors",
    parseAsArrayOf(
      parseAsStringEnum<Sensor>(Object.values(Sensor)),
    ).withDefault([
      Sensor.virtualCoreTemperature,
      Sensor.virtualSurfaceTemperature,
      Sensor.virtualAmbientTemperature,
    ]),
  );

  const [parsedCSV, setparsedCSV] =
    useState<ParsedCombustionCSV>();

  const onFileSelected = async (file: File) => {
    const fileContents = await file.text();
    const [headers, csvContents] = fileContents.split("\n\n");

    const { data } = Papa.parse<CombustionMeasurement>(csvContents, {
      header: true,
      dynamicTyping: true,
    });

    setparsedCSV({
      headers,
      measurements: data,
    });
  };

  return parsedCSV ? (
    <div className={"flex flex-col justify-center container"}>
      <GraphView data={parsedCSV.measurements} sensors={sensors} />
    </div>
  ) : (
    <FileDrop onFileSelected={onFileSelected} />
  );
}
