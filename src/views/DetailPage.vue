<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { firestoreService, type Mainan } from '@/utils/firestore';

const route = useRoute();
const mainan = ref<Mainan | null>(null);

onMounted(async () => {
  const id = route.params.id as string;
  mainan.value = await firestoreService.getMainanById(id);
});

const formattedSteps = computed(() => {
  if (!mainan.value?.steps) {
    return '';
  }
  return mainan.value.steps
    .replace(/^\d+\.\s?/gm, '')  
    .replace(/\n/g, '<br />');   
});
</script>
