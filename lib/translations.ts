import type { Lang } from "@/context/LanguageContext"

const translations = {
  en: {
    navbar: {
      links: ["Protocol", "Liquidity", "Governance", "Docs"],
      connectWallet: "Connect Wallet",
      connecting: "Connecting...",
    },
    hero: {
      liveBadge: "Live on 14 networks — $2.41B TVL",
      subtitle:
        "The most capital-efficient AMM in DeFi. Concentrated liquidity positions, neural rebalancing, and cross-chain atomic swaps — all in one frictionless engine.",
      launchApp: "Launch App",
      readWhitepaper: "Read Whitepaper",
      stats: [
        { label: "Total Value Locked", value: "$2.41B" },
        { label: "Protocol Holders", value: "186K+" },
        { label: "Chains Supported", value: "14 Networks" },
      ],
    },
    features: {
      sectionLabel: "Core Protocol",
      h2a: "Built for the ",
      h2b: "next generation",
      h2c: " of DeFi",
      subtitle:
        "Every primitive in the Vortex stack is engineered for maximum capital efficiency, uncompromising security, and zero-friction UX.",
      learnMore: "Learn more",
      items: [
        {
          title: "Instant Swap Execution",
          description:
            "Sub-second cross-chain swaps powered by Vortex's proprietary intent-settlement layer. Zero slippage on orders under $500K. MEV-protected by default with Flashbots RPC integration.",
          detail: "Supports 400+ token pairs across 14 EVM chains",
        },
        {
          title: "Multi-Chain Yield Vaults",
          description:
            "Automatically route liquidity to the highest-yielding pools across Ethereum, Arbitrum, Optimism, Base, and Polygon. Neural rebalancing triggers every 4 hours based on real-time fee data.",
          detail: "Compounding enabled — rewards auto-harvested daily",
        },
        {
          title: "Neural Security Layer",
          description:
            "On-chain anomaly detection trained on 2.3M historical exploit patterns. Circuit breakers pause pools within 180ms of detecting rug-pull signatures, sandwich attacks, or oracle manipulation.",
          detail: "$0 lost to exploits since mainnet launch in Q1 2024",
        },
        {
          title: "Neural Liquidity Engine",
          description:
            "Dynamic fee tiers (0.01% – 1%) auto-selected per trade based on volatility regime, pool depth, and counterparty flow. LPs earn 40% more fees vs. static V3 implementations.",
          detail: "Proprietary CLMM with tick-level price oracles",
        },
      ],
    },
    stats: {
      sectionLabel: "Live Protocol Data",
      h2a: "Numbers that ",
      h2b: "don't lie",
      cards: ["Total Value Locked", "24h Trading Volume", "Total Transactions"],
      volumeByChain: "Volume by Chain",
      liveTransactions: "Live Transactions",
      live: "Live",
    },
    tokenomics: {
      sectionLabel: "VTX Token",
      h2a: "Engineered for ",
      h2b: "long-term value",
      subtitle:
        "Deflationary supply, locked liquidity, and real yield — a tokenomics model built to reward long-term protocol participants, not speculators.",
      donutSegments: ["Liquidity Pool", "Ecosystem Fund", "Public Sale", "Team & Advisors"],
      cards: [
        {
          title: "Liquidity Locked",
          subtitle: "3-year lock via Unicrypt",
          description:
            "65% of all liquidity positions are locked in Unicrypt vaults with a 3-year time-lock. No rug, no drain — verifiable on-chain in real-time.",
        },
        {
          title: "Deflation Burn Rate",
          subtitle: "Per quarterly epoch",
          description:
            "2.5% of the circulating VTX supply is permanently burned each quarter, sourced from 15% of all protocol swap fees. Total burned to date: 1.82M VTX.",
        },
        {
          title: "Holder Reward Yield",
          subtitle: "Auto-distributed weekly",
          description:
            "Hold a minimum of 1,000 VTX to earn 4.2% APR in USDC rewards. Funded by 40% of protocol fees — no staking required, rewards claimable anytime.",
        },
      ],
      supplyStats: [
        { label: "Total Supply", suffix: "VTX" },
        { label: "Circulating Supply", suffix: "VTX" },
        { label: "Total Burned", suffix: "VTX" },
        { label: "Max Wallet", suffix: "of supply" },
      ],
    },
    footer: {
      brandDesc:
        "The most capital-efficient concentrated liquidity protocol in DeFi. Instant swaps, neural yield routing, and AI security — on 14 chains.",
      columns: [
        {
          heading: "Protocol",
          links: ["Swap", "Liquidity", "Yield Vaults", "Analytics", "Bridge"],
        },
        {
          heading: "Developers",
          links: ["Documentation", "SDK Reference", "Smart Contracts", "Bug Bounty", "Audits"],
        },
        {
          heading: "Community",
          links: ["Governance", "Forum", "Blog", "Brand Kit", "Careers"],
        },
      ],
      copyright: "© 2024 Vortex Protocol. All rights reserved.",
      legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
      allSystems: "All systems operational",
    },
  },

  ru: {
    navbar: {
      links: ["Протокол", "Ликвидность", "Управление", "Документация"],
      connectWallet: "Подключить кошелёк",
      connecting: "Подключение...",
    },
    hero: {
      liveBadge: "Работает в 14 сетях — $2.41B TVL",
      subtitle:
        "Наиболее капиталоэффективный AMM в DeFi. Концентрированная ликвидность, нейросетевая ребалансировка и атомарные кросс-чейн свопы — в одном бесшовном движке.",
      launchApp: "Запустить приложение",
      readWhitepaper: "Читать вайтпейпер",
      stats: [
        { label: "Заблокировано", value: "$2.41B" },
        { label: "Держатели", value: "186K+" },
        { label: "Сетей поддержки", value: "14 сетей" },
      ],
    },
    features: {
      sectionLabel: "Протокол",
      h2a: "Создано для ",
      h2b: "следующего поколения",
      h2c: " DeFi",
      subtitle:
        "Каждый примитив стека Vortex оптимизирован для максимальной капиталоэффективности, непоколебимой безопасности и бесшовного UX.",
      learnMore: "Подробнее",
      items: [
        {
          title: "Мгновенные свопы",
          description:
            "Кросс-чейн свопы за доли секунды на основе проприетарного уровня settlement. Нулевое проскальзывание на ордерах до $500K. MEV-защита по умолчанию через Flashbots RPC.",
          detail: "Поддерживает 400+ торговых пар в 14 EVM-сетях",
        },
        {
          title: "Мультичейн-хранилища доходности",
          description:
            "Автоматически направляет ликвидность в пулы с наибольшей доходностью по Ethereum, Arbitrum, Optimism, Base и Polygon. Нейросетевая ребалансировка каждые 4 часа.",
          detail: "Реинвестирование включено — награды собираются ежедневно",
        },
        {
          title: "Нейросетевая защита",
          description:
            "Обнаружение аномалий на основе 2,3 млн исторических паттернов атак. Circuit breaker приостанавливает пулы за 180 мс при обнаружении rug-pull, сэндвич-атак или манипуляций оракулами.",
          detail: "$0 потерь от взломов с запуска mainnet в Q1 2024",
        },
        {
          title: "Нейросетевой движок ликвидности",
          description:
            "Динамические уровни комиссий (0.01%–1%) выбираются автоматически с учётом волатильности и глубины пула. LP зарабатывают на 40% больше по сравнению со статическими V3.",
          detail: "Проприетарный CLMM с tick-level ценовыми оракулами",
        },
      ],
    },
    stats: {
      sectionLabel: "Данные в реальном времени",
      h2a: "Цифры, которые ",
      h2b: "не лгут",
      cards: ["Заблокировано", "Объём торгов 24h", "Всего транзакций"],
      volumeByChain: "Объём по сетям",
      liveTransactions: "Живые транзакции",
      live: "Лайв",
    },
    tokenomics: {
      sectionLabel: "VTX Token",
      h2a: "Создано для ",
      h2b: "долгосрочной ценности",
      subtitle:
        "Дефляционное предложение, заблокированная ликвидность и реальная доходность — для долгосрочных участников протокола, не спекулянтов.",
      donutSegments: ["Пул ликвидности", "Экосист. фонд", "Публичная продажа", "Команда и советники"],
      cards: [
        {
          title: "Ликвидность заблокирована",
          subtitle: "3-летняя блокировка через Unicrypt",
          description:
            "65% всех позиций ликвидности заблокированы в хранилищах Unicrypt на 3 года. Без rug pull, без слива — проверяемо на цепи в реальном времени.",
        },
        {
          title: "Темп дефляционного сжигания",
          subtitle: "За квартальный эпох",
          description:
            "2,5% обращающегося предложения VTX сжигается навсегда каждый квартал из 15% комиссий протокола. Всего сожжено: 1,82 млн VTX.",
        },
        {
          title: "Доходность для держателей",
          subtitle: "Автовыплата еженедельно",
          description:
            "Держите от 1 000 VTX и получайте 4,2% APR в USDC. Финансируется 40% комиссий протокола — без стейкинга, вывод в любое время.",
        },
      ],
      supplyStats: [
        { label: "Общее предложение", suffix: "VTX" },
        { label: "В обороте", suffix: "VTX" },
        { label: "Всего сожжено", suffix: "VTX" },
        { label: "Макс. кошелёк", suffix: "от предложения" },
      ],
    },
    footer: {
      brandDesc:
        "Наиболее капиталоэффективный протокол ликвидности в DeFi. Мгновенные свопы, нейросетевой роутинг и защита ИИ — в 14 сетях.",
      columns: [
        {
          heading: "Протокол",
          links: ["Своп", "Ликвидность", "Хранилища", "Аналитика", "Мост"],
        },
        {
          heading: "Разработчикам",
          links: ["Документация", "Справочник SDK", "Смарт-контракты", "Bug Bounty", "Аудиты"],
        },
        {
          heading: "Сообщество",
          links: ["Управление", "Форум", "Блог", "Бренд-кит", "Карьера"],
        },
      ],
      copyright: "© 2024 Vortex Protocol. Все права защищены.",
      legalLinks: ["Политика конфиденциальности", "Условия использования", "Политика cookies"],
      allSystems: "Все системы работают",
    },
  },
}

export const useT = (lang: Lang) => translations[lang]
