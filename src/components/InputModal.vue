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
        <ion-item>
          <ion-input
            v-model="mainan.name"
            label="Nama Mainan"
            label-placement="floating"
            placeholder="Masukkan Nama Mainan"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea
            v-model="mainan.steps"
            label="Langkah-langkah"
            label-placement="floating"
            placeholder="Masukkan Langkah-langkah Memasak"
            :autogrow="true"
            :rows="5"
          ></ion-textarea>
        </ion-item>
        <ion-row>
          <ion-col>
            <ion-button type="button" @click="submitForm" shape="round" color="primary" expand="block">
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
  
  // Function to format the steps after the user submits
  const formatSteps = () => {
    if (!props.mainan || !props.mainan.steps) {
      return '';
    }
    
    // Split the steps by line breaks, map through each step, and add numbering
    const stepsArray = props.mainan.steps.split('\n').map((step: string, index: number) => `${index + 1}. ${step.trim()}`);
    return stepsArray.join('\n');
  };
  
  
  const cancel = () => {
    emit('update:isOpen', false);
    emit('update:editingId', null);
    resetMainan();
  };
  
  const submitForm = () => {
    // Format steps only when submitting
    const formattedSteps = formatSteps();
    emit('submit', { ...props.mainan, steps: formattedSteps });
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
            props.mainan.steps = mainan.steps; // Use the saved steps
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