const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3000';
  }
  
  return 'https://marketeer.onrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/api/products`,
    GET_ONE: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    CREATE: `${API_BASE_URL}/api/products`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/products/${id}`,
    MY_PRODUCTS: `${API_BASE_URL}/api/products/my/products`,
  },
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  status: "Instock" | "Outofstock";
  otherImages?: string[];
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const productService = {
  async getAllProducts(filters?: { category?: string; status?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const url = filters ? `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${params}` : API_ENDPOINTS.PRODUCTS.GET_ALL;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: string) {
    const response = await fetch(API_ENDPOINTS.PRODUCTS.GET_ONE(id));
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async addProduct(productData: Omit<Product, '_id' | 'seller' | 'createdAt' | 'updatedAt'>) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINTS.PRODUCTS.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async updateProduct(id: string, productData: Partial<Product>) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINTS.PRODUCTS.UPDATE(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINTS.PRODUCTS.DELETE(id), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  async getMyProducts() {
    const token = localStorage.getItem('token');
    const response = await fetch(API_ENDPOINTS.PRODUCTS.MY_PRODUCTS, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch your products');
    return response.json();
  },
};