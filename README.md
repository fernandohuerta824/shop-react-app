# 📦 Shop React App Frontend — React + TypeScript

Interfaz completa del **CRUD de productos**, conectada a un backend en Java + Spring Boot.
Incluye búsqueda, filtros avanzados, paginación y vista de productos.

---

## 🚀 Características Principales

### 🔎 Búsqueda

* Input con validación mínima de caracteres.
* Limpieza del filtro cuando el usuario borra el texto.
* Se integra directamente con paginación y filtros.

### 🎚 Filtros Avanzados

Filtros combinables y totalmente controlados:

* **name:** búsqueda parcial.
* **isAvailable:** disponibilidad (stock > 0).
* **minPrice / maxPrice:** rango de precios.

### 📄 Paginación

* Sistema **Anterior / Siguiente**.
* Mantiene búsqueda y filtros entre páginas.
* Implementada con un componente reutilizable `PaginationLayout`.

### 🧱 Componentización

* `Products` → página principal.
* `ProductComponent` → tarjeta de producto.
* `ProductFilter` → filtros por precio y disponibilidad.
* `SearchBar` → búsqueda controlada.
* `PaginationLayout` → lógica genérica de paginación.

---

## 🧩 Tecnologías Utilizadas

* React 19
* TypeScript
* Vite
* TailwindCSS
* Fetch API
* React Hooks

---

## 📂 Estructura del Proyecto

```
src/
 ├── components/
 │    ├── Products/
 │    │     ├── Product.tsx
 │    │     ├── ProductFilter.tsx
 │    │     └── Products.tsx
 │    ├── UI/
 │    │     └── SearchBar.tsx
 │    └── layouts/
 │          └── PaginationLayout.tsx
 ├── types/
 │     └── index.d.ts
 └── App.tsx
```

---

## 🔌 Integración con Backend

El backend expone la API en:

```
GET http://localhost:8080/api/v1/products
```

Los filtros y la paginación se envían como query params, por ejemplo:

```
/products?page=0&name=phone&minPrice=100&isAvailable=true
```

👉 **Backend Repository:** [shop-java-api](https://github.com/fernandohuerta824/shop-java-api)

---

## 📦 Instalación y Ejecución

```bash
git clone https://github.com/fernandohuerta824/shop-react-app
cd products-frontend
npm install
npm run dev
```

---

## 🚧 Próximas Funcionalidades (To-Do)

Esta interfaz está construida para ser el **CRUD completo de productos**.
Las siguientes partes están en desarrollo:

* ➕ Crear nuevos productos
* ✏️ Actualizar productos existentes
* 🔍 Ver información detallada de cada producto
* ❌ Eliminar productos
* 🧪 Validaciones adicionales en formularios

