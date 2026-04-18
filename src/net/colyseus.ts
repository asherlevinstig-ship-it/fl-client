import { Client } from "@colyseus/sdk";

// Ensure this matches your server URL
export const client = new Client(
  window.location.hostname === "localhost"
    ? "ws://localhost:2567"
    : "wss://us-mia-ea26ba04.colyseus.cloud"
);

export async function connectToTown(name: string, classId: string, pathwayId: string) {
  return await client.joinOrCreate<any>("town", { name, classId, pathwayId });
}

export async function connectToField(name: string, classId: string, pathwayId: string) {
  return await client.joinOrCreate<any>("field", { name, classId, pathwayId });
}

export async function connectToDungeon(name: string, classId: string, pathwayId: string) {
  return await client.create<any>("dungeon", { name, classId, pathwayId });
}

export async function connectToMaze(name: string, classId: string, pathwayId: string) {
  return await client.joinOrCreate<any>("maze", { name, classId, pathwayId });
}

export async function connectToUnderworld(name: string, classId: string, pathwayId: string) {
  return await client.joinOrCreate<any>("underworld", { name, classId, pathwayId });
}

export async function reconnectToRoom(reconnectionToken: string) {
  return await client.reconnect(reconnectionToken);
}