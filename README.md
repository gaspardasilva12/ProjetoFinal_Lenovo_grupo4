# Lenovo Clone - Site Oficial

Este é um clone do site oficial da Lenovo Brasil, desenvolvido com React e focado em recriar a experiência de compra e navegação do site original.
## 🚀 Funcionalidades

### HeroBanner Aprimorado
- **10 banners diferentes** semelhantes aos da Lenovo original
- **Autoplay inteligente** com pausa ao interagir
- **Barra de progresso** visual para cada slide
- **Navegação por setas** e dots
- **Contador de slides** em tempo real
- **Responsivo** para todos os dispositivos
- **Acessibilidade** completa com ARIA labels
- **Animações suaves** e transições otimizadas

### Banners Incluídos
1. **MWC 2025** - IA mais inteligente para todos
2. **FIFA Partnership** - Parceiro oficial de tecnologia da FIFA™
3. **Somos Lenovo** - Nossa história
4. **Black Friday 2024** - Descontos de até 50%
5. **Legion Gaming** - Performance extrema para gamers
6. **ThinkPad Empresarial** - Segurança e confiabilidade
7. **Yoga 2-em-1** - Versatilidade e inovação
8. **Educação** - Tecnologia para o aprendizado
9. **Workstations** - Profissionais de design e engenharia
10. **Smart Home** - Casa inteligente

### Características Técnicas
- **Pausa automática** quando o mouse está sobre o banner
- **Retomada automática** após 3 segundos de interação
- **Carregamento otimizado** de imagens (lazy loading)
- **Fallback visual** para imagens que falham
- **Performance otimizada** com useRef e useCallback
- **SEO friendly** com metadados apropriados

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegação
- **CSS3** - Estilização avançada
- **JavaScript ES6+** - Funcionalidades modernas
- **Responsive Design** - Mobile-first approach

## 📁 Estrutura do Projeto

```
lenovo-clone/
├── public/
│   ├── images/          # Imagens estáticas
│   └── index.html       # HTML principal
├── src/
│   ├── components/      # Componentes React
│   │   ├── HeroBanner.js    # Banner principal aprimorado
│   │   ├── Header.js        # Cabeçalho
│   │   ├── Footer.js        # Rodapé
│   │   └── ...
│   ├── data/           # Dados do site
│   │   ├── lenovoData.js    # Dados principais
│   │   └── bannerData.js    # Dados dos banners
│   ├── styles/         # Arquivos CSS
│   │   ├── HeroBanner.css   # Estilos do banner
│   │   └── ...
│   └── pages/          # Páginas da aplicação
└── package.json
```

## 🎨 Melhorias no HeroBanner

### Funcionalidades Adicionadas
- ✅ **10 banners diferentes** com conteúdo realista
- ✅ **Controle de autoplay** com pausa/resumo
- ✅ **Barra de progresso** visual
- ✅ **Navegação melhorada** com dots e setas
- ✅ **Contador de slides** em tempo real
- ✅ **Responsividade** para mobile e tablet
- ✅ **Acessibilidade** completa
- ✅ **Performance otimizada**

### Arquivos Modificados
- `src/components/HeroBanner.js` - Componente principal
- `src/styles/HeroBanner.css` - Estilos aprimorados
- `src/data/bannerData.js` - Dados dos banners (novo)

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd lenovo-clone
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm start
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 📱 Responsividade

O banner foi otimizado para:
- **Desktop** (1200px+) - Experiência completa
- **Tablet** (768px-1199px) - Layout adaptado
- **Mobile** (320px-767px) - Interface simplificada

## ♿ Acessibilidade

- **ARIA labels** para todos os elementos interativos
- **Navegação por teclado** totalmente funcional
- **Screen readers** compatíveis
- **Contraste adequado** para leitura
- **Foco visual** em elementos interativos

## 🎯 Próximas Melhorias

- [ ] Adicionar mais banners sazonais
- [ ] Implementar filtros por categoria
- [ ] Adicionar analytics de interação
- [ ] Otimizar carregamento de imagens
- [ ] Implementar cache de banners

## 📄 Licença

Este projeto é apenas para fins educacionais e de demonstração.

---

**Desenvolvido com ❤️ para recriar a experiência da Lenovo Brasil**

