CREATE DATABASE vendas;

CREATE TABLE produto(

	id bigSerial not null PRIMARY KEY,
	nome varchar(100) not null,
	descricao varchar(255),
	preco numeric(16,2),
	sku varchar(100),
	data_cadastro date
)