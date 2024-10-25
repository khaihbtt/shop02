import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error(`Failed to create product: ${res.statusText}`);
      }

      const data = await res.json();
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: error.message };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/products");
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
      }
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/products/${pid}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: error.message };
    }
  },
  updateProduct: async (pid, updateProduct) => {
    try {
      const res = await fetch(`/products/${pid}`, {
        method: "PUT", // Hoặc "PATCH" nếu chỉ cập nhật một số trường
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to update product: ${res.statusText}`);
      }
  
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
  
      // Cập nhật danh sách sản phẩm
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
  
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: error.message };
    }
  }
  
}));
