<template>
  <div class="contenedor-principal">
    <SidebarComp />
    <div class="formulario">
      <h1>Nueva Compra</h1>
      <form class="formulario-cliente" @submit.prevent="registrarCompra">
        <label for="criptomoneda">Criptomoneda:</label>
        <select id="criptomoneda" v-model="criptomoneda" required placeholder="Selecciona una criptomoneda">
          
        </select>

        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" v-model="cantidad" required>

        <label for="cliente">Cliente:</label>
        <select id="cliente" v-model="cliente" required placeholder="Selecciona un cliente">
        </select>

        <label for="fechayhora">Fecha y Hora:</label>
        <input type="datetime-local" id="fechayhora" v-model="fechayhora" required>
      
        <div class="registrar-cliente">
          <button type="submit">Registrar Compra</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import SidebarComp from '../components/sidebarComp.vue';
</script>

<style scoped>
  .contenedor-principal {
    display: flex;
    min-height: 100vh;
    gap: 10px;
  }
  .formulario {
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
  .formulario h1 {
    margin-bottom: 20px;
    color: white;
  }
  .formulario label {
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
  }
  .formulario input, .formulario select {
    width: 100%;
    padding: 8px;
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: none;
  }
  .registrar-cliente {
    display: flex;
    justify-content: center;
  }
  .registrar-cliente button {
    margin-top: 20px;
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

