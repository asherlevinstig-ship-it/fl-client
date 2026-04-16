import { Schema, MapSchema, type } from "@colyseus/schema";
import { PlayerState } from "./PlayerState";
import { EnemyState } from "./EnemyState";
import { LootState } from "./LootState"; // <-- Make sure this is imported
import { FamiliarState } from "./FamiliarState";
export class FloorFieldState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  
  @type({ map: EnemyState }) enemies = new MapSchema<EnemyState>();
  @type({ map: FamiliarState }) familiars = new MapSchema<FamiliarState>();
  // THIS IS THE MISSING MAGIC LINE ON THE CLIENT:
  @type({ map: LootState }) lootItems = new MapSchema<LootState>();
  
  @type("string") activeEnemyId: string = "";
}