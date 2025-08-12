// Dados completos do site da Lenovo Brasil
export const lenovoData = {
    // Informações da empresa
    company: {
        name: "Lenovo",
        slogan: "Smarter Technology for All",
        description: "A Lenovo é uma empresa global de tecnologia que oferece soluções inovadoras para consumidores e empresas em todo o mundo.",
        founded: 1984,
        headquarters: "Beijing, China",
        website: "www.lenovo.com.br",
        phone: "0800 891 8287",
        email: "contato@lenovo.com.br"
    },

    // Categorias principais
    categories: [
        {
            id: "notebooks",
            name: "Notebooks",
            description: "Notebooks para todos os perfis: empresarial, gaming, educação e uso pessoal",
            icon: "laptop",
            subcategories: ["ThinkPad", "Yoga", "IdeaPad", "Legion", "ThinkBook"]
        },
        {
            id: "desktops",
            name: "Desktops",
            description: "Desktops e all-in-ones para casa e escritório",
            icon: "desktop",
            subcategories: ["ThinkCentre", "IdeaCentre", "Legion", "ThinkStation"]
        },
        {
            id: "tablets",
            name: "Tablets",
            description: "Tablets Android e Windows para produtividade e entretenimento",
            icon: "tablet",
            subcategories: ["Tab", "Yoga Tab", "ThinkPad Tablet"]
        },
        {
            id: "smartphones",
            name: "Smartphones",
            description: "Smartphones Motorola com tecnologia Lenovo",
            icon: "mobile",
            subcategories: ["Motorola Edge", "Motorola G", "Motorola One"]
        },
        {
            id: "workstations",
            name: "Workstations",
            description: "Workstations profissionais para design e engenharia",
            icon: "server",
            subcategories: ["ThinkPad P", "ThinkStation"]
        },
        {
            id: "gaming",
            name: "Gaming",
            description: "Produtos gaming Legion para jogadores",
            icon: "gamepad",
            subcategories: ["Legion", "Legion Pro", "Legion Slim"]
        },
        {
            id: "acessorios",
            name: "Acessórios",
            description: "Acessórios e periféricos para todos os produtos",
            icon: "headset",
            subcategories: ["Mochilas", "Docks", "Monitores", "Mouses", "Teclados"]
        },
        {
            id: "servicos",
            name: "Serviços",
            description: "Serviços de suporte e manutenção",
            icon: "support",
            subcategories: ["Lenovo Care", "Premium Care", "Onsite Service"]
        }
    ],

    // Produtos por categoria
    products: {
        notebooks: [
            {
                id: "thinkpad-x1-carbon-gen11",
                name: "ThinkPad X1 Carbon Gen 11",
                description: "Notebook empresarial ultrafino com Intel Core i7-1355U, 16GB RAM, 512GB SSD, tela 14\" 2.8K OLED",
                price: 8999.00,
                originalPrice: 10999.00,
                discount: 18,
                rating: 4.8,
                reviews: 127,
                image: "https://www.lenovo.com/medias/lenovo-laptop-thinkpad-x1-carbon-gen-11-14-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i7-1355U",
                    memory: "16GB LPDDR5",
                    storage: "512GB PCIe SSD",
                    display: "14\" 2.8K OLED",
                    graphics: "Intel Iris Xe",
                    os: "Windows 11 Pro"
                },
                features: ["Fingerprint Reader", "Backlit Keyboard", "Thunderbolt 4", "Wi-Fi 6E"],
                inStock: true,
                badge: "Novo"
            },
            {
                id: "yoga-9i-gen8",
                name: "Yoga 9i Gen 8",
                description: "Notebook 2-em-1 premium com Intel Core i7-1360P, 16GB RAM, 1TB SSD, tela 14\" 4K OLED",
                price: 9999.00,
                originalPrice: 11999.00,
                discount: 17,
                rating: 4.7,
                reviews: 156,
                image: "https://www.lenovo.com/medias/lenovo-laptop-yoga-9i-gen-8-14-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i7-1360P",
                    memory: "16GB LPDDR5",
                    storage: "1TB PCIe SSD",
                    display: "14\" 4K OLED",
                    graphics: "Intel Iris Xe",
                    os: "Windows 11 Home"
                },
                features: ["360° Hinge", "Dolby Atmos", "Pen Included", "Thunderbolt 4"],
                inStock: true,
                badge: "Popular"
            },
            {
                id: "legion-5-pro-gen8",
                name: "Legion 5 Pro Gen 8",
                description: "Notebook gaming com AMD Ryzen 7 7745H, 16GB RAM, 1TB SSD, RTX 4060, tela 16\" 2.5K",
                price: 6499.00,
                originalPrice: 7999.00,
                discount: 19,
                rating: 4.9,
                reviews: 89,
                image: "https://www.lenovo.com/medias/lenovo-laptop-legion-5-pro-gen-8-16-amd-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "AMD Ryzen 7 7745H",
                    memory: "16GB DDR5",
                    storage: "1TB PCIe SSD",
                    display: "16\" 2.5K 165Hz",
                    graphics: "NVIDIA RTX 4060 8GB",
                    os: "Windows 11 Home"
                },
                features: ["RGB Keyboard", "Legion AI Engine", "Dolby Atmos", "Wi-Fi 6E"],
                inStock: true,
                badge: "Gaming"
            },
            {
                id: "ideapad-slim-5",
                name: "IdeaPad Slim 5",
                description: "Notebook para uso diário com Intel Core i5-1335U, 8GB RAM, 512GB SSD, tela 15.6\" FHD",
                price: 2999.00,
                originalPrice: 3499.00,
                discount: 14,
                rating: 4.5,
                reviews: 234,
                image: "https://www.lenovo.com/medias/lenovo-laptop-ideapad-slim-5-15-amd-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i5-1335U",
                    memory: "8GB DDR4",
                    storage: "512GB PCIe SSD",
                    display: "15.6\" FHD",
                    graphics: "Intel Iris Xe",
                    os: "Windows 11 Home"
                },
                features: ["Backlit Keyboard", "Fingerprint Reader", "USB-C", "HDMI"],
                inStock: true,
                badge: "Oferta"
            },
            {
                id: "thinkbook-14-gen6",
                name: "ThinkBook 14 Gen 6",
                description: "Notebook empresarial com Intel Core i5-1335U, 16GB RAM, 512GB SSD, tela 14\" FHD",
                price: 3999.00,
                originalPrice: 4799.00,
                discount: 17,
                rating: 4.6,
                reviews: 167,
                image: "https://www.lenovo.com/medias/lenovo-laptop-thinkbook-14-gen-6-14-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i5-1335U",
                    memory: "16GB DDR4",
                    storage: "512GB PCIe SSD",
                    display: "14\" FHD",
                    graphics: "Intel Iris Xe",
                    os: "Windows 11 Pro"
                },
                features: ["Fingerprint Reader", "Backlit Keyboard", "Thunderbolt 4", "Wi-Fi 6E"],
                inStock: true,
                badge: "Empresarial"
            }
        ],
        desktops: [
            {
                id: "thinkcentre-m90t-gen5",
                name: "ThinkCentre M90t Gen 5",
                description: "Desktop empresarial compacto com Intel Core i5-13500, 16GB RAM, 512GB SSD",
                price: 3299.00,
                originalPrice: 3999.00,
                discount: 17,
                rating: 4.6,
                reviews: 78,
                image: "https://www.lenovo.com/medias/lenovo-desktop-thinkcentre-m90t-gen-5-tower-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i5-13500",
                    memory: "16GB DDR4",
                    storage: "512GB PCIe SSD",
                    graphics: "Intel UHD Graphics 770",
                    os: "Windows 11 Pro"
                },
                features: ["Tower Form Factor", "Multiple USB Ports", "DisplayPort", "VGA"],
                inStock: true,
                badge: "Empresarial"
            },
            {
                id: "ideacentre-5-14",
                name: "IdeaCentre 5 14",
                description: "Desktop para casa com AMD Ryzen 5 5600G, 16GB RAM, 512GB SSD",
                price: 2799.00,
                originalPrice: 3299.00,
                discount: 15,
                rating: 4.5,
                reviews: 92,
                image: "https://www.lenovo.com/medias/lenovo-desktop-ideacentre-5-14-amd-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "AMD Ryzen 5 5600G",
                    memory: "16GB DDR4",
                    storage: "512GB PCIe SSD",
                    graphics: "AMD Radeon Graphics",
                    os: "Windows 11 Home"
                },
                features: ["Modern Design", "Wi-Fi 6", "Bluetooth 5.0", "Multiple USB Ports"],
                inStock: true,
                badge: "Casa"
            },
            {
                id: "legion-tower-5i-gen8",
                name: "Legion Tower 5i Gen 8",
                description: "Desktop gaming com Intel Core i7-13700F, 16GB RAM, 1TB SSD, RTX 4070",
                price: 8999.00,
                originalPrice: 10999.00,
                discount: 18,
                rating: 4.9,
                reviews: 67,
                image: "https://www.lenovo.com/medias/lenovo-desktop-legion-tower-5i-gen-8-17-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "Intel Core i7-13700F",
                    memory: "16GB DDR5",
                    storage: "1TB PCIe SSD",
                    graphics: "NVIDIA RTX 4070 12GB",
                    os: "Windows 11 Home"
                },
                features: ["RGB Lighting", "Liquid Cooling", "Wi-Fi 6E", "2.5Gb Ethernet"],
                inStock: true,
                badge: "Gaming"
            }
        ],
        tablets: [
            {
                id: "tab-p11-pro-gen2",
                name: "Tab P11 Pro Gen 2",
                description: "Tablet Android premium com tela 11.5\" 2.5K OLED, 8GB RAM, 256GB",
                price: 2999.00,
                originalPrice: 3599.00,
                discount: 17,
                rating: 4.7,
                reviews: 134,
                image: "https://www.lenovo.com/medias/lenovo-tablet-tab-p11-pro-gen-2-11-5-android-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "MediaTek Dimensity 1300T",
                    memory: "8GB LPDDR4X",
                    storage: "256GB UFS 3.1",
                    display: "11.5\" 2.5K OLED",
                    battery: "10200mAh",
                    os: "Android 12"
                },
                features: ["Quad Speakers", "Dolby Atmos", "Pen Support", "4K Video Recording"],
                inStock: true,
                badge: "Premium"
            },
            {
                id: "yoga-tab-13",
                name: "Yoga Tab 13",
                description: "Tablet Android com tela 13\" 2K, 8GB RAM, 256GB, design único",
                price: 2499.00,
                originalPrice: 2999.00,
                discount: 17,
                rating: 4.6,
                reviews: 89,
                image: "https://www.lenovo.com/medias/lenovo-tablet-yoga-tab-13-13-android-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    processor: "MediaTek Dimensity 900",
                    memory: "8GB LPDDR4X",
                    storage: "256GB UFS 3.1",
                    display: "13\" 2K",
                    battery: "10000mAh",
                    os: "Android 12"
                },
                features: ["Kickstand Design", "Quad Speakers", "Pen Included", "HDMI Input"],
                inStock: true,
                badge: "Inovador"
            }
        ],
        acessorios: [
            {
                id: "thinkpad-usb-c-dock-gen2",
                name: "ThinkPad USB-C Dock Gen 2",
                description: "Dock station com múltiplas portas USB-C, DisplayPort, HDMI e Ethernet",
                price: 599.00,
                originalPrice: 799.00,
                discount: 25,
                rating: 4.6,
                reviews: 89,
                image: "https://www.lenovo.com/medias/lenovo-accessory-thinkpad-usb-c-dock-gen-2-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    ports: "USB-C, USB-A, DisplayPort, HDMI, Ethernet",
                    power: "100W Power Delivery",
                    compatibility: "ThinkPad, IdeaPad, Yoga"
                },
                features: ["4K Display Support", "Gigabit Ethernet", "Audio Jack", "Power Delivery"],
                inStock: true,
                badge: "Oferta"
            },
            {
                id: "legion-m300-rgb",
                name: "Legion M300 RGB Gaming Mouse",
                description: "Mouse gaming com sensor óptico de 16.000 DPI e iluminação RGB",
                price: 199.00,
                originalPrice: 249.00,
                discount: 20,
                rating: 4.8,
                reviews: 156,
                image: "https://www.lenovo.com/medias/lenovo-accessory-legion-m300-rgb-gaming-mouse-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    sensor: "PixArt PMW3325",
                    dpi: "Up to 16,000 DPI",
                    buttons: "6 Programmable",
                    weight: "95g"
                },
                features: ["RGB Lighting", "Programmable Buttons", "Onboard Memory", "Ergonomic Design"],
                inStock: true,
                badge: "Gaming"
            },
            {
                id: "thinkpad-backpack-15",
                name: "ThinkPad Backpack 15",
                description: "Mochila empresarial com proteção para notebook até 15.6\" e múltiplos compartimentos",
                price: 299.00,
                originalPrice: 399.00,
                discount: 25,
                rating: 4.7,
                reviews: 234,
                image: "https://www.lenovo.com/medias/lenovo-accessory-thinkpad-backpack-15-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTY5fGltYWdlL3BuZ3xoYzEvaGJmLzk1NDM1Mzk0MzU1MTgucG5nfGI1MWI0MGM1NWM2MGM1NWM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNGM2OWM0NmUyNA",
                specs: {
                    capacity: "25L",
                    laptopSize: "Up to 15.6\"",
                    material: "Water-resistant polyester",
                    weight: "1.2kg"
                },
                features: ["Water Resistant", "Laptop Protection", "Multiple Pockets", "USB Charging Port"],
                inStock: true,
                badge: "Empresarial"
            }
        ]
    },

    // Promoções ativas
    promotions: [
        {
            id: "black-friday-2024",
            name: "Black Friday Lenovo",
            description: "Descontos de até 50% em toda a linha de produtos",
            discount: "Até 50% OFF",
            validUntil: "2024-11-30",
            categories: ["notebooks", "desktops", "tablets", "acessorios"],
            banner: "https://www.lenovo.com/medias/black-friday-banner.png"
        },
        {
            id: "cyber-monday",
            name: "Cyber Monday",
            description: "Ofertas especiais em produtos gaming e empresariais",
            discount: "Até 40% OFF",
            validUntil: "2024-12-02",
            categories: ["gaming", "workstations"],
            banner: "https://www.lenovo.com/medias/cyber-monday-banner.png"
        },
        {
            id: "thinkpad-promo",
            name: "Promoção ThinkPad",
            description: "Descontos especiais na linha ThinkPad para empresas",
            discount: "Até 30% OFF",
            validUntil: "2024-12-31",
            categories: ["notebooks"],
            banner: "https://www.lenovo.com/medias/thinkpad-promo-banner.png"
        }
    ],

    // Serviços oferecidos
    services: [
        {
            id: "lenovo-care",
            name: "Lenovo Care",
            description: "Suporte técnico básico incluído com todos os produtos",
            duration: "1 ano",
            price: "Incluído",
            features: ["Suporte por telefone", "Suporte online", "Atualizações de software"]
        },
        {
            id: "premium-care",
            name: "Premium Care",
            description: "Suporte técnico avançado com atendimento prioritário",
            duration: "1-3 anos",
            price: "A partir de R$ 299/ano",
            features: ["Atendimento prioritário", "Suporte 24/7", "Reparo em domicílio"]
        },
        {
            id: "onsite-service",
            name: "Onsite Service",
            description: "Serviço de reparo no local do cliente",
            duration: "1-3 anos",
            price: "A partir de R$ 499/ano",
            features: ["Técnico no local", "Reparo em até 24h", "Peças originais"]
        }
    ],

    // Informações de contato e suporte
    support: {
        phone: "0800 891 8287",
        email: "suporte@lenovo.com.br",
        chat: "Chat online disponível 24/7",
        whatsapp: "+55 11 99999-9999",
        socialMedia: {
            facebook: "facebook.com/lenovobrasil",
            instagram: "instagram.com/lenovobrasil",
            twitter: "twitter.com/lenovobrasil",
            youtube: "youtube.com/lenovobrasil"
        }
    },

    // Configurações de pagamento
    payment: {
        methods: ["Cartão de crédito", "Cartão de débito", "PIX", "Boleto bancário", "Parcelamento"],
        installments: {
            max: 12,
            interest: "Sem juros em até 10x",
            minValue: 100
        },
        security: ["SSL 256-bit", "PCI DSS", "Certificado digital"]
    },

    // Informações de entrega
    shipping: {
        freeShipping: "Frete grátis para compras acima de R$ 299",
        deliveryTime: "2-5 dias úteis",
        tracking: "Rastreamento em tempo real",
        pickup: "Retirada em lojas parceiras"
    },

    // Configurações de garantia
    warranty: {
        standard: "1 ano de garantia",
        extended: "Até 3 anos de garantia estendida",
        international: "Garantia internacional",
        coverage: ["Defeitos de fabricação", "Peças e mão de obra", "Suporte técnico"]
    }
};

// Funções utilitárias para trabalhar com os dados
export const getProductsByCategory = (categoryId) => {
    return lenovoData.products[categoryId] || [];
};

export const getProductById = (productId) => {
    for (const category in lenovoData.products) {
        const product = lenovoData.products[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
};

export const getCategoryById = (categoryId) => {
    return lenovoData.categories.find(cat => cat.id === categoryId);
};

export const getActivePromotions = () => {
    const today = new Date();
    return lenovoData.promotions.filter(promo => {
        const validUntil = new Date(promo.validUntil);
        return validUntil >= today;
    });
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

export const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}; 