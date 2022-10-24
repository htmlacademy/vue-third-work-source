<template>
<!--  Отслеживает в какую колонку передана задача-->
  <app-drop
      class="column"
      @drop="moveTask"
  >
    <h2 class="column__name">
<!--      Показывает наименование колонки-->
      <span v-if="!state.isInputShowed">
        {{ state.columnTitle }}
      </span>

<!--      Показывает инпут если колонка редактируется-->
      <input
          v-else
          ref="columnTitle"
          v-model="state.columnTitle"
          type="text"
          class="column__input"
          name="column_title"
          @blur="updateInput"
      />

<!--      Показывает иконку редактирования задачи-->
      <app-icon
          v-if="!state.isInputShowed"
          class="icon--edit"
          @click="showInput"
      />
<!--      Показывает иконку удаления колонки-->
<!--      Иконка не будет отображаться если в колонке есть задачи-->
      <app-icon
          v-if="!state.isInputShowed && !columnTasks.length"
          class="icon--trash"
          @click="$emit('delete', column.id)"
      />
    </h2>

    <div class="column__target-area">
<!--      Вынесли задачи в отдельный компонент-->
      <task-card
          v-for="task in columnTasks"
          :key="task.id"
          :task="task"
          class="column__task"
          @drop="moveTask($event, task)"
      />
    </div>
  </app-drop>
</template>

<script setup>
import { reactive, computed, nextTick, ref } from 'vue'
import AppDrop from '@/common/components/AppDrop.vue'
import AppIcon from '@/common/components/AppIcon.vue'
import TaskCard from '@/modules/tasks/components/TaskCard.vue'
import { getTargetColumnTasks, addActive } from '@/common/helpers'
import { useTasksStore } from '@/stores'

const tasksStore = useTasksStore()

const props = defineProps({
  column: {
    type: Object,
    required: true
  }
})
const columnTitle = ref(null)
const state = reactive({ isInputShowed: false, columnTitle: props.column.title })
const emits = defineEmits(['update', 'delete'])

// Фильтруем задачи, которые относятся к конкретной колонке
const columnTasks = computed(() => {
  return tasksStore.filteredTasks
    .filter(task => task.columnId === props.column.id)
    .sort((a, b) => a.sortOrder - b.sortOrder)
})

// Показывает инпут для редактирования колонки и наводим фокус
async function showInput () {
  state.isInputShowed = true
  // Функция nextTick ожидает когда произойдет ререндер компонента
  // Так как мы изменили span ни input, нам нужно подождать когда отрисуется инпут
  await nextTick()
  columnTitle.value.focus()
}

function updateInput () {
  state.isInputShowed = false
  if (props.column.title === state.columnTitle) {
    return
  }
  emits('update', {
    ...props.column,
    title: state.columnTitle
  })
}

// Метод для переноса задач
function moveTask (active, toTask) {
  // Не обновлять если нет изменений
  if (toTask && active.id === toTask.id) {
    return
  }

  const toColumnId = props.column ? props.column.id : null
  // Получить задачи для текущей колонки
  const targetColumnTasks = getTargetColumnTasks(toColumnId, tasksStore.tasks)
  const activeClone = { ...active, columnId: toColumnId }
  // Добавить активную задачу в колонку
  const resultTasks = addActive(activeClone, toTask, targetColumnTasks)
  const tasksToUpdate = []

  // Отсортировать задачи в колонке
  resultTasks.forEach((task, index) => {
    if (task.sortOrder !== index || task.id === active.id) {
      const newTask = { ...task, sortOrder: index }
      tasksToUpdate.push(newTask)
    }
  })
  tasksStore.updateTasks(tasksToUpdate)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.column {
  display: flex;
  flex-direction: column;

  padding-top: 15px;

  border-right: 1px solid $blue-gray-200;

  $bl: &;

  &__name,
  &__input {
    display: flex;
    align-items: center;

    margin: 0 8px;

    color: $blue-gray-600;

    @include m-s14-h21;

    &:hover {
      #{$bl}__button {
        opacity: 1;
      }
    }
  }

  &__input {
    margin: 0;
    padding: 0;

    border: none;
    border-bottom: 1px solid $blue-gray-200;
    outline: none;
  }

  &__target-area {
    overflow-y: auto;
    flex-grow: 1;

    min-width: 224px;
    max-width: 380px;
    height: 1px;
    padding-right: 8px;
    padding-bottom: 30px;
    padding-left: 8px;

    @media (min-width: 1500px) {
      min-width: 244px;
    }
  }

  &__task {
    display: block;

    margin-top: 16px;
  }

  &__button {
    margin: 0;
    padding: 0;

    transition: opacity $animationSpeed;
    transform: scale(0.8);

    opacity: 0;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__update {
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>
