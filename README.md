# 🏦 Fintech Dashboard

![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Um painel administrativo (Dashboard) front-end para gestão financeira pessoal. O projeto simula uma interface bancária moderna, permitindo a visualização de saldos, investimentos e a simulação de transferências via Pix.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias web modernas, focando em responsividade e experiência do usuário (UI/UX).

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5**: Estrutura semântica das páginas.
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **CSS3**: Estilização avançada com uso de **CSS Variables** (`:root`) para temas e consistência visual.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **JavaScript (Vanilla)**: Lógica de interação, manipulação do DOM e simulação de regras de negócio (sem frameworks JS pesados).
* ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap 5.3**: Utilizado para o sistema de Grid, responsividade e componentes base.
* ![Bootstrap Icons](https://img.shields.io/badge/Icons-Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap Icons**: Biblioteca de ícones vetoriais.
* ![Google Fonts](https://img.shields.io/badge/Fonts-Poppins-OFL?style=flat&logo=google-fonts&logoColor=white) **Google Fonts**: Tipografia utilizando a fonte *Poppins*.

## 📱 Funcionalidades

O projeto conta com três telas principais interconectadas:

### 1. 📊 Dashboard (`index.html`)
* Visão geral do saldo, valor investido e despesas (fatura).
* Cards com indicadores de crescimento mensal.
* Tabela de últimas movimentações com status coloridos (Pago, Recebido, Pendente).
* Barras de progresso para metas financeiras e categorias de gastos.

### 2. 📈 Investimentos (`investimentos.html`)
* Resumo visual da carteira (Renda Fixa vs. Variável).
* Lista detalhada de ativos (Tesouro, FIIs, Ações) com rentabilidade e vencimento.
* Badges personalizadas para categorização de ativos.
* Botões de ação para aporte e visualização de detalhes.

### 3. 💸 Transferências e Pix (`transferir.html`)
* Interface para realização de transferências.
* Seleção interativa de contatos frequentes (com efeito visual de seleção).
* Formulário com validação simples de saldo (simulado via JS).
* Preenchimento automático de chave Pix ao selecionar um contato.

## 📂 Estrutura do Projeto

```text
Fintech-master/
├── Assets/
│   ├── Css/
│   │   ├── style.css         # Estilos gerais e do Dashboard
│   │   ├── investimento.css  # Estilos específicos da pág. de Investimentos
│   │   └── transferir.css    # Estilos específicos da pág. de Transferências
│   ├── Js/
│   │   └── sript.js          # Lógica global e específica por página
│   └── Pages/
│       ├── index.html        # Tela Inicial (Dashboard)
│       ├── investimentos.html
│       └── transferir.html
└── README.md
```


## 🎨 Destaques de UI/UX
* Design System: Uso consistente de paleta de cores moderna (Azul Fintech, Cinza Slate) definida via variáveis CSS.
* Sidebar Responsiva: Menu lateral que se adapta a dispositivos móveis (toggle button).
* Feedback Visual: Efeitos de hover em cards e tabelas, e alertas interativos (via alert do navegador) para simular ações de backend.

🔧 Como Executar
* Este é um projeto estático, não requer instalação de dependências via npm para visualização básica.
1. Clone este repositório:

* Bash
git clone [https://github.com/GabrielBaldini1998/Fintech.git](https://github.com/GabrielBaldini1998/Fintech.git)

2. Navegue até a pasta do projeto.

3. Abra o arquivo Assets/Pages/index.html em seu navegador de preferência.

Nota: Para que os ícones e fontes carreguem corretamente, é necessário estar conectado à internet (visto que são carregados via CDN).

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

Desenvolvido com 💙 por Gabriel Baldini
