import React, { useState } from 'react';
import { IProduct } from "../../interfaces/IProduct";
import styles from './ProductModal.module.css'

interface ProductModalProps {
    onClose: () => void;
    onSubmit: (product: IProduct) => void;
    product?: IProduct | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onSubmit, product }) => {
    const [title, setTitle] = useState(product ? product.title : '');
    const [stock, setStock] = useState(product ? product.stock : 0);
    const [weight, setWeight] = useState(product ? product.weight : 0);
    const [dimensions, setDimensions] = useState({
        width: product ? product.dimensions.width : 0,
        height: product ? product.dimensions.height : 0,
    });

    const handleSubmit = () => {
        if (title && stock > 0) {
            const newProduct: IProduct = {
                id: product ? product.id : Date.now(),
                images: [],
                title,
                stock,
                weight,
                dimensions,
                reviews: [],
            };
            onSubmit(newProduct);
            onClose();
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
                <div className={styles.wrapperModal}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Product Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Stock</label>
                        <input
                            type="number"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Weight</label>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Width</label>
                        <input
                            type="number"
                            placeholder="Width"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Height</label>
                        <input
                            type="number"
                            placeholder="Height"
                            value={dimensions.height}
                            onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
                            className={styles.input}
                        />
                    </div>
                    <button onClick={handleSubmit} className={styles.buttonSubmit}>{product ? 'Update' : 'Add'}</button>
                    <button onClick={onClose} className={styles.buttonCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
