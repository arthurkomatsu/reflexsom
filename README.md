# Reflex Som - Website Redesign

![Reflex Som](./public/assets/logo-reflex-som.jpg)

Um redesign moderno e elegante do website da Reflex Som, empresa com mais de 30 anos de experiência em locação de equipamentos profissionais de iluminação, som e efeitos especiais em Brasília.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool ultrarrápida
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações para React
- **Lucide React** - Ícones modernos

## ✨ Características

### Design Moderno
- Interface dark mode elegante com paleta vermelho (#bd3534) e preto
- Animações suaves e interativas com Framer Motion
- Layout responsivo mobile-first
- Efeitos visuais como glass morphism e gradientes

### Seções
1. **Hero** - Apresentação impactante com estatísticas
2. **Sobre** - História da empresa com elementos visuais
3. **Serviços** - Grid de serviços oferecidos
4. **Equipamentos** - Catálogo detalhado com especificações
5. **Galeria** - Portfolio de eventos com lightbox
6. **Depoimentos** - Avaliações de clientes
7. **Preços** - Cards de preços com CTA
8. **Contato** - Formulário integrado com WhatsApp

### Integrações
- **WhatsApp** - Botão flutuante e links diretos
- **Instagram** - Link para @reflex_som
- **Formulário** - Envio direto via WhatsApp

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
refactored9/
├── public/
│   ├── assets/          # Imagens e mídia
│   └── favicon.ico      # Ícone do site
├── src/
│   ├── components/      # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Equipment.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── index.html           # Template HTML
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primary | `#bd3534` | Destaque, CTAs, acentos |
| Dark | `#0a0a0a` | Background principal |
| Dark 50 | `#171717` | Background secundário |
| White | `#ffffff` | Texto principal |

## 📱 Contato

- **WhatsApp**: (61) 98303-3900
- **Instagram**: [@reflex_som](https://www.instagram.com/reflex_som)
- **Localização**: Park Way, Brasília - DF

## 📝 Notas

- As imagens são carregadas do diretório `/public/assets/`
- O formulário de contato envia via WhatsApp (sem backend necessário)
- Todos os links de contato usam WhatsApp Web
- O site é totalmente responsivo para mobile, tablet e desktop

## 🔄 Atualizações Futuras (Sugestões)

- [ ] Integração com sistema de agendamento
- [ ] Chat em tempo real
- [ ] Blog de eventos
- [ ] Sistema de orçamento automatizado
- [ ] Área do cliente

---

Desenvolvido com ❤️ para Reflex Som
