/* ==========================================================================
   ARQUIVO: sript.js
   DESCRIÇÃO: Arquivo JavaScript principal da aplicação Fintech
   CONTROLA: Todas as funcionalidades globais e específicas por página
   ========================================================================== */

/* ==========================================================================
   CAMADA 1: CONFIGURAÇÃO E INICIALIZAÇÃO (CORE)
   Objetivo: Garantir que o DOM esteja carregado antes de executar scripts.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Sistema Fintech carregado com sucesso.");
    
    initGlobalFeatures();
    initPageSpecifics();
});

/* ==========================================================================
   CAMADA 2: FUNCIONALIDADES GLOBAIS (NAVEGAÇÃO E UI)
   Objetivo: Controlar elementos que aparecem em todas as páginas.
   ========================================================================== */

function initGlobalFeatures() {
    // Menu Toggle (Hambúrguer)
    initMenuToggle();
    
    // Botão Sair
    initBotaoSair();
}

function initMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle");

    // Verifica se o botão existe na página atual para evitar erros
    if (menuToggle) {
        menuToggle.onclick = function(e) {
            e.preventDefault();
            // Adiciona ou remove a classe "toggled" no body para mostrar/esconder sidebar
            document.body.classList.toggle("toggled");
        };
    }
}

function initBotaoSair() {
    // Botão Sair na barra lateral
    const btnSair = document.querySelector(".bi-box-arrow-left");
    if (btnSair) {
        const linkSair = btnSair.closest("a");
        if (linkSair) {
            linkSair.addEventListener("click", function(e) {
                e.preventDefault();
                alert("Você não está logado ainda, estamos projetando isso na sprint atual");
            });
        }
    }
}

/* ==========================================================================
   CAMADA 3: LÓGICA ESPECÍFICA POR PÁGINA
   Objetivo: Executar scripts apenas nas telas onde eles são necessários.
   ========================================================================== */

function initPageSpecifics() {
    // Verifica em qual página estamos através da existência de elementos
    
    // Página de Transferência
    const formTransferencia = document.querySelector("form");
    if (formTransferencia && document.querySelector("input[placeholder='Digite a chave Pix']")) {
        setupTransferPage();
    }

    // Página de Investimentos
    const btnNovoAporte = document.querySelector(".bi-plus-lg");
    if (btnNovoAporte && document.title.includes("Investimentos")) {
        setupInvestimentosPage();
    }
    
    // Dashboard - Botão Nova Receita
    const btnNovaReceita = document.querySelector(".bi-plus-lg");
    if (btnNovaReceita && !formTransferencia) {
        btnNovaReceita.parentNode.addEventListener("click", function(e) {
            e.preventDefault();
            alert("Funcionalidade de Nova Receita será implementada na próxima sprint!");
        });
    }
}

/* ==========================================================================
   CAMADA 4: FUNÇÕES DE REGRA DE NEGÓCIO E INTERAÇÃO
   Objetivo: Detalhar o comportamento específico de cada funcionalidade.
   ========================================================================== */

// --- Lógica para Página de Transferências ---
function setupTransferPage() {
    // Seleção de Contatos Frequentes
    const contatos = document.querySelectorAll(".contact-item");
    const inputChave = document.querySelector("input[placeholder='Digite a chave Pix']");

    contatos.forEach(contato => {
        contato.addEventListener("click", function() {
            // Remove seleção visual de todos
            contatos.forEach(c => {
                const avatar = c.querySelector(".avatar");
                if (avatar) avatar.classList.remove("selected");
            });
            
            // Adiciona seleção visual ao clicado
            const nome = this.querySelector("small")?.innerText || "";
            const avatar = this.querySelector(".avatar");
            if (avatar) avatar.classList.add("selected");
            
            // Simula preenchimento automático
            if(inputChave && nome) {
                inputChave.value = `chave-pix-${nome.toLowerCase().replace(" ", ".")}@email.com`;
                // Efeito visual de "flash" no input para mostrar que mudou
                inputChave.classList.add("input-chave-flash");
                setTimeout(() => inputChave.classList.remove("input-chave-flash"), 300);
            }
        });
    });

    // Validação e Envio do Formulário
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o recarregamento da página
            
            const valorInput = form.querySelector("input[type='number']");
            const valor = parseFloat(valorInput?.value || 0);

            if (!valor || valor <= 0) {
                alert("Por favor, insira um valor válido para a transferência.");
                if (valorInput) valorInput.focus();
                return;
            }

            if (valor > 5240) { // Simulando validação de saldo (valor hardcoded do HTML)
                alert("Saldo insuficiente para esta transação.");
                return;
            }

            // Simulação de Sucesso
            alert(`Transferência de R$ ${valor.toFixed(2)} realizada com sucesso!`);
            form.reset(); // Limpa o formulário
            
            // Remove seleção dos contatos
            contatos.forEach(c => {
                const avatar = c.querySelector(".avatar");
                if (avatar) avatar.classList.remove("selected");
            });
        });
    }
}

// --- Lógica para Página de Investimentos ---
function setupInvestimentosPage() {
    const botoesAcao = document.querySelectorAll(".btn-sm");
    
    botoesAcao.forEach(btn => {
        btn.addEventListener("click", function() {
            // Verifica qual botão foi clicado pelo ícone
            if (this.querySelector(".bi-eye")) {
                alert("Abrindo detalhes do investimento...");
            } else if (this.querySelector(".bi-cash")) {
                const linha = this.closest("tr");
                const nomeAtivo = linha?.querySelector("p.fw-bold")?.innerText || "investimento";
                const confirmacao = confirm(`Deseja realmente resgatar o investimento ${nomeAtivo}?`);
                
                if(confirmacao && linha) {
                    alert("Solicitação de resgate enviada com sucesso!");
                    // Simula remoção visual da linha (apenas front-end)
                    linha.classList.add("linha-resgatando");
                    setTimeout(() => linha.remove(), 1000);
                }
            }
        });
    });
}
