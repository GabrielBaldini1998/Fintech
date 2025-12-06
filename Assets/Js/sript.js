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
    
    // Inicializa filtros de tabelas em todas as páginas
    initTableFilters();
    
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

    // Página de Perfil
    const profilePhotoInput = document.getElementById("profile-photo-input");
    if (profilePhotoInput) {
        setupProfilePage();
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

// --- Lógica para Página de Perfil ---
function setupProfilePage() {
    // Preview da Foto de Perfil
    const profilePhotoInput = document.getElementById("profile-photo-input");
    const profilePhotoPreview = document.getElementById("profile-photo-preview");
    
    if (profilePhotoInput && profilePhotoPreview) {
        profilePhotoInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validação de tipo de arquivo
                if (!file.type.startsWith('image/')) {
                    alert("Por favor, selecione apenas arquivos de imagem.");
                    return;
                }
                
                // Validação de tamanho (máximo 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert("A imagem deve ter no máximo 5MB.");
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePhotoPreview.src = e.target.result;
                    // Efeito visual de atualização
                    profilePhotoPreview.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        profilePhotoPreview.style.transform = "scale(1)";
                    }, 200);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Validação e Submissão do Formulário de Dados Pessoais
    const personalForm = document.getElementById("personal-form");
    if (personalForm) {
        personalForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nome = document.getElementById("input-nome").value.trim();
            const bio = document.getElementById("input-bio").value.trim();
            
            // Validações
            if (nome.length < 3) {
                alert("O nome deve ter pelo menos 3 caracteres.");
                return;
            }
            
            if (bio.length > 200) {
                alert("A bio deve ter no máximo 200 caracteres.");
                return;
            }
            
            // Atualiza o nome no card de perfil
            const profileName = document.getElementById("profile-name");
            if (profileName) {
                profileName.textContent = nome;
            }
            
            // Simulação de salvamento
            alert("Dados pessoais salvos com sucesso!");
            
            // Feedback visual
            const submitBtn = personalForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Salvo!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Validação e Submissão do Formulário de Contato
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const email = document.getElementById("input-email").value.trim();
            const telefone = document.getElementById("input-telefone").value.trim();
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, insira um e-mail válido.");
                return;
            }
            
            // Validação de telefone (formato brasileiro)
            const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!telefoneRegex.test(telefone)) {
                alert("Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.");
                return;
            }
            
            // Atualiza o email no card de perfil
            const profileEmail = document.getElementById("profile-email");
            if (profileEmail) {
                profileEmail.textContent = email;
            }
            
            alert("Informações de contato salvas com sucesso!");
            
            // Feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Salvo!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Submissão do Formulário de Preferências
    const preferencesForm = document.getElementById("preferences-form");
    if (preferencesForm) {
        preferencesForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const theme = document.querySelector('input[name="theme"]:checked')?.value;
            
            alert("Preferências salvas com sucesso!");
            
            // Aplicar tema (simulação)
            if (theme === "dark") {
                console.log("Tema escuro será implementado em uma versão futura.");
            }
            
            // Feedback visual
            const submitBtn = preferencesForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Salvo!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Máscara para telefone
    const telefoneInput = document.getElementById("input-telefone");
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
                e.target.value = value;
            }
        });
    }

    // Máscara para CEP
    const cepInput = document.getElementById("input-cep");
    if (cepInput) {
        cepInput.addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                e.target.value = value;
            }
        });
    }

    // Contador de caracteres para Bio
    const bioInput = document.getElementById("input-bio");
    if (bioInput) {
        bioInput.addEventListener("input", function(e) {
            const length = e.target.value.length;
            const maxLength = 200;
            const small = e.target.nextElementSibling;
            
            if (small && small.classList.contains("text-muted")) {
                small.textContent = `${length} / ${maxLength} caracteres`;
                
                if (length > maxLength) {
                    small.classList.remove("text-muted");
                    small.classList.add("text-danger");
                } else {
                    small.classList.remove("text-danger");
                    small.classList.add("text-muted");
                }
            }
        });
    }
}

