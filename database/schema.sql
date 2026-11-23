create table usuarios (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha_hash varchar(255) not null,
    criado_em datetime default current_timestamp
);

create table movimentacoes (
    id int auto_increment primary key,
    usuario_id int not null,
    tipo enum('Entrada', 'Saida') not null,
    descricao varchar(120) not null,
    valor decimal(10, 2) not null,
    data_movimentacao datetime not null default current_timestamp,
    criado_em datetime default current_timestamp,
    foreign key (usuario_id) references usuarios(id)
);