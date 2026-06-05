<template>
  <div class="contenedor-principal">
    <SidebarComp />
    <div class="contenido-cliente">
      <h1>Nuevo Cliente</h1>
      <form class="formulario-cliente" @submit.prevent="registrarCliente">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" required>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>

        <div class="registrar-cliente">
          <button type="submit">Registrar Cliente</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SidebarComp from '../components/sidebarComp.vue';

const nombre = ref('');
const email = ref('');

const registrarCliente = () => {
  console.log(nombre.value);
  console.log(email.value);
}
</script>

<style scoped>
  .contenedor-principal {
    display: flex;
    min-height: 100vh;
    gap: 10px;
  }
  .contenido-cliente {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 3px;
    border-radius: 10px;
    flex: 1;
    padding: 20px;
    background-color: #111827;
  }
  .contenido-cliente h1 {
    margin-bottom: 20px;
    color: white;
  }
  .formulario-cliente {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .formulario-cliente label {
    margin-bottom: 5px;
    color: white;
    font-size: 20px;
  }
  .formulario-cliente input {
    margin-bottom: 15px;
    font-size: 20px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .registrar-cliente {
    display: flex;
    justify-content: center;
  }
  .registrar-cliente button {
    padding: 10px 20px;
    width: 100%;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  }
</style>

<style>
  body{
    background-color: grey;
    margin: 0;
  }
</style>