// Funções globais para botões de segurança
function changePassword() {
    const newPassword = prompt("Digite sua nova senha (mínimo 8 caracteres):");
    if (newPassword) {
        if (newPassword.length < 8) {
            alert("A senha deve ter no mínimo 8 caracteres.");
            return;
        }
        const confirmPassword = prompt("Confirme sua nova senha:");
        if (newPassword === confirmPassword) {
            alert("Senha alterada com sucesso!");
        } else {
            alert("As senhas não coincidem.");
        }
    }
}

function enable2FA() {
    const enable = confirm("Deseja ativar a autenticação de dois fatores?\n\nIsso adicionará uma camada extra de segurança à sua conta.");
    if (enable) {
        alert("Autenticação de dois fatores ativada!\n\nVocê receberá um código por SMS sempre que fizer login.");
    }
}

// Funções para resetar formulários
function resetPersonalForm() {
    if (confirm("Deseja descartar as alterações não salvas?")) {
        document.getElementById("personal-form").reset();
    }
}

function resetContactForm() {
    if (confirm("Deseja descartar as alterações não salvas?")) {
        document.getElementById("contact-form").reset();
    }
}

/* ==========================================================================
   FUNCIONALIDADE DE FILTRO DE TABELAS
   Objetivo: Permitir busca e filtro em todas as tabelas do site
   ========================================================================== */

function initTableFilters() {
    // Encontra todas as tabelas na página
    const tables = document.querySelectorAll("table.table");
    
    tables.forEach((table, index) => {
        // Cria o campo de busca acima da tabela
        const filterInput = createFilterInput(table, index);
        
        // Insere o campo de busca antes da tabela
        const tableContainer = table.closest(".table-responsive") || table.parentElement;
        if (tableContainer) {
            tableContainer.insertBefore(filterInput, table);
        }
        
        // Adiciona evento de input para filtrar
        const input = filterInput.querySelector("input");
        if (input) {
            input.addEventListener("input", function() {
                filterTable(table, this.value);
            });
        }
    });
}

function createFilterInput(table, index) {
    const filterContainer = document.createElement("div");
    filterContainer.className = "table-filter mb-3";
    filterContainer.innerHTML = `
        <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search text-muted"></i>
            </span>
            <input type="text" 
                   class="form-control border-start-0" 
                   id="table-filter-${index}"
                   placeholder="Buscar na tabela...">
            <button class="btn btn-outline-secondary border-start-0" type="button" id="clear-filter-${index}" style="display: none;">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    `;
    
    // Adiciona evento para limpar filtro
    const clearBtn = filterContainer.querySelector(`#clear-filter-${index}`);
    const input = filterContainer.querySelector("input");
    
    if (clearBtn && input) {
        clearBtn.addEventListener("click", function() {
            input.value = "";
            filterTable(table, "");
            this.style.display = "none";
            input.focus();
        });
        
        input.addEventListener("input", function() {
            if (this.value.length > 0) {
                clearBtn.style.display = "block";
            } else {
                clearBtn.style.display = "none";
            }
        });
    }
    
    return filterContainer;
}

function filterTable(table, searchText) {
    const tbody = table.querySelector("tbody");
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll("tr");
    const searchLower = searchText.toLowerCase().trim();
    
    let visibleCount = 0;
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchLower);
        
        if (matches) {
            row.style.display = "";
            visibleCount++;
        } else {
            row.style.display = "none";
        }
    });
    
    // Mostra mensagem se não houver resultados
    showNoResultsMessage(table, visibleCount === 0 && searchText.length > 0);
}

function showNoResultsMessage(table, show) {
    const tbody = table.querySelector("tbody");
    if (!tbody) return;
    
    let noResultsRow = tbody.querySelector("tr.no-results-message");
    
    if (show) {
        if (!noResultsRow) {
            noResultsRow = document.createElement("tr");
            noResultsRow.className = "no-results-message";
            const colCount = table.querySelector("thead tr").querySelectorAll("th").length;
            noResultsRow.innerHTML = `
                <td colspan="${colCount}" class="text-center py-4 text-muted">
                    <i class="bi bi-search me-2"></i>Nenhum resultado encontrado
                </td>
            `;
            tbody.appendChild(noResultsRow);
        }
        noResultsRow.style.display = "";
    } else {
        if (noResultsRow) {
            noResultsRow.style.display = "none";
        }
    }
}
