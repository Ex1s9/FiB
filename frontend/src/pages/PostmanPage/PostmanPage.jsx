import React from "react";
import "./PostmanPage.scss";

const screenshots = [
    { id: 1, title: "GET /api/products — Получение всех товаров", file: "get_all.png" },
    { id: 2, title: "GET /api/products/:id — Получение товара по ID", file: "get_by_id.png" },
    { id: 3, title: "POST /api/products — Создание нового товара", file: "post_create.png" },
    { id: 4, title: "PATCH /api/products/:id — Обновление товара", file: "patch_update.png" },
    { id: 5, title: "DELETE /api/products/:id — Удаление товара", file: "delete.png" },
    { id: 6, title: "Внешний API — Запрос 1", file: "external_1.png" },
    { id: 7, title: "Внешний API — Запрос 2", file: "external_2.png" },
    { id: 8, title: "Внешний API — Запрос 3", file: "external_3.png" },
    { id: 9, title: "Внешний API — Запрос 4", file: "external_4.png" },
    { id: 10, title: "Внешний API — Запрос 5", file: "external_5.png" },
];

export default function PostmanPage() {
    return (
        <div className="postman">
            <div className="postman__container">
                <h1 className="postman__title">Тестирование API (Postman)</h1>

                <section className="postman__section">
                    <h2 className="postman__subtitle">Тестирование собственного API</h2>
                    <p className="postman__desc">
                        Ниже представлены результаты тестирования CRUD-операций нашего API с помощью Postman.
                    </p>
                    <div className="postman__grid">
                        {screenshots.filter(s => s.id <= 5).map(s => (
                            <div className="postman__card" key={s.id}>
                                <div className="postman__card-title">{s.title}</div>
                                <div className="postman__card-img">
                                    <img src={`/postman/${s.file}`} alt={s.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="postman__section">
                    <h2 className="postman__subtitle">Тестирование внешнего API</h2>
                    <p className="postman__desc">
                        Результаты запросов к внешнему публичному API.
                    </p>
                    <div className="postman__grid">
                        {screenshots.filter(s => s.id > 5).map(s => (
                            <div className="postman__card" key={s.id}>
                                <div className="postman__card-title">{s.title}</div>
                                <div className="postman__card-img">
                                    <img src={`/postman/${s.file}`} alt={s.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
