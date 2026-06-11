<template>
  <div class="contenedor-principal">
    <sidebarComp />
    <div class="contenido-movimientos">
      <h1>Historial de Movimientos</h1>
      <div class="tabla-contenedor">
        <table class="tabla-movimientos">
          <thead>
            <tr>
              <th>Fecha y hora</th>
              <th>Criptomoneda</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Total (ARS)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movimiento in movimientos" :key="movimiento.id">
              <td>{{ formatearFecha(movimiento.datetime) }}</td>
              <td class="crypto-badge">{{ movimiento.cryptoCode?.toUpperCase() }}</td>
              <td :class="movimiento.action === 'purchase' ? 'texto-compra' : 'texto-venta'">
                {{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}
              </td>
              <td>{{ movimiento.cryptoAmount }}</td>
              <td>$ {{ movimiento.money }}</td>
              <td class="acciones">
                <button class="btn-ver">Ver</button>
                <button class="btn-editar">Editar</button>
                <button class="btn-borrar">Borrar</button>
              </td>
            </tr>
            <tr v-if="movimientos.length === 0">
              <td colspan="6" class="sin-datos">No hay movimientos registrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import sidebarComp from '../components/sidebarComp.vue'

const movimientos = ref([])

const cargarMovimientos = async () => {
  try {
    const urlBackend = 'https://localhost:7222/transacciones'

    const respuesta = await fetch(urlBackend)

    if (respuesta.ok) {
      const datos = await respuesta.json()

      movimientos.value = datos
    } else {
      console.error('No se pudieron cargar los movimientos. Código de error:', respuesta.status)
    }
  } catch (error) {
    console.error('Error de red al intentar traer el historial:', error)
  }
}

onMounted(() => {
  cargarMovimientos()
})

const formatearFecha = (fechaString) => {
  if (!fechaString) {
    return ''
  }
  const fecha = new Date(fechaString)
  return fecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
h1 {
  color: white;
  margin-bottom: 25px;
}
.contenedor-principal {
  display: flex;
  min-width: 100%;
  min-height: 100vh;
  gap: 10px;
}
.contenido-movimientos {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: #111827;
  border-radius: 10px;
}
.tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}
.tabla-movimientos {
  width: 100%;
  border-collapse: collapse;
  background-color: #1f2937;
  color: white;
  border-radius: 8px;
  overflow: hidden;
}
.tabla-movimientos th,
.tabla-movimientos td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #374151;
  font-size: 18px;
}
.tabla-movimientos th {
  background-color: #374151;
  font-weight: bold;
}
.crypto-badge {
  color: yellow;
  font-weight: bold;
}
.texto-compra {
  color: green;
  font-weight: bold;
}
.texto-venta {
  color: red;
  font-weight: bold;
}
.sin-datos {
  text-align: center;
}
.acciones {
  display: flex;
  gap: 15px;
}
.acciones button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: white;
}
.btn-ver {
  background-color: blue;
}
.btn-editar {
  background-color: orange;
}
.btn-borrar {
  background-color: red;
}
</style>

<style></style>
