import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    // Kiểm tra dữ liệu nhập
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      // Gửi yêu cầu POST đến server
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // Nếu có lỗi từ server
      if (!res.ok) {
        throw new Error(`Failed to create product: ${res.statusText}`);
      }

      const data = await res.json();

      // Cập nhật state
      set((state) => ({
        products: [...state.products, data.data],
      }));

      // Trả về kết quả thành công
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      // Bắt lỗi và trả về thông báo lỗi
      console.error("Error creating product:", error);
      return { success: false, message: error.message };
    }
  },
}));
