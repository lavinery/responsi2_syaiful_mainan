<template>
    <ion-modal :is-open="isOpen" @did-dismiss="cancel">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ editingId ? 'Edit' : 'Tambah' }} Mainan</ion-title>
          <ion-buttons slot="start">
            <ion-button @click="cancel">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <!-- Input untuk Nama Mainan -->
        <ion-item>
          <ion-input
            v-model="mainan.name"
            label="Nama Mainan"
            label-placement="floating"
            placeholder="Masukkan Nama Mainan"
          ></ion-input>
        </ion-item>
  
        <!-- Input untuk Cerita Mainan -->
        <ion-item>
          <ion-textarea
            v-model="mainan.steps"
            label="Cerita Mainan"
            label-placement="floating"
            placeholder="Masukkan Cerita Mainan"
            :autogrow="true"
            :rows="5"
          ></ion-textarea>
        </ion-item>
  
        <!-- Tombol Submit -->
        <ion-row>
          <ion-col>
            <ion-button
              type="button"
              @click="submitForm"
              shape="round"
              color="primary"
              expand="block"
            >
              {{ editingId ? 'Edit' : 'Tambah' }} Mainan
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-content>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonRow,
    IonCol,
    IonItem,
    IonContent,
    IonTextarea,
  } from '@ionic/vue';
  import { close } from 'ionicons/icons';
  import { Mainan, firestoreService } from '@/utils/firestore';
  import { ref, watch } from 'vue';
  
  const props = defineProps<{
    isOpen: boolean;
    editingId: string | null;
    mainan: Omit<Mainan, 'id' | 'createdAt' | 'updatedAt'>;
  }>();
  
  const emit = defineEmits<{
    'update:isOpen': [value: boolean];
    'update:editingId': [value: string | null];
    'submit': [item: Omit<Mainan, 'id' | 'createdAt' | 'updatedAt'>];
  }>();
  
  const cancel = () => {
    emit('update:isOpen', false);
    emit('update:editingId', null);
    resetMainan();
  };
  
  const submitForm = () => {
    emit('submit', { ...props.mainan }); 
    cancel();
  };
  
  const resetMainan = () => {
    props.mainan.name = '';
    props.mainan.steps = '';
  };
  
  watch(
    () => props.editingId,
    async (newEditingId) => {
      if (newEditingId) {
        try {
          const mainan = await firestoreService.getMainanById(newEditingId);
          if (mainan) {
            props.mainan.name = mainan.name;
            props.mainan.steps = mainan.steps; 
          }
        } catch (error) {
          console.error('Failed to fetch mainan data:', error);
        }
      } else {
        resetMainan();
      }
    },
    { immediate: true }
  );
  </script>
  