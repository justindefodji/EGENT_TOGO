ARG UBUNTU_VERSION=22.04
ARG NODE_VERSION=22.12.0

FROM ubuntu:22.04 AS builder
ARG NODE_VERSION
ARG UBUNTU_VERSION
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install node from nvm
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION} \
    && nvm use default

ENV PATH=${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Remove development dependencies to reduce image size
RUN npm prune --production
