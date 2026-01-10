<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>
            <p class="student" style="margin: 1%;">
        รหัสนักศึกษา: 673380018-5 <br />
        ชื่อ-สกุล: พัชรพร อยู่ฉิม
      </p>
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <!-- CHANGE: Add a click event listener to each image -->
            <ion-img :src="photo.webviewPath" @click="showActionSheet(photo)"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<!-- ...existing code... -->

<script setup lang="ts">
// CHANGE: Update import
import { camera, trash, close } from 'ionicons/icons';
// CHANGE: Update import
import {
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  actionSheetController,
} from '@ionic/vue';

// CHANGE: Add `UserPhoto` type import
import type { UserPhoto } from '@/composables/usePhotoGallery';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

// CHANGE: Add `deletePhoto()` method
const { photos, addNewToGallery, deletePhoto } = usePhotoGallery();

// CHANGE: Add `showActionSheet()` method
const showActionSheet = async (photo: UserPhoto) => {
  const actionSheet = await actionSheetController.create({
    header: 'Photos',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: trash,
        handler: () => {
          deletePhoto(photo);
        },
      },
      {
        text: 'Cancel',
        icon: close,
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        },
      },
    ],
  });
  await actionSheet.present();
};
</script>