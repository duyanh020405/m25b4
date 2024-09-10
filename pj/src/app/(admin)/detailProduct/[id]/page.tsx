import { notFound } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  img: string;
  description: string;
  price: number;
}

async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Product not found');
  }
}

export default async function DetailProduct({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await fetchProduct(id);

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{product.name}</h1>
        <div className="relative overflow-hidden rounded-lg shadow-lg mb-6">
          <Image
            src={product.img}
            alt={product.name}
            width={1200}
            height={800}
            className="object-cover w-full h-72 md:h-96"
          />
        </div>
        <p className="text-base text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-gray-800 mb-6">Price: {product.price} VND</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
          Buy Now
        </button>
      </div>
    );
  } catch (error) {
    notFound(); // Handles not found cases
  }
}
