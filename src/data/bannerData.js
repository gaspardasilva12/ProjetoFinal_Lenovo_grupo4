// Dados dos banners do HeroBanner
export const bannerData = [
    {
        id: 1,
        image: "https://p2-ofp.static.pub/ShareResource/ww/img/homepage-banners/lenovo-mwc-2025-hpb-teaser-desktop.jpg",
        alt: "Promoção Lenovo",
        headline: "Lenovo MWC '25",
        subhead: "IA MAIS INTELIGENTE PARA TODOS",
        description: "A Lenovo libera o poder da IA pessoal e empresarial para construir um futuro mais inteligente para todos.",
        ctaText: "Veja Contagem regressiva",
        ctaLink: "https://www.lenovo.com/br/pt/mwc/",
        logo: "https://www.lenovo.com/br/pt/mwc/",
    },
    {
        id: 2,
        image: "https://p3-ofp.static.pub/ShareResource/ww/img/homepage-banners/lenovo-fifa-2024-hpb-desktop.jpg",
        alt: "Promoção Lenovo",
        headline: "Descubra as Ofertas Exclusivas",
        subhead: "Tecnologia de ponta para você",
        description: "",
        ctaText: "Ver ofertas",
        ctaLink: "/ofertas",
        logo: "https://www.lenovo.com/medias/lenovo-logo.png"
    },
    {
        id: 3,
        image: "https://p2-ofp.static.pub/ShareResource/na/ftv/hero/lenovo-new-dawn.jpg",
        alt: "Promoção Lenovo",
        headline: "Descubra as Ofertas Exclusivas",
        subhead: "Tecnologia de ponta para você",
        description: "",
        ctaText: "Ver ofertas",
        ctaLink: "/ofertas",
        logo: "https://www.lenovo.com/medias/lenovo-logo.png"
    }
];

// Funções utilitárias para banners
export const getBannerById = (id) => {
    return bannerData.find(banner => banner.id === id);
};

export const getActiveBanners = () => {
    // Aqui você pode adicionar lógica para filtrar banners ativos
    // Por exemplo, baseado em datas ou status
    return bannerData;
};

export const getBannersByCategory = (category) => {
    // Aqui você pode filtrar banners por categoria
    return bannerData.filter(banner =>
        banner.subhead && banner.subhead.toLowerCase().includes(category.toLowerCase())
    );
};
