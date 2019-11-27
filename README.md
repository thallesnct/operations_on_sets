# Conjuntos

Esse repositório contém uma API e uma aplicação em React demonstrando as operações possíveis de conjuntos

# API

A API realiza as operações possíveis sobre conjuntos.

## Guia de Instalação

Clone o repositório

```bash
  $ git clone https://github.com/thallesnct/operations_on_sets.git
  $ cd operations_on_sets/api
```

Inicie o ambiente virtual

```bash
  $ python3 -m venv env
  $ source env/bin/activate
```

Instale as dependências do projeto

```bash
  $ python3 -m pip install -r dependencies.txt
```

Defina o arquivo para o Flask rodar

```bash
  $ FLASK_APP=app.py
```

Rode o projeto

```bash
  $ flask run
```

Agora é possivel acessar a API pela rota [http://localhost:5000](http://localhost:5000)

# React

Clone o repositório, caso não tenha clonado na configuração da API

```bash
  $ git clone https://github.com/thallesnct/operations_on_sets.git
```

Navegue até a pasta do projeto

```bash
  $ cd operations_on_sets/api
```

Instale as dependências do projeto (utilize o instalador de pacotes de sua preferência)

```bash
  $ yarn
  $ npm install
```

Rode o projeto (utilize o instalador de pacotes de sua preferência)

```bash
  $ yarn start
  $ npm start
```

Agora é possivel visualizar a aplicação em [http://localhost:3000](http://localhost:3000)
