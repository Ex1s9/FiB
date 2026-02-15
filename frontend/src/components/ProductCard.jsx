import React from "react";

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="card">
            <img className="card__image" src={product.image} alt={product.name} />
            <div className="card__body">
                <div className="card__category">{product.category}</div>
                <h3 className="card__title">{product.name}</h3>
                <p className="card__description">{product.description}</p>
                <div className="card__meta">
                    <span className="card__price">{product.price.toLocaleString("ru-RU")} &#8381;</span>
                    <span className="card__stock">
                        {product.stock > 0 ? `В наличии: ${product.stock}` : "Нет в наличии"}
                    </span>
                </div>
                <div className="card__rating">
                    {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
                    <span className="card__rating-value">{product.rating}</span>
                </div>
                <div className="card__actions">
                    <button className="btn" onClick={() => onEdit(product)}>Редактировать</button>
                    <button className="btn btn--danger" onClick={() => onDelete(product.id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}
