# TechStore — Интернет-магазин электроники

Проект выполнен в рамках практических занятий 1–4 по дисциплине «Фронтенд и бэкенд разработка».

## Структура проекта

```
├── backend/                          # Серверная часть (Express.js)
│   ├── app.js                        # Основной файл сервера с CRUD API
│   └── package.json
│
├── frontend/                         # Клиентская часть (React + SASS)
│   ├── public/
│   │   ├── postman/                  # Скриншоты тестирования в Postman
│   │   │   ├── get_all.png           # GET /api/products
│   │   │   ├── get_by_id.png         # GET /api/products/:id
│   │   │   ├── post_create.png       # POST /api/products
│   │   │   ├── patch_update.png      # PATCH /api/products/:id
│   │   │   ├── delete.png            # DELETE /api/products/:id
│   │   │   ├── external_1.png        # Внешний API — запросы 1–5
│   │   │   ├── external_2.png
│   │   │   ├── external_3.png
│   │   │   ├── external_4.png
│   │   │   └── external_5.png
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js              # Axios-клиент для запросов к API
│   │   ├── components/
│   │   │   ├── ProductCard.jsx       # Карточка товара
│   │   │   ├── ProductList.jsx       # Список карточек
│   │   │   └── ProductModal.jsx      # Модалка создания/редактирования
│   │   ├── pages/
│   │   │   ├── StorePage/
│   │   │   │   ├── StorePage.jsx     # Страница «Магазин»
│   │   │   │   └── StorePage.scss    # SASS-стили (переменные, миксины, вложенность)
│   │   │   └── PostmanPage/
│   │   │       ├── PostmanPage.jsx   # Страница «Скриншоты Postman»
│   │   │       └── PostmanPage.scss
│   │   ├── App.js                    # Роутинг и навигация
│   │   ├── App.css                   # Глобальные стили
│   │   └── index.js                  # Точка входа React
│   └── package.json
│
└── README.md
```

## Какие практики покрывает проект

| Практика | Тема | Что реализовано |
|----------|------|-----------------|
| ПР1 | CSS-препроцессоры (SASS) | Переменные, миксины, вложенность в `frontend/src/pages/StorePage/StorePage.scss` |
| ПР2 | Express.js API | CRUD для товаров в `backend/app.js` |
| ПР3 | JSON + Postman | Скриншоты в `frontend/public/postman/`, отображаются на странице «Скриншоты Postman» |
| ПР4 | React + API | Связка фронтенда и бэкенда, интернет-магазин |

## Как запустить

### 1. Клонировать репозиторий

```bash
git clone git@github.com:Ex1s9/FiB.git
cd FiB
```

### 2. Установить зависимости

```bash
# Бэкенд
cd backend
npm install

# Фронтенд
cd ../frontend
bun install
```

### 3. Запустить

Нужно два терминала:

```bash
# Терминал 1 — запуск сервера (порт 3000)
cd backend
npm start

# Терминал 2 — запуск клиента (порт 3001)
cd frontend
bun start
```

После запуска открыть в браузере: [http://localhost:3001](http://localhost:3001)

## Страницы приложения

- **Магазин** (`/`) — каталог товаров с возможностью добавления, редактирования и удаления
- **Скриншоты Postman** (`/postman`) — результаты тестирования API в Postman (собственный + внешний API)

## Скриншоты тестирования Postman

Расположены в `frontend/public/postman/`:

**Собственный API:**
- `get_all.png` — GET /api/products
- `get_by_id.png` — GET /api/products/:id
- `post_create.png` — POST /api/products
- `patch_update.png` — PATCH /api/products/:id
- `delete.png` — DELETE /api/products/:id

**Внешний API (JSONPlaceholder):**
- `external_1.png` — `external_5.png`

## Технологии

- **Frontend:** React, SASS, Axios, React Router
- **Backend:** Node.js, Express.js, CORS, nanoid
