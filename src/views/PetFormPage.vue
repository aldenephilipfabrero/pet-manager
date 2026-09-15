<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ isEdit ? "Edit Pet" : "Add Pet" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">Pet Name</ion-label>
        <ion-input v-model="form.name"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Animal Type</ion-label>
        <ion-input v-model="form.animalType" placeholder="Dog, Cat, Bird..."></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Breed</ion-label>
        <ion-input v-model="form.breed"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Age</ion-label>
        <ion-input type="number" v-model.number="form.age"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Owner Name</ion-label>
        <ion-input v-model="form.ownerName"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Notes</ion-label>
        <ion-textarea v-model="form.notes" auto-grow></ion-textarea>
      </ion-item>

      <ion-button expand="block" class="ion-margin-top" @click="save">
        {{ isEdit ? "Update Pet" : "Save Pet" }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
  IonLabel, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton
} from "@ionic/vue";
import { addPet, updatePet, getPet } from "../services/petServices";

const route = useRoute();
const router = useRouter();
const isEdit = ref(false);
const petId = ref(null);

const form = reactive({
  name: "",
  animalType: "",
  breed: "",
  age: null,
  ownerName: "",
  notes: ""
});

onMounted(async () => {
  if (route.query.id) {
    isEdit.value = true;
    petId.value = String(route.query.id);
    const pet = await getPet(petId.value);
    if (pet) {
      Object.assign(form, pet);
    }
  }
});

async function save() {
  if (isEdit.value) {
    await updatePet(petId.value, { ...form });
  } else {
    await addPet({ ...form });
  }
  router.push("/home");
}
</script>