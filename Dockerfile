# Use uma imagem base com Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo de dependências para o container
COPY package.json package-lock.json ./ 

# Instale as dependências com npm
RUN npm install --legacy-peer-deps

# Copie todo o código-fonte para o container
COPY . .

# Build da aplicação Next.js para produção
RUN npm run build

# Expor a porta que a aplicação irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
