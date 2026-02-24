import { notFound } from "next/navigation";
import RoomClient from "@/components/RoomClient";
import { continents, currentStation } from "@/lib/mockData";

function findStation(stationId: string) {
  if (stationId === currentStation.id) return currentStation;
  for (const continent of continents) {
    for (const country of continent.countries) {
      const station = country.stations.find((s) => s.id === stationId);
      if (station) return station;
    }
  }
  return null;
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ stationId: string }>;
}) {
  const { stationId } = await params;
  const station = findStation(stationId) ?? currentStation;
  if (!station) notFound();
  return <RoomClient station={station} />;
}
