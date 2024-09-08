import { parseAsArrayOf, parseAsStringEnum, useQueryState } from "nuqs";
import { Sensor } from "@/enums/sensor";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Probe } from "@/devices/probe";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemperatureUnit } from "@/enums/temperature-unit";

export default function SettingsView() {
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

  const [temperatureUnit, setTemperatureUnit] = useQueryState(
    "temperatureUnit",
    parseAsStringEnum<TemperatureUnit>(
      Object.values(TemperatureUnit),
    ).withDefault(TemperatureUnit.fahrenheit),
  );

  const setSensorValue = (sensor: Sensor) => {
    return (value: boolean) => {
      if (value) {
        const updatedSensors = [...sensors, sensor];
        const sortedSensors = Probe.sensors.filter((s) =>
          updatedSensors.includes(s),
        );

        // Enabled, add to existing
        void setSensors(sortedSensors);
      } else {
        // Disabled, remove
        const updatedSensors = sensors.filter((s) => s !== sensor);
        void setSensors(updatedSensors);
      }
    };
  };

  return (
    <div className="grid gap-4 py-4">
      <Label className={"font-bold"}>Temperature curves</Label>
      {Probe.sensors.map((key) => (
        <div key={key} className="grid grid-cols-4 items-center gap-4">
          <Switch
            id={key}
            checked={sensors.includes(key)}
            onCheckedChange={setSensorValue(key)}
          />
          <Label htmlFor={key}>{key}</Label>
        </div>
      ))}
      <div className="flex flex-col gap-4 mt-4">
        <Label className={"font-bold"}>Temperature Units</Label>
        <Select
          value={temperatureUnit}
          onValueChange={(value) => {
            void setTemperatureUnit(value as TemperatureUnit);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select temperature unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TemperatureUnit.fahrenheit}>
              Fahrenheit
            </SelectItem>
            <SelectItem value={TemperatureUnit.celsius}>Celsius</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
