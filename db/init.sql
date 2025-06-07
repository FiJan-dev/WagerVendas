CREATE DATABASE IF NOT EXISTS wagerdb;
USE wagerdb;

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) UNIQUE NOT NULL,
    senha_usuario VARCHAR(50) NOT NULL,
    cpf_usuario VARCHAR(11) UNIQUE NOT NULL,
    endereco_usuario VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS metodosPG(
  id_metodo INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  tipo VARCHAR(50),
  valor VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS produtos(
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome_produto VARCHAR(50) NOT NULL,
    desc_produto TEXT,
    preco_produto DECIMAL(10,3) NOT NULL,
    categoria_produto VARCHAR(50),
    id_vendedor INT, 
    FOREIGN KEY (id_vendedor) REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS midias (
  id_midia INT AUTO_INCREMENT PRIMARY KEY,
  ordem INT NOT NULL,
  img_url MEDIUMTEXT NOT NULL,
  id_produto INT NOT NULL,
  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS lista_de_desejos (
    id_lista INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    status_pedido ENUM('carrinho', 'finalizado', 'cancelado') DEFAULT 'carrinho',
    data_criacao_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);