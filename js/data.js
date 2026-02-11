const INFO_TIENDA = {
    whatsapp: "59899000000", // <--- RECUERDA PONER EL NÚMERO REAL AQUÍ
    moneda: "$"
};

/* GUIA DE DATOS:
   cat: 'inicial', 'primaria', 'secundaria', 'todos'
   gen: 'varon', 'mujer', 'unisex' (esto define quién ve el producto)
*/

const PRODUCTOS = [
    // --- UNIFORME FORMAL ---
    { 
        id: 1, 
        nombre: "Remera Polo MC", 
        precio: 1075, 
        cat: "primaria", 
        gen: "unisex", // Aparece en ambos
        img: "img/polo.jpg" 
    },
    { 
        id: 2, 
        nombre: "Pollera Formal", 
        precio: 1640, 
        cat: "primaria", 
        gen: "mujer", // Solo aparece si eligen Niña
        img: "img/pollera.jpg" 
    },
    { 
        id: 3, 
        nombre: "Cardigan Femenino", 
        precio: 1405, 
        cat: "primaria", 
        gen: "mujer", 
        img: "img/cardigan.jpg" 
    },
    { 
        id: 4, 
        nombre: "Campera Formal", 
        precio: 2200, 
        cat: "secundaria", 
        gen: "unisex", 
        img: "img/campera_formal.jpg" 
    },

    // --- DEPORTIVO ---
    { 
        id: 5, 
        nombre: "Remera Deportiva Gris", 
        precio: 835, 
        cat: "secundaria", 
        gen: "unisex", 
        img: "img/deportiva_gris.jpg" 
    },
    { 
        id: 6, 
        nombre: "Remera Deportiva Naranja", 
        precio: 685, 
        cat: "inicial", 
        gen: "unisex", 
        img: "img/deportiva_naranja.jpg" 
    },
    { 
        id: 7, 
        nombre: "Buzo Deportivo", 
        precio: 1475, 
        cat: "primaria", 
        gen: "unisex", 
        img: "img/buzo.jpg" 
    },
    { 
        id: 8, 
        nombre: "Pantalón Deportivo", 
        precio: 1550, 
        cat: "secundaria", 
        gen: "unisex", 
        img: "img/pantalon.jpg" 
    },
    { 
        id: 9, 
        nombre: "Short Masculino", 
        precio: 910, 
        cat: "inicial", 
        gen: "varon", // Solo aparece si eligen Niño
        img: "img/short.jpg" 
    },
    { 
        id: 10, 
        nombre: "Canguro SCS", 
        precio: 1895, 
        cat: "secundaria", 
        gen: "unisex", 
        img: "img/canguro.jpg" 
    },
    { 
        id: 11, 
        nombre: "Campera Rompeviento", 
        precio: 2100, 
        cat: "todos", 
        gen: "unisex", 
        img: "img/rompeviento.jpg" 
    }
];