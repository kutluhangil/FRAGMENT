import { db, type StoredShader } from "./db";
import { nanoid } from "nanoid";

export async function saveShader(
  name: string,
  fragmentCode: string,
  vertexCode?: string,
  thumbnail?: string,
  existingId?: string
): Promise<string> {
  const id = existingId || nanoid();
  const now = new Date();

  const existing = existingId ? await db.shaders.get(existingId) : null;

  if (existing) {
    await db.shaders.update(existingId!, {
      name,
      fragmentCode,
      vertexCode,
      thumbnail,
      updatedAt: now,
    });
    return existingId!;
  } else {
    await db.shaders.add({
      id,
      name,
      fragmentCode,
      vertexCode,
      thumbnail,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  }
}

export async function loadShader(
  id: string
): Promise<StoredShader | undefined> {
  return db.shaders.get(id);
}

export async function getAllShaders(): Promise<StoredShader[]> {
  return db.shaders.orderBy("updatedAt").reverse().toArray();
}

export async function deleteShader(id: string): Promise<void> {
  await db.shaders.delete(id);
}

export async function renameShader(id: string, name: string): Promise<void> {
  await db.shaders.update(id, { name, updatedAt: new Date() });
}
