# Projeto Fullstack WagerVendas

Este projeto utiliza as seguintes tecnologias:

- **React + Tailwind CSS** no frontend
- **Node.js + Express** no backend
- **MariaDB** como banco de dados
- **Docker + Docker Compose** para orquestração

## Como rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop) e Docker Compose instalados  
- [Node.js](https://nodejs.org/) e npm (caso deseje rodar localmente sem Docker)

---

### Clonar o repositório

```bash
git clone https://github.com/FiJan-dev/WagerVendas.git
cd WagerVendas
```

### Configurar variaveis de ambiente

- **Fazer o .env com base no .env.example**

### Criar e iniciar os containers

```bash
docker-compose up --build
```

### Acessar o projeto
 - *Frontend:* http://localhost:3000
 - *Backend:* http://localhost:5000
