import { db } from "../firebase";
import { ref as dbRef, push, update, remove, onValue, get, child } from "firebase/database";

const petsRef = dbRef(db, "pets");

export function subscribeToPets(callback) {
  return onValue(petsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const pets = Object.entries(data).map(([id, value]) => ({ id, ...value }));
    callback(pets);
  });
}

export async function addPet(pet) {
  return await push(petsRef, pet);
}

export async function updatePet(id, pet) {
  return await update(dbRef(db, `pets/${id}`), pet);
}

export async function deletePet(id) {
  return await remove(dbRef(db, `pets/${id}`));
}

export async function getPet(id) {
  const snapshot = await get(child(dbRef(db), `pets/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
}