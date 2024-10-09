import {baseURL} from "../constants/urls";


const getAll = async () => {
    const response = await fetch(`${baseURL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products;
};


const productService = {
    getAll
};

export {
    productService
};
