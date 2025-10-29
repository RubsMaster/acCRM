FROM node:20-alpine

# Instalar dependencias del sistema que a veces requieren módulos nativos
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Solo package*.json para cachear capas
COPY package*.json ./

# Dependencias de producción
RUN npm ci --omit=dev

# Copiamos el resto del código
COPY . .

# Asegura modo producción
ENV NODE_ENV=production

# Expone el puerto interno de la API
EXPOSE 9899

# Arranque (ajusta si usas otro script)
CMD ["node", "src/index.js"]
