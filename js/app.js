/* ========================
   CONFIGURACIÓN & IDIOMAS
   ======================== */
const IMG_MAP = {
    'inicial': { varon: 'img/inicial_ninos.jpg', mujer: 'img/inicial_ninas.jpg' },
    'primaria': { varon: 'img/primaria_ninos.jpg', mujer: 'img/primaria_ninas.jpg' },
    'secundaria': { varon: 'img/secundaria_hombres.jpg', mujer: 'img/secundaria_mujeres.jpg' }
};

const TRANSLATIONS = {
    es: {
        welcome: "Bienvenidos",
        selectLang: "Seleccione idioma",
        inicial: "Inicial",
        primaria: "Primaria",
        secundaria: "Secundaria",
        who: "¿Para quién es?",
        back: "Volver",
        boy: "Varón",
        girl: "Mujer",
        catalog: "Catálogo",
        selection: "Selección exclusiva",
        wspHelp: "¿Tenés dudas? Escribinos",
        order: "Tu Pedido",
        total: "Total:",
        finish: "Finalizar en WhatsApp",
        cartEmpty: "Tu carrito está vacío.",
        noProducts: "No encontramos prendas específicas.",
        btnBack: "Volver"
    },
    pt: {
        welcome: "Bem-vindos",
        selectLang: "Selecione o idioma",
        inicial: "Inicial",
        primaria: "Primário",
        secundaria: "Secundário",
        who: "Para quem é?",
        back: "Voltar",
        boy: "Menino",
        girl: "Menina",
        catalog: "Catálogo",
        selection: "Seleção exclusiva",
        wspHelp: "Dúvidas? Escreva-nos",
        order: "Seu Pedido",
        total: "Total:",
        finish: "Finalizar no WhatsApp",
        cartEmpty: "Seu carrinho está vazio.",
        noProducts: "Não encontramos produtos específicos.",
        btnBack: "Voltar"
    },
    en: {
        welcome: "Welcome",
        selectLang: "Select language",
        inicial: "Kinder",
        primaria: "Primary",
        secundaria: "High School",
        who: "Who is it for?",
        back: "Back",
        boy: "Boy",
        girl: "Girl",
        catalog: "Catalog",
        selection: "Exclusive selection",
        wspHelp: "Questions? Chat with us",
        order: "Your Order",
        total: "Total:",
        finish: "Finish on WhatsApp",
        cartEmpty: "Your cart is empty.",
        noProducts: "No specific products found.",
        btnBack: "Back"
    }
};

const app = {
    state: {
        nivel: 'todos',
        genero: 'unisex',
        lang: 'es'
    },

    init: () => {
        // Inicializar link de WhatsApp flotante con el número de data.js
        const wspBtn = document.getElementById('btnWspFloating');
        if (wspBtn) {
            wspBtn.href = `https://wa.me/${INFO_TIENDA.whatsapp}`;
        }
        // Aplicar idioma por defecto
        app.setLang('es');
    },

    // --- IDIOMAS (FIX: Ahora recibe el botón 'btnElement' explícitamente) ---
    setLang: (lang, btnElement) => {
        app.state.lang = lang;
        const t = TRANSLATIONS[lang];

        const safeSetText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        };

        safeSetText('txtWelcome', t.welcome);
        safeSetText('txtSelectLang', t.selectLang);
        safeSetText('lblInicial', t.inicial);
        safeSetText('lblPrimaria', t.primaria);
        safeSetText('lblSecundaria', t.secundaria);
        safeSetText('txtWho', t.who);
        safeSetText('btnBack', t.back); // ID del texto dentro del botón volver
        safeSetText('lblBoy', t.boy);
        safeSetText('lblGirl', t.girl);
        safeSetText('heroTitle', t.catalog);
        safeSetText('heroSubtitle', t.selection);
        
        // Actualizamos el botón flotante de WhatsApp (HTML interno)
        const wspText = document.getElementById('txtWspHelp');
        if(wspText) wspText.innerHTML = t.wspHelp.replace('?', '?<br>'); 

        safeSetText('txtOrder', t.order);
        safeSetText('txtTotal', t.total);
        safeSetText('btnFinish', t.finish);

        // Actualizar visualmente los botones
        document.querySelectorAll('.lang-flag-btn').forEach(b => b.classList.remove('active'));
        
        // Si pasaron el botón (click manual), úsalo. Si no (init), busca por título.
        if (btnElement) {
            btnElement.classList.add('active');
        } else {
            const titles = { 'es': 'Español', 'pt': 'Português', 'en': 'English' };
            const autoBtn = document.querySelector(`.lang-flag-btn[title="${titles[lang]}"]`);
            if (autoBtn) autoBtn.classList.add('active');
        }

        // Si el carrito está abierto, re-renderizarlo para actualizar textos
        if (document.getElementById('modalCart').classList.contains('active')) {
            cart.renderModal();
        }
    },

    setNivel: (nivel) => {
        app.state.nivel = nivel;
        const fotos = IMG_MAP[nivel];
        if (fotos) {
            document.getElementById('imgGeneroVaron').src = fotos.varon;
            document.getElementById('imgGeneroMujer').src = fotos.mujer;
        }
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    },

    setGenero: (genero) => {
        app.state.genero = genero;
        document.getElementById('wizardContainer').classList.add('hidden');
        document.getElementById('mainStore').classList.remove('hidden');
        app.applyFilters();
    },

    backStep: () => {
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step1').classList.add('active');
    },

    applyFilters: () => {
        const { nivel, genero } = app.state;
        const productosFiltrados = PRODUCTOS.filter(p => {
            const matchNivel = (nivel === 'todos') || (p.cat === nivel) || (p.cat === 'todos');
            const matchGenero = (p.gen === genero) || (p.gen === 'unisex');
            return matchNivel && matchGenero;
        });
        app.render(productosFiltrados);
    },

    render: (lista) => {
        const grid = document.getElementById('gridProductos');
        const t = TRANSLATIONS[app.state.lang];
        
        // Animación suave
        grid.style.opacity = '0';
        
        setTimeout(() => {
            if (lista.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                        <p style="color: var(--text-muted);">${t.noProducts}</p>
                        <button onclick="location.reload()" class="btn-add" style="width:auto; padding:10px 20px; margin:20px auto;">
                            ${t.btnBack}
                        </button>
                    </div>`;
            } else {
                // OPTIMIZACIÓN: Construir string grande en vez de innerHTML += en bucle
                let htmlContent = '';
                lista.forEach(p => {
                    htmlContent += `
                        <article class="card">
                            <div class="card-img-wrap">
                                <img src="${p.img}" alt="${p.nombre}" class="card-img" 
                                     onerror="this.src='https://placehold.co/300x300/eee/999?text=SCS'">
                            </div>
                            <div class="card-info">
                                <span class="card-cat">${p.cat}</span>
                                <h4 class="card-title">${p.nombre}</h4>
                                <div class="card-footer">
                                    <span class="card-price">${INFO_TIENDA.moneda}${p.precio}</span>
                                    <button class="btn-add" onclick="cart.add(${p.id})">
                                        <i class="ri-add-line"></i>
                                    </button>
                                </div>
                            </div>
                        </article>
                    `;
                });
                grid.innerHTML = htmlContent;
            }
            grid.style.opacity = '1';
        }, 100);
    }
};

// Arrancar la app
window.addEventListener('DOMContentLoaded', app.init);