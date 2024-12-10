<template>
  <div class="purchase-history">
    <h2>Historial de Compras</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="purchase in purchases" :key="purchase.id" class="purchase-card">
        <h3>Producto: {{ purchase.Product.name }}</h3>
        <img :src="purchase.Product.Image" :alt="purchase.Product.name" class="product-image" />
        <p>Usuario: {{ purchase.User.name }} {{ purchase.User.lastname }}</p>
        <p>Fecha: {{ formatDate(purchase.purchaseDate) }}</p>
        <p>Total: ${{ purchase.totalPrice }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      purchases: [], // Almacena el historial de compras
      loading: false, // Indica si los datos están cargándose
      error: null, // Mensajes de error
    };
  },
  methods: {
    // Formatea la fecha a un formato legible
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    // Obtiene todas las compras desde la API
    async fetchAllPurchases() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get("http://localhost:8000/api/purchases");
        this.purchases = response.data;
      } catch (error) {
        this.error = "Error al cargar el historial de compras.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchAllPurchases();
  },
};
</script>

<style scoped>
.purchase-history {
  padding: 20px;
}

.purchase-card {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.product-image {
  max-width: 100px;
  margin-bottom: 10px;
}
</style>
