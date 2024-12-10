<template>
    <div class="admin-panel">
      <h2>Panel de Administración</h2>
      <button @click="toggleForm">Agregar Producto</button>
  
      <div v-if="showForm && !editingProduct">
        <h3>Nuevo Producto</h3>
        <form @submit.prevent="addProduct">
          <div>
            <label for="name">Nombre:</label>
            <input type="text" v-model="newProduct.name" required />
          </div>
          <div>
            <label for="description">Descripción:</label>
            <textarea v-model="newProduct.description" required></textarea>
          </div>
          <div>
            <label for="price">Precio:</label>
            <input type="number" v-model="newProduct.price" required />
          </div>
          <div>
            <label for="discount">Descuento:</label>
            <input type="number" v-model="newProduct.discount" />
          </div>
          <div>
            <label for="stock">Stock:</label>
            <input type="number" v-model="newProduct.stock" required />
          </div>
          <div>
            <label for="image">Imagen URL:</label>
            <input type="text" v-model="newProduct.image" required />
          </div>
          <button type="submit">Guardar Producto</button>
          <button type="button" @click="toggleForm">Cancelar</button>
        </form>
      </div>
  
      <div v-if="showForm && editingProduct">
        <h3>Editar Producto</h3>
        <form @submit.prevent="updateProduct">
          <div>
            <label for="name">Nombre:</label>
            <input type="text" v-model="editingProduct.name" required />
          </div>
          <div>
            <label for="description">Descripción:</label>
            <textarea v-model="editingProduct.description" required></textarea>
          </div>
          <div>
            <label for="price">Precio:</label>
            <input type="number" v-model="editingProduct.price" required />
          </div>
          <div>
            <label for="discount">Descuento:</label>
            <input type="number" v-model="editingProduct.discount" />
          </div>
          <div>
            <label for="stock">Stock:</label>
            <input type="number" v-model="editingProduct.stock" required />
          </div>
          <div>
            <label for="image">Imagen URL:</label>
            <input type="text" v-model="editingProduct.image" required />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" @click="toggleForm">Cancelar</button>
        </form>
      </div>
  
      <!-- Lista de productos -->
      <div v-for="product in products" :key="product.id" class="product-item">
        <h3>{{ product.name }}</h3>
        <img :src="product.image" :alt="product.name" class="product-image" />
        <p><strong>Descripción:</strong> {{ product.description }}</p>
        <p><strong>Precio:</strong> ${{ product.price }}</p>
        <p><strong>Descuento:</strong> {{ product.discount }}%</p>
        <p><strong>Stock:</strong> {{ product.stock }}</p>
        <button @click="editProduct(product)">Editar</button>
        <button @click="deleteProduct(product.id)">Eliminar</button>
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [],
        showForm: false,
        newProduct: {
          name: '',
          description: '',
          price: 0,
          discount: 0,
          stock: 0,
          image: '',
        },
        editingProduct: null,
      };
    },
    async created() {
      const response = await fetch("http://localhost:8000/api/products");
      this.products = await response.json();
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm) {
          this.resetForm();
        }
      },
      async addProduct() {
        try {
          const response = await fetch("http://localhost:8000/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.newProduct),
          });
  
          if (!response.ok) {
            throw new Error("Error al agregar producto");
          }
  
          const product = await response.json();
          this.products.push(product);
          this.toggleForm();
          this.resetForm();
        } catch (error) {
          alert(error.message);
        }
      },
      editProduct(product) {
        this.editingProduct = { ...product };
        this.showForm = true;
      },
      async updateProduct() {
        try {
          const response = await fetch(`http://localhost:8000/api/products/${this.editingProduct.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editingProduct),
          });
  
          if (!response.ok) {
            throw new Error("Error al actualizar producto");
          }
  
          const updatedProduct = await response.json();
          const index = this.products.findIndex((p) => p.id === updatedProduct.id);
          this.products.splice(index, 1, updatedProduct);
          this.toggleForm();
          this.resetForm();
        } catch (error) {
          alert(error.message);
        }
      },
      deleteProduct(productId) {
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
          fetch(`http://localhost:8000/api/products/${productId}`, { method: "DELETE" });
          this.products = this.products.filter((p) => p.id !== productId);
        }
      },
      resetForm() {
        this.newProduct = {
          name: '',
          description: '',
          price: 0,
          discount: 0,
          stock: 0,
          image: '',
        };
        this.editingProduct = null;
      },
    },
  };
  </script>
  
  <style>
  .admin-panel {
    padding: 20px;
  }
  
  button {
    margin: 10px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  .product-item {
    margin-bottom: 20px;
  }
  
  .product-image {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
  }
  </style>
  