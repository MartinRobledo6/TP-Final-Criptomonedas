<template>
  <div class="dashboard">

    <div class="dashboard-header">
      <h1>Crypto<span>Wallet</span></h1>
    </div>

    <div class="dashboard-content">
      <ul>
        <li><RouterLink to="/inicio">Inicio</RouterLink></li>
        <li><RouterLink to="/clientes">Clientes</RouterLink></li>
        <li><RouterLink to="/compras">Compras</RouterLink></li>
        <li><RouterLink to="/vender">Vender</RouterLink></li>
        <li><RouterLink to="/movimientos">Movimientos</RouterLink></li>
        <li><RouterLink to="/analisis">Analisis</RouterLink></li>
      </ul>
    </div>

  </div>
</template>

<style scoped>

a{
  color: white;
  text-decoration: none;
}

a:hover{
  color: yellow;
  transition: 0.5s;
}

ul{
  padding: 0;
}

li{
  list-style: none;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  font-size: 20px;
}

span{
  color: yellow;
}

.dashboard{
  width: 200px;
  min-height: 100vh;
  background-color: #111827;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

</style>
