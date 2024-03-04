# Выбираем базовый образ
FROM node:latest

# Создаем директорию приложения
WORKDIR /usr/src/app

# Копируем файлы проекта
COPY ./server/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY ./server/ .

# Экспортируем порт
EXPOSE 3001

# Запускаем сервер
CMD ["node", "server.js"]