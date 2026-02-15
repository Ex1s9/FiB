import React, { useEffect, useState } from "react";

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
    const [form, setForm] = useState({ name: "", category: "", description: "", price: "", stock: "", rating: "", image: "" });

    useEffect(() => {
        if (!open) return;
        if (initialProduct) {
            setForm({
                name: initialProduct.name || "",
                category: initialProduct.category || "",
                description: initialProduct.description || "",
                price: String(initialProduct.price ?? ""),
                stock: String(initialProduct.stock ?? ""),
                rating: String(initialProduct.rating ?? ""),
                image: initialProduct.image || "",
            });
        } else {
            setForm({ name: "", category: "", description: "", price: "", stock: "", rating: "", image: "" });
        }
    }, [open, initialProduct]);

    if (!open) return null;

    const title = mode === "edit" ? "Редактирование товара" : "Добавление товара";

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) { alert("Введите название"); return; }
        if (!form.category.trim()) { alert("Введите категорию"); return; }
        if (!form.description.trim()) { alert("Введите описание"); return; }

        onSubmit({
            id: initialProduct?.id,
            name: form.name,
            category: form.category,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
            rating: Number(form.rating) || 0,
            image: form.image || undefined,
        });
    };

    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="modal__header">
                    <div className="modal__title">{title}</div>
                    <button className="iconBtn" onClick={onClose} aria-label="Закрыть">&#10005;</button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label className="label">
                        Название
                        <input className="input" value={form.name} onChange={handleChange("name")} placeholder="iPhone 15 Pro" autoFocus />
                    </label>
                    <label className="label">
                        Категория
                        <input className="input" value={form.category} onChange={handleChange("category")} placeholder="Смартфоны" />
                    </label>
                    <label className="label">
                        Описание
                        <textarea className="input input--textarea" value={form.description} onChange={handleChange("description")} placeholder="Описание товара..." />
                    </label>
                    <div className="form__row">
                        <label className="label">
                            Цена
                            <input className="input" value={form.price} onChange={handleChange("price")} placeholder="89990" inputMode="numeric" />
                        </label>
                        <label className="label">
                            На складе
                            <input className="input" value={form.stock} onChange={handleChange("stock")} placeholder="25" inputMode="numeric" />
                        </label>
                        <label className="label">
                            Рейтинг
                            <input className="input" value={form.rating} onChange={handleChange("rating")} placeholder="4.8" inputMode="decimal" />
                        </label>
                    </div>
                    <label className="label">
                        URL изображения
                        <input className="input" value={form.image} onChange={handleChange("image")} placeholder="https://..." />
                    </label>
                    <div className="modal__footer">
                        <button type="button" className="btn" onClick={onClose}>Отмена</button>
                        <button type="submit" className="btn btn--primary">{mode === "edit" ? "Сохранить" : "Добавить"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
