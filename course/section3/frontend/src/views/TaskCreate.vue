<template>
  <div
    class="task-card"
    tabindex="0"
    @click.self="closeDialog"
    @keydown.esc="closeDialog"
  >
    <section class="task-card__wrapper">
      <button
        class="task-card__close"
        type="button"
        @click="closeDialog"
      />

      <div class="task-card__block">
        <div class="task-card__row">
<!--          <input-->
<!--            v-model="task.title"-->
<!--            type="text"-->
<!--            name="task_name"-->
<!--            class="task-card__name"-->
<!--            :class="{ 'task-card__name&#45;&#45;min': taskToEdit }"-->
<!--            max="37"-->
<!--          />-->

<!--          <a-->
<!--            v-if="taskToEdit"-->
<!--            class="task-card__edit task-card__edit&#45;&#45;red"-->
<!--            @click="removeTask"-->
<!--          >-->
<!--            Удалить Задачу-->
<!--          </a>-->

<!--          <span-->
<!--            v-if="validations.title.error"-->
<!--            class="task-card__error-text"-->
<!--          >-->
<!--            {{ validations.title.error }}-->
<!--          </span>-->
        </div>
      </div>

<!--      <div class="task-card__status">-->
<!--        <h4 class="task-card__title">-->
<!--          Выберите статус:-->
<!--        </h4>-->

<!--        <ul class="meta-filter task-card__meta">-->
<!--          <li-->
<!--            v-for="({ value, label }) in statusList"-->
<!--            :key="value"-->
<!--            class="meta-filter__item"-->
<!--            :class="{ active: value === taskStatuses[task.statusId]}"-->
<!--            @click="setStatus(value)"-->
<!--          >-->
<!--            <a-->
<!--              class="meta-filter__status"-->
<!--              :class="`meta-filter__status&#45;&#45;${value}`"-->
<!--              :title="label"-->
<!--            />-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->

<!--      <div-->
<!--        v-if="task.id"-->
<!--        class="task-card__block"-->
<!--      >-->
<!--        <p class="task-card__date">-->
<!--          {{ $taskCardDate }}-->
<!--        </p>-->
<!--      </div>-->

<!--      <div class="task-card__block">-->
<!--        <ul class="task-card__params">-->
<!--          <TaskCardCreatorUserSelector v-model="task.userId" />-->
<!--          <TaskCardCreatorDueDateSelector v-model="task.dueDate" />-->
<!--        </ul>-->
<!--      </div>-->

<!--      <div class="task-card__block">-->
<!--        <div class="task-card__description">-->
<!--          <h4 class="task-card__title">-->
<!--            Описание-->
<!--          </h4>-->
<!--          <textarea-->
<!--            v-model="task.description"-->
<!--            name="task_description"-->
<!--            placeholder="Добавьте описание к задаче"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->

      <div class="task-card__block">
        <div class="task-card__links">
<!--          <h4 class="task-card__title">-->
<!--            Ссылки-->
<!--          </h4>-->

<!--          <div class="task-card__links-item">-->
<!--            <input-->
<!--              v-model="task.url"-->
<!--              type="text"-->
<!--              name="task_link_url"-->
<!--              placeholder="Введите url"-->
<!--            />-->
<!--            <span-->
<!--              v-if="validations.url.error"-->
<!--              class="task-card__error-text"-->
<!--            >-->
<!--              {{ validations.url.error }}-->
<!--            </span>-->
<!--            <input-->
<!--              v-model="task.urlDescription"-->
<!--              type="text"-->
<!--              name="task_link_desc"-->
<!--              placeholder="Добавьте описание к ссылке"-->
<!--            />-->
<!--          </div>-->
        </div>
      </div>

      <div class="task-card__block">
<!--        <TaskCardViewTicksList-->
<!--          :ticks="task.ticks"-->
<!--          @createTick="createTick"-->
<!--          @updateTick="updateTick"-->
<!--          @removeTick="removeTick"-->
<!--        />-->
      </div>

      <div class="task-card__block">
<!--        <TaskCardCreatorTags-->
<!--          :tags="task.tags"-->
<!--          @setTags="$set(task, 'tags', $event)"-->
<!--        />-->
      </div>

<!--      <div class="task-card__buttons">-->
<!--        <AppButton-->
<!--          class="button&#45;&#45;border"-->
<!--          @click="closeDialog"-->
<!--        >-->
<!--          Отменить-->
<!--        </AppButton>-->
<!--        <AppButton-->
<!--          class="button&#45;&#45;primary"-->
<!--          :class="{'button&#45;&#45;disabled': !isFormValid}"-->
<!--          :disabled="!isFormValid"-->
<!--          @click="submit"-->
<!--        >-->
<!--          Сохранить-->
<!--        </AppButton>-->
<!--      </div>-->
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.meta-filter {
  display: flex;
  align-items: center;

  $bl: ".meta-filter";
  @include clear-list;

  &__item {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      #{$bl}__status {
        box-shadow: 0 0 0 4px $blue-600;
      }
    }
  }

  &__status {
    display: block;

    box-sizing: content-box;
    width: 24px;
    height: 24px;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: $animationSpeed;

    border-radius: 50%;
    outline: none;
    background-color: transparent;

    &:hover {
      box-shadow: 0 0 0 4px $orange-300;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 24px;
      height: 24px;

      background-image: url("~@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 24px;
      height: 24px;

      background-image: url("~@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}
</style>
