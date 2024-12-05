<template>
    <ion-modal :is-open="isModalOpen" @did-dismiss="closeModal">
      <ion-header>
        <!-- Custom Back Button to close modal -->
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="closeModal">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{{ mainan?.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-card v-if="mainan">
          <ion-card-header>
            <ion-card-title>{{ mainan.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <!-- Remove numbering from steps -->
            <p v-html="formattedSteps"></p>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { firestoreService, type Mainan } from '@/utils/firestore';
  import { close } from 'ionicons/icons'; 
  
  const route = useRoute();
  const mainan = ref<Mainan | null>(null);
    
  const isModalOpen = ref(false);
  
  onMounted(async () => {
    const id = route.params.id as string;
    mainan.value = await firestoreService.getMainanById(id);
    isModalOpen.value = true; 
  });
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  const formattedSteps = computed(() => {
    if (!mainan.value?.steps) {
      return '';
    }
    return mainan.value.steps
      .replace(/^\d+\.\s?/gm, '') 
      .replace(/\n/g, '<br />');   
  });
  </script>
  