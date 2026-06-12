<template>
  <div class="contenedor-principal">
    <sidebarComp />

    <div class="contenido-movimientos">
      <h1>Historial de Movimientos</h1>

      <table class="tabla-movimientos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cripto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Total (ARS)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mov in movimientos" :key="mov.id">
            <td>{{ formatearFecha(mov.datetime) }}</td>
            <td>{{ mov.crypto_code.toUpperCase() }}</td>
            <td>{{ mov.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
            <td>{{ mov.crypto_amount }}</td>
            <td>$ {{ mov.money }}</td>
            <td>
              <button @click="verDetalle(mov.id)">Ver</button>
              <button @click="abrirEdicion(mov)">Editar</button>
              <button @click="borrar(mov.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="mostrandoDetalle" class="panel-sencillo">
        <h2>Detalle Completo</h2>
        <p><strong>Fecha y hora:</strong> {{ formatearFecha(movimientoActual.datetime) }}</p>
        <p><strong>Criptomoneda:</strong> {{ movimientoActual.crypto_code.toUpperCase() }}</p>
        <p>
          <strong>Tipo:</strong> {{ movimientoActual.action === 'purchase' ? 'Compra' : 'Venta' }}
        </p>
        <p><strong>Cantidad:</strong> {{ movimientoActual.crypto_amount }}</p>
        <p><strong>Total pagado:</strong> $ {{ movimientoActual.money }}</p>
        <p>
          <strong>Precio unitario:</strong> $
          {{ (movimientoActual.money / movimientoActual.crypto_amount).toFixed(2) }}
        </p>

        <button @click="mostrandoDetalle = false">Cerrar Detalle</button>
      </div>

      <div v-if="mostrandoEdicion" class="panel-sencillo">
        <h2>Editar Transacción</h2>

        <label>Código Cripto:</label>
        <input type="text" v-model="movimientoActual.crypto_code" />

        <label>Acción:</label>
        <select v-model="movimientoActual.action">
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>

        <label>Cantidad:</label>
        <input type="number" step="any" v-model="movimientoActual.crypto_amount" />

        <label>Total Pesos:</label>
        <input type="number" step="any" v-model="movimientoActual.money" />

        <br /><br />
        <button @click="guardarCambios">Guardar</button>
        <button @click="mostrandoEdicion = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import sidebarComp from '../components/sidebarComp.vue'

// Variables de estado
const movimientos = ref([])
const urlBase = 'https://localhost:7222/transacciones'

// Variables para controlar qué panel se ve
const mostrandoDetalle = ref(false)
const mostrandoEdicion = ref(false)

// Objeto que usamos tanto para ver como para editar
const movimientoActual = ref({})

// 1. TRAER TODOS LOS DATOS
const cargarMovimientos = async () => {
  const respuesta = await fetch(urlBase)
  movimientos.value = await respuesta.json()
}

cargarMovimientos()

// 2. BOTÓN VER: Busca por ID en la API y lo muestra
const verDetalle = async (id) => {
  const respuesta = await fetch(`${urlBase}/${id}`)
  movimientoActual.value = await respuesta.json()

  mostrandoEdicion.value = false // Oculto el otro por las dudas
  mostrandoDetalle.value = true // Muestro este panel
}

// 3. BOTÓN EDITAR: Carga los datos en el formulario
const abrirEdicion = (mov) => {
  // Uso el spread operator (...) para hacer una copia y no editar la tabla en vivo
  movimientoActual.value = { ...mov }

  mostrandoDetalle.value = false // Oculto el otro panel
  mostrandoEdicion.value = true // Muestro el formulario
}

// 4. BOTÓN GUARDAR (PUT)
const guardarCambios = async () => {
  await fetch(`${urlBase}/${movimientoActual.value.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movimientoActual.value),
  })

  mostrandoEdicion.value = false // Cierro el panel
  cargarMovimientos() // Vuelvo a pedir la lista actualizada al backend
  alert('Actualizado!')
}

// 5. BOTÓN BORRAR (DELETE)
const borrar = async (id) => {
  if (confirm('¿Borrar definitivo?')) {
    await fetch(`${urlBase}/${id}`, { method: 'DELETE' })
    cargarMovimientos() // Refresco la tabla
  }
}

// Formato de fecha básico
const formatearFecha = (fechaOriginal) => {
  if (!fechaOriginal) return ''
  return new Date(fechaOriginal).toLocaleString()
}
</script>

<style scoped>
.contenedor-principal {
  display: flex;
  min-height: 100vh;
  color: white;
  gap: 10px;
}
.contenido-movimientos {
  padding: 20px;
  flex: 1;
  background-color: #111827;
  width: 100%;
  border-radius: 10px;
}

.tabla-movimientos {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.tabla-movimientos th,
.tabla-movimientos td {
  border: 1px solid #374151;
  padding: 10px;
  text-align: left;
}
.tabla-movimientos th {
  background-color: #1f2937;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background-color: #2563eb;
}

.panel-sencillo {
  background-color: #1f2937;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #374151;
  margin-top: 20px;
}
.panel-sencillo label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
.panel-sencillo input,
.panel-sencillo select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
</style>

<style>
body {
  background-color: grey;
  margin: 0;
}
</style>
