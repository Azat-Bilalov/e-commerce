import { api, Product } from '@/configs/api';
import { AxiosError } from 'axios';

export const productLoader = async ({ params }: any): Promise<Product> => {
  const { id } = params;
  try {
    const res = await api.get<Product>(`products/${id}`);
    return res.data;
  } catch (error: AxiosError | any) {
    throw new Response(error.message, {
      status: error.response?.status,
    });
  }
};
