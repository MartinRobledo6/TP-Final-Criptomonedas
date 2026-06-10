<template>
  <div class="contenedor-principal">
    <SidebarComp />
    <div class="formulario">
      <h1>Nueva Venta</h1>
      <form class="formulario-venta" @submit.prevent="registrarVenta">
        <label for="criptomoneda">Criptomoneda:</label>
        <select id="criptomoneda" v-model="criptomoneda" required>
          <option value="" disabled>Selecciona una criptomoneda</option>
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="usdt">USDT</option>
          <option value="sol">Solana</option>
        </select>

        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" v-model="cantidad" step="any" min="0" required />

        <label for="fechayhora">Fecha y Hora:</label>
        <input type="datetime-local" id="fechayhora" v-model="fechayhora" required />

        <div class="registrar-venta">
          <button type="submit">Registrar Venta</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarComp from '../components/sidebarComp.vue'

const criptomoneda = ref('')
const cantidad = ref(0)
const fechayhora = ref('')

const registrarVenta = async () => {
  if (!criptomoneda.value || cantidad.value <= 0) {
    alert('Por favor, ingresa una criptomoneda y una cantidad valida')
    return
  }
  try {
    const transaccionesParaGuardar = {
      crypto_code: criptomoneda.value,
      action: 'sale',
      crypto_amount: cantidad.value,
      datetime: fechayhora.value,
    }

    const urlBackend = 'https://localhost:7222/transacciones'

    const respuestaBackend = await fetch(urlBackend, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaccionesParaGuardar),
    })

    if (respuestaBackend.ok) {
      const transaccionCreada = await respuestaBackend.json()
      alert(
        `Venta registrada con exito en la base de datos. Total obtenido: $${transaccionCreada.money}`,
      )
      criptomoneda.value = ''
      cantidad.value = 0
      fechayhora.value = ''
    } else {
      const errorTexto = await respuestaBackend.text()
      alert(`No se pudo realizar la venta. Verifica tu saldo.\nDetalle del servidor: ${errorTexto}`)
    }
  } catch (error) {
    console.error('Error al procesar la venta:', error)
  }
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
  align-items: center;
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
.formulario input,
.formulario select {
  width: 100%;
  padding: 8px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
}
.formulario-venta {
  width: 100%;
  max-width: 500px;
  background-color: #1f2937;
  padding: 25px;
  border-radius: 10px;
}
.registrar-venta {
  display: flex;
  justify-content: center;
}
.registrar-venta button {
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}
.registrar-venta button:hover {
  background-color: black;
  transition: 0.3s;
}
</style>

<style>
body {
  background-color: grey;
  margin: 0;
}
</style>
