<template>
  <main class="content">
    <section class="desk">

      <!--   Шапка доски   -->
      <div class="desk__header">
        <h1 class="desk__title">Design Coffee Lab</h1>
        <div class="desk__filters">
          <div class="desk__user-filter">
            <ul class="user-filter">
              <li class="user-filter__item">
                <a class="user-filter__button" href="">
                  <img
                      src=""
                      alt="FАватар юзера"
                      width="24"
                      height="24"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div class="desk__meta-filter">
            <ul class="meta-filter">
              <li class="meta-filter__item">
                <a class="meta-filter__status" href=""></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--   Колонки и задачи   -->
      <div class="desk__columns">
        <div class="column">
          <h2 class="column__name">Название колонки</h2>
          <div class="column__target-area">
            <div class="column__task">
              <div class="task">
                <div class="task__user">
                  <div class="task__avatar">
                    <img
                        src=""
                        alt="задача"
                        width="20"
                        height="20"
                    />
                  </div>
                  Пользователь задачи
                </div>

                <div class="task__statuses">
                  <span class="task__status"/>
                  <span class="task__status"/>
                </div>

                <h5 class="task__title">
                  Наименование задачи
                </h5>
                <ul class="task__tags">
                  <li>
                    <span class="tag tag--blue">
                      Тег задачи
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--   Пустая доска   -->
      <p class="desk__emptiness">
        Пока нет ни одной колонки
      </p>
    </section>
  </main>
</template>

<script setup>

</script>

<style scoped lang="scss">

</style>
