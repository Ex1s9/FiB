const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

// Middleware для логирования запросов
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

// Swagger-конфигурация
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TechStore API',
            version: '1.0.0',
            description: 'API интернет-магазина электроники. CRUD-операции над товарами.',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара в рублях
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *         rating:
 *           type: number
 *           description: Рейтинг товара (0–5)
 *         image:
 *           type: string
 *           description: URL изображения товара
 *       example:
 *         id: "abc123"
 *         name: "iPhone 15 Pro"
 *         category: "Смартфоны"
 *         description: "Флагманский смартфон Apple с чипом A17 Pro"
 *         price: 89990
 *         stock: 25
 *         rating: 4.8
 *         image: "https://picsum.photos/seed/iphone/300/200"
 */

let products = [
    { id: nanoid(6), name: "iPhone 15 Pro", category: "Смартфоны", description: "Флагманский смартфон Apple с чипом A17 Pro", price: 89990, stock: 25, rating: 4.8, image: "https://picsum.photos/seed/iphone/300/200" },
    { id: nanoid(6), name: "Samsung Galaxy S24", category: "Смартфоны", description: "Флагман Samsung с AI-функциями и AMOLED экраном", price: 79990, stock: 30, rating: 4.7, image: "https://picsum.photos/seed/samsung/300/200" },
    { id: nanoid(6), name: "MacBook Air M3", category: "Ноутбуки", description: "Тонкий и лёгкий ноутбук Apple с чипом M3", price: 109990, stock: 15, rating: 4.9, image: "https://picsum.photos/seed/macbook/300/200" },
    { id: nanoid(6), name: "ASUS ROG Strix G16", category: "Ноутбуки", description: "Игровой ноутбук с RTX 4060 и экраном 165 Гц", price: 94990, stock: 10, rating: 4.6, image: "https://picsum.photos/seed/asus/300/200" },
    { id: nanoid(6), name: "Sony WH-1000XM5", category: "Наушники", description: "Беспроводные наушники с лучшим шумоподавлением", price: 29990, stock: 40, rating: 4.8, image: "https://picsum.photos/seed/sony/300/200" },
    { id: nanoid(6), name: "AirPods Pro 2", category: "Наушники", description: "TWS наушники Apple с адаптивным шумоподавлением", price: 19990, stock: 50, rating: 4.7, image: "https://picsum.photos/seed/airpods/300/200" },
    { id: nanoid(6), name: "iPad Air M2", category: "Планшеты", description: "Планшет Apple с чипом M2 и экраном 11 дюймов", price: 59990, stock: 20, rating: 4.6, image: "https://picsum.photos/seed/ipad/300/200" },
    { id: nanoid(6), name: "Logitech MX Master 3S", category: "Аксессуары", description: "Эргономичная беспроводная мышь для профессионалов", price: 7990, stock: 60, rating: 4.9, image: "https://picsum.photos/seed/mouse/300/200" },
    { id: nanoid(6), name: "Keychron K8 Pro", category: "Аксессуары", description: "Механическая клавиатура с Bluetooth и RGB подсветкой", price: 8990, stock: 35, rating: 4.5, image: "https://picsum.photos/seed/keyboard/300/200" },
    { id: nanoid(6), name: "Samsung Odyssey G5", category: "Мониторы", description: "27-дюймовый изогнутый игровой монитор 144 Гц", price: 24990, stock: 18, rating: 4.4, image: "https://picsum.photos/seed/monitor/300/200" },
    { id: nanoid(6), name: "Xiaomi Mi Band 8", category: "Аксессуары", description: "Фитнес-браслет с AMOLED экраном и датчиком SpO2", price: 3490, stock: 100, rating: 4.3, image: "https://picsum.photos/seed/miband/300/200" },
    { id: nanoid(6), name: "JBL Charge 5", category: "Аудио", description: "Портативная Bluetooth-колонка с защитой IP67", price: 12990, stock: 45, rating: 4.6, image: "https://picsum.photos/seed/jbl/300/200" },
];

function findProductOr404(id, res) {
    const product = products.find(p => p.id === id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return null;
    }
    return product;
}

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/api/products", (req, res) => {
    res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get("/api/products/:id", (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;
    res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создаёт новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Не переданы обязательные поля
 */
app.post("/api/products", (req, res) => {
    const { name, category, description, price, stock, rating, image } = req.body;

    if (!name || !category || !description || price === undefined || stock === undefined) {
        return res.status(400).json({ error: "Fields name, category, description, price, stock are required" });
    }

    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        rating: rating !== undefined ? Number(rating) : 0,
        image: image || "https://picsum.photos/seed/default/300/200",
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновлённый товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет полей для обновления
 *       404:
 *         description: Товар не найден
 */
app.patch("/api/products/:id", (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;

    const { name, category, description, price, stock, rating, image } = req.body;

    if (
        name === undefined &&
        category === undefined &&
        description === undefined &&
        price === undefined &&
        stock === undefined &&
        rating === undefined &&
        image === undefined
    ) {
        return res.status(400).json({ error: "Nothing to update" });
    }

    if (name !== undefined) product.name = name.trim();
    if (category !== undefined) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (rating !== undefined) product.rating = Number(rating);
    if (image !== undefined) product.image = image;

    res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удалён (тело ответа отсутствует)
 *       404:
 *         description: Товар не найден
 */
app.delete("/api/products/:id", (req, res) => {
    const exists = products.some(p => p.id === req.params.id);
    if (!exists) return res.status(404).json({ error: "Product not found" });

    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
});

// 404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`Swagger UI доступен по адресу http://localhost:${port}/api-docs`);
});
