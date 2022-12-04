<template>
  <div class="card">Привет, компонент Б это я</div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 300px;
  height: 100px;
  background-color: #9c1d00;
  border-radius: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
