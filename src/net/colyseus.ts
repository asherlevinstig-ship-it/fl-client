import { Client } from "colyseus.js";

// Ensure this matches your server URL
export const client = new Client(window.location.hostname === "localhost" ? "ws://localhost:2567" : "wss://your-server-url.com");

export async function connectToTown(name: string, classId: string, pathwayId: string) {
    return await client.joinOrCreate<any>("town", { name, classId, pathwayId });
}

export async function connectToField(name: string, classId: string, pathwayId: string) {
    return await client.joinOrCreate<any>("field", { name, classId, pathwayId });
}

export async function connectToDungeon(name: string, classId: string, pathwayId: string) {
    // 🛑 Using .create() instead of .joinOrCreate() guarantees a private solo instance!
    const room = await client.create("dungeon", { name, classId, pathwayId });
    return room;
}

export async function connectToMaze(name: string, classId: string, pathwayId: string) {
    return await client.joinOrCreate<any>("maze", { name, classId, pathwayId });
}

export async function connectToUnderworld(name: string, classId: string, pathwayId: string) {
    return await client.joinOrCreate<any>("underworld", { name, classId, pathwayId });
}

// --- NEW RECONNECT METHOD ---
// --- NEW RECONNECT METHOD ---
// --- NEW RECONNECT METHOD ---
export async function reconnectToRoom(reconnectionToken: string) {
    // Modern Colyseus uses a single secure token instead of room/session IDs
    return await client.reconnect(reconnectionToken);
}

