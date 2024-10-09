import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState, AppDispatch, addProduct, deleteProduct, editProduct, fetchProducts} from '../../store';
import ProductModal from "../productModal/ProductModal";
import styles from './ProductList.module.css';
import {IProduct} from "../../interfaces/IProduct";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);
    const [sort, setSort] = useState('alphabetical');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === 'alphabetical') {
            return a.title.localeCompare(b.title);
        } else if (sort === 'count') {
            return b.stock - a.stock;
        }
        return 0;
    });

    const handleAddProduct = (newProduct: IProduct) => {
        dispatch(addProduct(newProduct));
    };

    const handleDeleteProduct = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEditProduct = (updatedProduct: IProduct) => {
        dispatch(editProduct(updatedProduct));
        setEditingProduct(null);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.controlBlock}>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="alphabetical">Sort by Name</option>
                    <option value="count">Sort by Count</option>
                </select>

                <button className={styles.addButton} onClick={() => {
                    setIsModalOpen(true);
                    setEditingProduct(null);
                }}>Add Product
                </button>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p>Error: {error}</p>}

            <ul className={styles.productsList}>
                {sortedProducts.map(product => (
                    <li key={product.id} className={styles.listItem}>
                        <img src={product.images[0]} alt={product.title} className={styles.productImage}/>
                        <div className={styles.productDetails}>
                            <h2 className={styles.productTitle}>{product.title}</h2>
                            <span>In stock: {product.stock}</span>
                            <span>Dimensions: {product.dimensions.width} x {product.dimensions.height} cm</span>
                            <span>Weight: {product.weight}g</span>
                            <div className={styles.reviewsWrapper}>
                                {product.reviews.map((review, index) => (
                                    <div key={index} className={styles.reviewItem}>
                                        <div className={styles.reviewerName}>{review.reviewerName}</div>
                                        <div className={styles.reviewRating}>Rating: {review.rating}/5</div>
                                        <div className={styles.reviewComment}>{review.comment}</div>
                                        <div
                                            className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.productActions}>
                            <button onClick={() => {
                                setEditingProduct(product);
                                setIsModalOpen(true);
                            }}>Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && (
                <ProductModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                    product={editingProduct}
                />
            )}
        </div>
    );
};

export default ProductList;
