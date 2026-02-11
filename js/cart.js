const cart = {
    items: [],

    add: (id) => {
        const producto = PRODUCTOS.find(p => p.id === id);
        if (!producto) return;

        const existe = cart.items.find(i => i.id === id);
        if (existe) {
            existe.qty++;
        } else {
            cart.items.push({ ...producto, qty: 1 });
        }

        cart.updateBadge();
        
        // Feedback visual
        const badge = document.querySelector('.icon-wrap');
        badge.style.transform = "scale(1.2)";
        setTimeout(() => badge.style.transform = "scale(1)", 200);
    },

    remove: (id) => {
        cart.items = cart.items.filter(i => i.id !== id);
        cart.renderModal();
        cart.updateBadge();
    },

    toggleModal: () => {
        const modal = document.getElementById('modalCart');
        const isOpen = modal.classList.contains('active');

        if (!isOpen) {
            cart.renderModal();
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
        }
    },

    renderModal: () => {
        const container = document.getElementById('cartItemsContainer');
        const t = TRANSLATIONS[app.state.lang]; // Acceder al idioma actual
        const moneda = INFO_TIENDA.moneda;
        let total = 0;
        let htmlContent = '';

        if (cart.items.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 40px 0; color: #94a3b8;">
                    <i class="ri-shopping-basket-line" style="font-size: 3rem; opacity:0.5;"></i>
                    <p>${t.cartEmpty}</p>
                </div>`;
            document.getElementById('cartTotal').textContent = `${moneda}0`;
            return;
        } 

        cart.items.forEach(item => {
            total += item.precio * item.qty;
            htmlContent += `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-img" onerror="this.src='https://placehold.co/100'">
                    <div class="cart-details">
                        <h4>${item.nombre}</h4>
                        <div class="cart-price">${item.qty} x ${moneda}${item.precio}</div>
                    </div>
                    <button class="cart-remove" onclick="cart.remove(${item.id})">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            `;
        });
        
        container.innerHTML = htmlContent;
        // Formateo básico de número con puntos de miles (opcional, mejora UX)
        document.getElementById('cartTotal').textContent = `${moneda}${total.toLocaleString('es-ES')}`;
    },

    updateBadge: () => {
        const totalQty = cart.items.reduce((acc, item) => acc + item.qty, 0);
        document.getElementById('cartBadge').textContent = totalQty;
    },

    checkout: () => {
        if (cart.items.length === 0) return;

        let mensaje = "Hola Saint Catherine's! 👋 Quiero pedir:%0A%0A";
        let total = 0;

        cart.items.forEach(item => {
            const subtotal = item.precio * item.qty;
            total += subtotal;
            mensaje += `▪️ ${item.qty}x ${item.nombre} (${INFO_TIENDA.moneda}${subtotal})%0A`;
        });

        mensaje += `%0A💰 *Total Estimado: ${INFO_TIENDA.moneda}${total}*`;
        mensaje += `%0A%0AAguardo confirmación. Gracias!`;

        const url = `https://wa.me/${INFO_TIENDA.whatsapp}?text=${mensaje}`;
        window.open(url, '_blank');
    }
};