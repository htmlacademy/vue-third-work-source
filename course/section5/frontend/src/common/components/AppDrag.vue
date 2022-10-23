<template>
<!--  Блокируем перенос блоков если пользователь не вошел в систему-->
  <div
    :draggable="authStore.isAuthenticated"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from '../constants'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const props = defineProps({
  transferData: {
    type: Object,
    required: true
  }
})

function onDrag({ dataTransfer }) {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
}
</script>
