<template>
    <div class="product-list">
    
      <button class="history-button" @click="goToHistory">Ver Historial de Compras</button>
  
      <h2>Productos</h2>
      <div v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <img :src="product.image" :alt="product.name" class="product-image" />
        <p>{{ product.description }}</p>
        <p>Precio: ${{ product.price }}</p>
        <button @click="buyProduct(product)">Comprar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        products: [], 
      };
    },
    async created() {
     
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
    methods: {
      async buyProduct(product) {
        if (!product || !product.id) {
          alert('Producto no válido');
          return;
        }
  
        if (product.stock <= 0) {
          alert('Este producto no está disponible.');
          return;
        }
  
        const userId = 1; 
  
        const purchaseData = {
          userId,
          productId: product.id,
          quantity: 1,
          totalPrice: product.price,
          purchaseDate: new Date().toISOString(), 
        };
  
        try {
          const response = await axios.post('http://localhost:8000/api/purchases', purchaseData);
          alert(`Compra realizada con éxito: ${response.data.message}`);
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          alert('Hubo un error al procesar la compra.');
        }
      },
      goToHistory() {
        this.$router.push("/history");
      },
    },
  };
  </script>
  
  <style scoped>
  .product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  
  .history-button {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .history-button:hover {
    background-color: #0056b3;
  }
  </style>
  