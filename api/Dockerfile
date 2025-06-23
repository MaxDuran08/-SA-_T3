# Imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto (ajusta si tu backend usa otro)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
