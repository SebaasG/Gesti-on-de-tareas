# Usa una imagen base de Node.js
FROM node:20.11.0

# # Instala las dependencias de MySQL
# RUN apt-get update && \
#     apt-get install -y mysql-server && \
#     rm -rf /var/lib/apt/lists/*

# # Establece el directorio de trabajo en /app
# WORKDIR /app

# # Copia los archivos package.json y package-lock.json
# COPY package*.json ./

# # Instala las dependencias de Node.js
# RUN npm install

# # Copia el código fuente de la aplicación
# COPY . .

# # Expón el puerto 3000 para la aplicación Node.js
# EXPOSE 3000

# # Comando por defecto para iniciar la aplicación
# CMD ["node", "index.js"]
