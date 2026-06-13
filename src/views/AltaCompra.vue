<template>
  <div class="contenedor-principal">
    <SidebarComp />
    <div class="formulario">
      <h1>Nueva Compra</h1>
      <form class="formulario-compra" @submit.prevent="registrarCompra">
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

        <div class="registrar-compra">
          <button type="submit">Registrar Compra</button>
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

const registrarCompra = async () => {
  if (!criptomoneda.value) {
    alert('Seleccione una criptomoneda')
    return
  }

  if (!cantidad.value) {
    alert('Ingrese una cantidad')
    return
  }

  if (cantidad.value <= 0) {
    alert('La cantidad debe ser mayor a cero')
    return
  }

  if (!fechayhora.value) {
    alert('Seleccione una fecha')
    return
  }
  const fechaIngresada = new Date(fechayhora.value)

  if (fechaIngresada > new Date()) {
    alert('La fecha no puede ser futura')
    return
  }
  try {
    const transaccionesParaGuardar = {
      crypto_code: criptomoneda.value,
      action: 'purchase',
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
        `Compra registrada con exito en la base de datos. Total gastado: $${transaccionCreada.money}`,
      )
      ;((criptomoneda.value = ''), (cantidad.value = 0), (fechayhora.value = ''))
    } else {
      alert('Error al guardar en el servidor. Revisa la consola.')
    }
  } catch (error) {
    console.error('Error al procesar la compra:', error)
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
.formulario-compra {
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
  background-color: #4caf50;
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
body {
  background-color: grey;
  margin: 0;
}
</style>
