import Dexie, { type EntityTable } from "dexie";

export interface StoredShader {
  id: string;
  name: string;
  fragmentCode: string;
  vertexCode?: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string; // base64 data URL
}

class FragmentDatabase extends Dexie {
  shaders!: EntityTable<StoredShader, "id">;

  constructor() {
    super("FragmentDB");
    this.version(1).stores({
      shaders: "id, name, createdAt, updatedAt",
    });
  }
}

export const db = new FragmentDatabase();
