FROM node:alpine

WORKDIR /app

COPY next-env.d.ts next-env.d.ts
COPY next.config.mjs next.config.mjs
COPY package-lock.json package-lock.json
COPY package.json package.json
COPY postcss.config.mjs postcss.config.mjs
COPY tailwind.config.ts tailwind.config.ts
COPY tsconfig.json tsconfig.json

RUN npm install

COPY . .

