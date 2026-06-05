<template>
  <div class="contenedor-principal">
    <SidebarComp />
    <div class="formulario">
      <h1>Nueva Compra</h1>
      <form class="formulario-compra" @submit.prevent="registrarCompra">
        <label for="criptomoneda">Criptomoneda:</label>
        <select id="criptomoneda" v-model="criptomoneda" required placeholder="Selecciona una criptomoneda">
          <option value="" disabled>Selecciona una criptomoneda</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
          <option value="USDT">USDT</option>
        </select>

        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" v-model="cantidad" required>

        <label for="cliente">Cliente:</label>
        <select id="cliente" v-model="cliente" required placeholder="Selecciona un cliente">
          <option value="" disabled>Selecciona un cliente</option>
          <option value="Cliente 1">Cliente 1</option>
          <option value="Cliente 2">Cliente 2</option>
          <option value="Cliente 3">Cliente 3</option>
        </select>

        <label for="fechayhora">Fecha y Hora:</label>
        <input type="datetime-local" id="fechayhora" v-model="fechayhora" required>
      
        <div class="registrar-compra">
          <button type="submit">Registrar Compra</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SidebarComp from '../components/sidebarComp.vue';

const criptomoneda = ref('');
const cantidad = ref(0);
const cliente = ref('');
const fechayhora = ref('');

const registrarCompra = () => {
  console.log(criptomoneda.value);
  console.log(cantidad.value);
  console.log(cliente.value);
  console.log(fechayhora.value);
}
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
    margin-top: 25px;
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
  }
  .formulario input, .formulario select {
    width: 100%;
    padding: 8px;
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: none;
  }
  .formulario-compra{
    width: 100%;
    max-width: 500px;
    background-color: #1f2937;
    padding: 25px;
    border-radius: 10px;
  }
  .registrar-compra {
    display: flex;
    justify-content: center;
  }
  .registrar-compra button {
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
  .registrar-compra button:hover {
    background-color: black;
    transition: 0.3s;
  }
</style>

<style>
  body{
    background-color: grey;
    margin: 0;
  }
</style>

