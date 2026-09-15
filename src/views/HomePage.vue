<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pet Manager</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item-sliding v-for="pet in pets" :key="pet.id">
          <ion-item button @click="openEdit(pet)">
            <ion-label>
              <h2>{{ pet.name }} ({{ pet.animalType }})</h2>
              <p>Breed: {{ pet.breed }} • Age: {{ pet.age }}</p>
              <p>Owner: {{ pet.ownerName }}</p>
              <p v-if="pet.notes">Notes: {{ pet.notes }}</p>
            </ion-label>
            <ion-button
              slot="end"
              fill="clear"
              color="danger"
              aria-label="Delete pet"
              @click.stop="removePet(pet.id)"
            >
              <ion-icon :icon="trashOutline"></ion-icon>
            </ion-button>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removePet(pet.id)">
              Delete
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openAdd">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions,
  IonItemOption, IonButton, IonFab, IonFabButton, IonIcon
} from "@ionic/vue";
import { add, trashOutline } from "ionicons/icons";
import { subscribeToPets, deletePet } from "../services/petServices";

const pets = ref([]);
const router = useRouter();
let unsubscribe;

onMounted(() => {
  unsubscribe = subscribeToPets((data) => {
    pets.value = data;
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

function openAdd() {
  router.push("/pet-form");
}

function openEdit(pet) {
  router.push({ path: "/pet-form", query: { id: pet.id } });
}

async function removePet(id) {
  await deletePet(id);
}
</script>