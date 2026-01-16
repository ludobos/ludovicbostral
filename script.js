// ============================================
// TRANSLATIONS
// ============================================

const translations = {
    en: {
        baseline: "Strategic Technology Consulting",
        "hero.title": "Strategic Technology Consulting for Streaming Platforms",
        "hero.subtitle": "25+ years building and scaling OTT platforms",
        "cta.contact": "Contact Me",

        // Services
        "services.consulting.title": "Strategic Technology Consulting",
        "services.consulting.description": "Platform architecture, technology stack selection, and go-to-market strategy for streaming services",
        "services.consulting.feature1": "Technology audits and recommendations",
        "services.consulting.feature2": "OTT monetization strategy (SVOD/AVOD/FAST)",
        "services.consulting.feature3": "Cloud infrastructure optimization (AWS/GCP)",
        "services.consulting.feature4": "CDN and encoding architecture",
        "services.consulting.pricing": "From €1,500/day",

        "services.cto.title": "Fractional CTO Services",
        "services.cto.description": "Part-time strategic technology leadership for media startups and scale-ups",
        "services.cto.feature1": "Ongoing strategic guidance",
        "services.cto.feature2": "Team structure and hiring strategy",
        "services.cto.feature3": "Technology roadmap and prioritization",
        "services.cto.feature4": "Investor and board reporting",
        "services.cto.pricing": "Custom retainer",

        "services.placement.title": "Executive Placement",
        "services.placement.description": "Identify and place top technology leaders (CTO, VP Engineering, Head of Product)",
        "services.placement.feature1": "Proven track record in executive recruitment",
        "services.placement.feature2": "Deep network in streaming/media tech",
        "services.placement.feature3": "Cultural fit assessment",
        "services.placement.feature4": "Compensation benchmarking",
        "services.placement.pricing": "€15-20K per placement",

        // Social Proof
        "socialProof.label": "Experience includes",
        "socialProof.partnerships": "Partnerships with",

        // Expertise
        "expertise.title": "Core Expertise",
        "expertise.item1": "OTT Platforms (VOD/SVOD/AVOD/FAST)",
        "expertise.item2": "Video Technology (Encoding, DRM, CDN)",
        "expertise.item3": "Cloud Infrastructure (AWS, GCP)",
        "expertise.item4": "Team Scaling",
        "expertise.item5": "International Expansion",
        "expertise.item6": "P&L Management",
        "expertise.item7": "Fundraising",

        // Content
        "content.title": "Thought Leadership",
        "content.newsletter.title": "Streaming Radar",
        "content.newsletter.description": "Weekly insights on the streaming industry. In-depth analysis of OTT trends, platform strategies, and technology innovations. Followed by professionals from Netflix, Amazon Prime Video, Disney+, and other leading streaming services.",
        "content.newsletter.cta": "Subscribe",
        "content.podcast.title": "On va taper dedans",
        "content.podcast.description": "French podcast about Top Chef and culinary competition shows",
        "content.podcast.cta": "Listen",

        // About
        "about.title": "About Ludovic",
        "about.text": "CTO with 25+ years scaling streaming platforms globally. R&D Manager at M6 Web where he created M6 Replay (France's leading catch-up TV service), co-founded Afrostream (Y Combinator Summer 2015), scaled Majelan audio streaming platform. Expert in OTT strategy, platform architecture, and team building. Author of Streaming Radar newsletter and co-host of 'On va taper dedans' podcast.",

        // Contact
        "contact.title": "Ready to discuss your project?",

        // Lead Capture
        "leadCapture.title": "Get a Free 30-Minute Strategy Session",
        "leadCapture.subtitle": "Discuss your OTT project and get actionable recommendations",
        "leadCapture.benefit1": "Review your current platform architecture",
        "leadCapture.benefit2": "Identify optimization opportunities",
        "leadCapture.benefit3": "Get personalized recommendations",
        "leadCapture.benefit4": "No obligation, completely free",
        "leadCapture.badge1": "Y Combinator Alumni",
        "leadCapture.badge2": "25+ Years Experience",
        "leadCapture.badge3": "50M+ Users Served",

        // Form
        "form.fullName": "Full Name *",
        "form.fullNamePlaceholder": "John Doe",
        "form.email": "Email Address *",
        "form.emailPlaceholder": "john@company.com",
        "form.company": "Company Name",
        "form.companyPlaceholder": "Your Company",
        "form.service": "Service Interest *",
        "form.serviceSelect": "Select a service...",
        "form.serviceConsulting": "Strategic Consulting",
        "form.serviceCTO": "Fractional CTO",
        "form.servicePlacement": "Executive Placement",
        "form.serviceOther": "Other",
        "form.budget": "Budget Range *",
        "form.budgetSelect": "Select budget range...",
        "form.budget10k": "< €10,000",
        "form.budget50k": "€10,000 - €50,000",
        "form.budget100k": "€50,000 - €100,000",
        "form.budget100kPlus": "> €100,000",
        "form.budgetNotSure": "Not sure yet",
        "form.message": "Tell me about your project *",
        "form.messagePlaceholder": "Describe your streaming platform needs...",
        "form.submit": "Get Free Consultation",
        "form.errorRequired": "This field is required",
        "form.errorEmail": "Please enter a valid email address",

        // Resources
        "resources.title": "Free Resources",
        "resources.subtitle": "Download battle-tested tools used by leading streaming platforms",
        "resources.badgePopular": "Most Popular",
        "resources.cta": "Download Free PDF",

        "resources.resource1.title": "OTT Platform Vendor Comparison Checklist",
        "resources.resource1.description": "Compare 50+ OTT vendors across 15 critical criteria: CDN performance, DRM support, encoding quality, analytics depth, and more. Save weeks of research.",
        "resources.resource1.feature1": "✓ 50+ vendors evaluated",
        "resources.resource1.feature2": "✓ 15 comparison criteria",
        "resources.resource1.feature3": "✓ Pricing benchmarks included",
        "resources.resource1.value": "Value: €299",

        "resources.resource2.title": "SVOD vs AVOD vs FAST Revenue Calculator",
        "resources.resource2.description": "Excel template to model different monetization strategies. Input your audience size, pricing, and ad inventory to project revenues across SVOD, AVOD, and FAST models.",
        "resources.resource2.feature1": "✓ 3 monetization models",
        "resources.resource2.feature2": "✓ 5-year projections",
        "resources.resource2.feature3": "✓ Scenario comparison tool",
        "resources.resource2.value": "Value: €199",

        "resources.resource3.title": "CTO Hiring Guide for Media Startups",
        "resources.resource3.description": "How to evaluate technical candidates for streaming platforms. Includes 50+ interview questions, red flags to watch for, and compensation benchmarks across Europe.",
        "resources.resource3.feature1": "✓ 50+ interview questions",
        "resources.resource3.feature2": "✓ Technical assessment framework",
        "resources.resource3.feature3": "✓ Salary benchmarks EU/US",
        "resources.resource3.value": "Value: €249",

        // Modal
        "modal.title": "Download Your Free Resource",
        "modal.description": "Enter your email to receive instant access",
        "modal.emailPlaceholder": "your@email.com",
        "modal.submit": "Send Me the Resource",
        "modal.privacy": "🔒 No spam. Unsubscribe anytime. You'll also receive occasional updates from Streaming Radar newsletter.",
        "modal.trust1": "✓ 2,000+ downloads",
        "modal.trust2": "✓ Used by Netflix, Amazon, Disney+ professionals",

        // Results
        "results.title": "Results That Matter",
        "results.stat1.label": "Users Served Globally",
        "results.stat1.detail": "M6 Replay: 0 to 50M users (2008-2013)",
        "results.stat2.label": "Total Capital Raised",
        "results.stat2.detail": "Afrostream $4M + Majelan $10M + Kessel $1.5M",
        "results.stat3.label": "Streaming Platforms Scaled",
        "results.stat3.detail": "From 0 to millions of users",
        "results.stat4.label": "Years of Experience",
        "results.stat4.detail": "Since 2000, from M6 to Kessel",

        // Testimonials
        "testimonials.title": "What Clients Say",
        "testimonials.testimonial1.text": "Ludovic helped us scale our streaming platform from 0 to 2M users in 18 months. His technical expertise in CDN optimization and DRM implementation was crucial. The architecture he designed handled 10x traffic without issues.",
        "testimonials.testimonial1.name": "Patrick Z.",
        "testimonials.testimonial1.role": "CEO, European Streaming Platform",
        "testimonials.testimonial2.text": "Working with Ludovic as fractional CTO was transformative. He rebuilt our tech stack, established engineering best practices, and prepared us for international expansion. His strategic vision goes beyond just technology.",
        "testimonials.testimonial2.name": "Thibaut S.",
        "testimonials.testimonial2.role": "Founder, Audio Streaming Startup",
        "testimonials.testimonial3.text": "Ludovic's Streaming Radar newsletter is essential reading for anyone in OTT. His analysis of platform strategies and monetization models helped us pivot from SVOD to hybrid AVOD/SVOD, increasing revenue by 40%.",
        "testimonials.testimonial3.name": "Alexandre M.",
        "testimonials.testimonial3.role": "VP Product, Media Tech Company",
        "testimonials.partnersLabel": "Companies & Partnerships"
    },

    fr: {
        baseline: "Conseil Stratégique en Technologies",
        "hero.title": "Conseil Stratégique en Technologies pour Plateformes de Streaming",
        "hero.subtitle": "25+ ans d'expérience dans la création et le scaling de plateformes OTT",
        "cta.contact": "Me Contacter",

        // Services
        "services.consulting.title": "Conseil Stratégique en Technologies",
        "services.consulting.description": "Architecture de plateforme, sélection de stack technologique et stratégie go-to-market pour services de streaming",
        "services.consulting.feature1": "Audits technologiques et recommandations",
        "services.consulting.feature2": "Stratégie de monétisation OTT (SVOD/AVOD/FAST)",
        "services.consulting.feature3": "Optimisation infrastructure cloud (AWS/GCP)",
        "services.consulting.feature4": "Architecture CDN et encodage",
        "services.consulting.pricing": "À partir de 1 500€/jour",

        "services.cto.title": "Services de CTO à Temps Partiel",
        "services.cto.description": "Leadership technologique stratégique à temps partiel pour startups et scale-ups média",
        "services.cto.feature1": "Accompagnement stratégique continu",
        "services.cto.feature2": "Structure d'équipe et stratégie de recrutement",
        "services.cto.feature3": "Roadmap technologique et priorisation",
        "services.cto.feature4": "Reporting investisseurs et conseil d'administration",
        "services.cto.pricing": "Forfait sur mesure",

        "services.placement.title": "Recrutement de Dirigeants",
        "services.placement.description": "Identifier et placer les meilleurs leaders technologiques (CTO, VP Engineering, Head of Product)",
        "services.placement.feature1": "Historique prouvé en recrutement de dirigeants",
        "services.placement.feature2": "Réseau profond dans les technologies streaming/média",
        "services.placement.feature3": "Évaluation de l'adéquation culturelle",
        "services.placement.feature4": "Benchmarking de rémunération",
        "services.placement.pricing": "15-20K€ par placement",

        // Social Proof
        "socialProof.label": "Expérience comprenant",
        "socialProof.partnerships": "Partenariats avec",

        // Expertise
        "expertise.title": "Expertises Clés",
        "expertise.item1": "Plateformes OTT (VOD/SVOD/AVOD/FAST)",
        "expertise.item2": "Technologies Vidéo (Encodage, DRM, CDN)",
        "expertise.item3": "Infrastructure Cloud (AWS, GCP)",
        "expertise.item4": "Scaling d'Équipes",
        "expertise.item5": "Expansion Internationale",
        "expertise.item6": "Gestion P&L",
        "expertise.item7": "Levées de Fonds",

        // Content
        "content.title": "Leadership d'Opinion",
        "content.newsletter.title": "Streaming Radar",
        "content.newsletter.description": "Analyses hebdomadaires de l'industrie du streaming. Analyse approfondie des tendances OTT, stratégies de plateformes et innovations technologiques. Suivi par des professionnels de Netflix, Amazon Prime Video, Disney+ et autres grands services de streaming.",
        "content.newsletter.cta": "S'abonner",
        "content.podcast.title": "On va taper dedans",
        "content.podcast.description": "Podcast français sur Top Chef et les émissions culinaires de compétition",
        "content.podcast.cta": "Écouter",

        // About
        "about.title": "À Propos de Ludovic",
        "about.text": "CTO avec 25+ ans d'expérience dans le scaling de plateformes de streaming à l'échelle mondiale. R&D Manager chez M6 Web où il a créé M6 Replay (service de catch-up TV leader en France), co-fondateur d'Afrostream (Y Combinator Summer 2015), a fait croître la plateforme audio Majelan. Expert en stratégie OTT, architecture de plateforme et constitution d'équipes. Auteur de la newsletter Streaming Radar et co-animateur du podcast 'On va taper dedans'.",

        // Contact
        "contact.title": "Prêt à discuter de votre projet ?",

        // Lead Capture
        "leadCapture.title": "Obtenez une Session Stratégique Gratuite de 30 Minutes",
        "leadCapture.subtitle": "Discutez de votre projet OTT et recevez des recommandations concrètes",
        "leadCapture.benefit1": "Revue de votre architecture de plateforme actuelle",
        "leadCapture.benefit2": "Identification des opportunités d'optimisation",
        "leadCapture.benefit3": "Recommandations personnalisées",
        "leadCapture.benefit4": "Sans engagement, totalement gratuit",
        "leadCapture.badge1": "Y Combinator Alumni",
        "leadCapture.badge2": "25+ Ans d'Expérience",
        "leadCapture.badge3": "50M+ Utilisateurs Servis",

        // Form
        "form.fullName": "Nom Complet *",
        "form.fullNamePlaceholder": "Jean Dupont",
        "form.email": "Adresse Email *",
        "form.emailPlaceholder": "jean@entreprise.com",
        "form.company": "Nom de l'Entreprise",
        "form.companyPlaceholder": "Votre Entreprise",
        "form.service": "Service d'Intérêt *",
        "form.serviceSelect": "Sélectionnez un service...",
        "form.serviceConsulting": "Conseil Stratégique",
        "form.serviceCTO": "CTO à Temps Partiel",
        "form.servicePlacement": "Recrutement de Dirigeants",
        "form.serviceOther": "Autre",
        "form.budget": "Budget *",
        "form.budgetSelect": "Sélectionnez votre budget...",
        "form.budget10k": "< 10 000€",
        "form.budget50k": "10 000€ - 50 000€",
        "form.budget100k": "50 000€ - 100 000€",
        "form.budget100kPlus": "> 100 000€",
        "form.budgetNotSure": "Pas encore sûr",
        "form.message": "Parlez-moi de votre projet *",
        "form.messagePlaceholder": "Décrivez les besoins de votre plateforme de streaming...",
        "form.submit": "Obtenir une Consultation Gratuite",
        "form.errorRequired": "Ce champ est obligatoire",
        "form.errorEmail": "Veuillez entrer une adresse email valide",

        // Resources
        "resources.title": "Ressources Gratuites",
        "resources.subtitle": "Téléchargez des outils éprouvés utilisés par les principales plateformes de streaming",
        "resources.badgePopular": "Le Plus Populaire",
        "resources.cta": "Télécharger le PDF Gratuit",

        "resources.resource1.title": "Checklist Comparaison Vendeurs OTT",
        "resources.resource1.description": "Comparez 50+ fournisseurs OTT selon 15 critères essentiels : performance CDN, support DRM, qualité d'encodage, profondeur analytique, et plus. Économisez des semaines de recherche.",
        "resources.resource1.feature1": "✓ 50+ vendeurs évalués",
        "resources.resource1.feature2": "✓ 15 critères de comparaison",
        "resources.resource1.feature3": "✓ Benchmarks tarifaires inclus",
        "resources.resource1.value": "Valeur : 299€",

        "resources.resource2.title": "Calculateur Revenus SVOD vs AVOD vs FAST",
        "resources.resource2.description": "Template Excel pour modéliser différentes stratégies de monétisation. Saisissez votre audience, tarifs et inventaire publicitaire pour projeter les revenus SVOD, AVOD et FAST.",
        "resources.resource2.feature1": "✓ 3 modèles de monétisation",
        "resources.resource2.feature2": "✓ Projections sur 5 ans",
        "resources.resource2.feature3": "✓ Outil de comparaison de scénarios",
        "resources.resource2.value": "Valeur : 199€",

        "resources.resource3.title": "Guide Recrutement CTO pour Startups Média",
        "resources.resource3.description": "Comment évaluer les candidats techniques pour plateformes de streaming. Inclut 50+ questions d'entretien, signaux d'alerte et benchmarks salariaux en Europe.",
        "resources.resource3.feature1": "✓ 50+ questions d'entretien",
        "resources.resource3.feature2": "✓ Framework d'évaluation technique",
        "resources.resource3.feature3": "✓ Benchmarks salaires EU/US",
        "resources.resource3.value": "Valeur : 249€",

        // Modal
        "modal.title": "Téléchargez Votre Ressource Gratuite",
        "modal.description": "Entrez votre email pour recevoir un accès instantané",
        "modal.emailPlaceholder": "votre@email.com",
        "modal.submit": "Envoyez-moi la Ressource",
        "modal.privacy": "🔒 Pas de spam. Désabonnement à tout moment. Vous recevrez également des mises à jour occasionnelles de la newsletter Streaming Radar.",
        "modal.trust1": "✓ 2 000+ téléchargements",
        "modal.trust2": "✓ Utilisé par des professionnels Netflix, Amazon, Disney+",

        // Results
        "results.title": "Résultats Concrets",
        "results.stat1.label": "Utilisateurs Servis Globalement",
        "results.stat1.detail": "M6 Replay : 0 à 50M d'utilisateurs (2008-2013)",
        "results.stat2.label": "Capital Total Levé",
        "results.stat2.detail": "Afrostream $4M + Majelan $10M + Kessel $1.5M",
        "results.stat3.label": "Plateformes de Streaming Développées",
        "results.stat3.detail": "De 0 à des millions d'utilisateurs",
        "results.stat4.label": "Années d'Expérience",
        "results.stat4.detail": "Depuis 2000, de M6 à Kessel",

        // Testimonials
        "testimonials.title": "Ce Que Disent Les Clients",
        "testimonials.testimonial1.text": "Ludovic nous a aidés à développer notre plateforme de streaming de 0 à 2M d'utilisateurs en 18 mois. Son expertise technique en optimisation CDN et implémentation DRM a été cruciale. L'architecture qu'il a conçue a géré un trafic 10x supérieur sans problème.",
        "testimonials.testimonial1.name": "Patrick Z.",
        "testimonials.testimonial1.role": "CEO, Plateforme de Streaming Européenne",
        "testimonials.testimonial2.text": "Travailler avec Ludovic en tant que CTO fractionné a été transformateur. Il a reconstruit notre stack technologique, établi les meilleures pratiques d'ingénierie et nous a préparés pour l'expansion internationale. Sa vision stratégique va au-delà de la technologie.",
        "testimonials.testimonial2.name": "Thibaut S.",
        "testimonials.testimonial2.role": "Fondateur, Startup Audio Streaming",
        "testimonials.testimonial3.text": "La newsletter Streaming Radar de Ludovic est une lecture essentielle pour tous ceux qui travaillent dans l'OTT. Son analyse des stratégies de plateformes et modèles de monétisation nous a aidés à pivoter de SVOD vers un modèle hybride AVOD/SVOD, augmentant nos revenus de 40%.",
        "testimonials.testimonial3.name": "Alexandre M.",
        "testimonials.testimonial3.role": "VP Produit, Entreprise Media Tech",
        "testimonials.partnersLabel": "Entreprises & Partenariats"
    },

    zh: {
        baseline: "战略技术咨询",
        "hero.title": "流媒体平台战略技术咨询",
        "hero.subtitle": "25年以上OTT平台搭建与扩展经验",
        "cta.contact": "联系我",

        // Services
        "services.consulting.title": "战略技术咨询",
        "services.consulting.description": "流媒体服务的平台架构、技术栈选择和市场推进策略",
        "services.consulting.feature1": "技术审计与建议",
        "services.consulting.feature2": "OTT变现策略（SVOD/AVOD/FAST）",
        "services.consulting.feature3": "云基础设施优化（AWS/GCP）",
        "services.consulting.feature4": "CDN和编码架构",
        "services.consulting.pricing": "每日1500欧元起",

        "services.cto.title": "兼职CTO服务",
        "services.cto.description": "为媒体初创公司和成长型企业提供兼职战略技术领导服务",
        "services.cto.feature1": "持续战略指导",
        "services.cto.feature2": "团队结构与招聘策略",
        "services.cto.feature3": "技术路线图与优先级规划",
        "services.cto.feature4": "投资人与董事会报告",
        "services.cto.pricing": "定制服务费",

        "services.placement.title": "高管招聘",
        "services.placement.description": "识别并安置顶尖技术领导者（CTO、工程副总裁、产品负责人）",
        "services.placement.feature1": "高管招聘领域经验丰富",
        "services.placement.feature2": "流媒体/媒体技术领域深厚人脉",
        "services.placement.feature3": "文化契合度评估",
        "services.placement.feature4": "薪酬基准分析",
        "services.placement.pricing": "每次安置15-20K欧元",

        // Social Proof
        "socialProof.label": "工作经历包括",
        "socialProof.partnerships": "合作伙伴",

        // Expertise
        "expertise.title": "核心专长",
        "expertise.item1": "OTT平台（VOD/SVOD/AVOD/FAST）",
        "expertise.item2": "视频技术（编码、DRM、CDN）",
        "expertise.item3": "云基础设施（AWS、GCP）",
        "expertise.item4": "团队扩展",
        "expertise.item5": "国际扩张",
        "expertise.item6": "损益管理",
        "expertise.item7": "融资",

        // Content
        "content.title": "思想领导力",
        "content.newsletter.title": "Streaming Radar",
        "content.newsletter.description": "每周流媒体行业深度洞察。深入分析OTT趋势、平台策略和技术创新。Netflix、Amazon Prime Video、Disney+等领先流媒体服务的专业人士关注。",
        "content.newsletter.cta": "订阅",
        "content.podcast.title": "On va taper dedans",
        "content.podcast.description": "关于Top Chef和烹饪竞赛节目的法语播客",
        "content.podcast.cta": "收听",

        // About
        "about.title": "关于Ludovic",
        "about.text": "拥有25年以上全球流媒体平台扩展经验的CTO。曾任M6 Web研发经理，创建了M6 Replay（法国领先的电视回看服务），Afrostream联合创始人（Y Combinator 2015夏季班），扩展了Majelan音频流媒体平台。在OTT战略、平台架构和团队建设方面拥有专业知识。Streaming Radar时事通讯作者，'On va taper dedans'播客联合主持人。",

        // Contact
        "contact.title": "准备讨论您的项目了吗？",

        // Lead Capture
        "leadCapture.title": "获取免费30分钟战略咨询",
        "leadCapture.subtitle": "讨论您的OTT项目并获得可行的建议",
        "leadCapture.benefit1": "审查您当前的平台架构",
        "leadCapture.benefit2": "识别优化机会",
        "leadCapture.benefit3": "获得个性化建议",
        "leadCapture.benefit4": "无义务，完全免费",
        "leadCapture.badge1": "Y Combinator校友",
        "leadCapture.badge2": "25年以上经验",
        "leadCapture.badge3": "服务50M+用户",

        // Form
        "form.fullName": "全名 *",
        "form.fullNamePlaceholder": "张三",
        "form.email": "电子邮件地址 *",
        "form.emailPlaceholder": "zhang@company.com",
        "form.company": "公司名称",
        "form.companyPlaceholder": "您的公司",
        "form.service": "服务兴趣 *",
        "form.serviceSelect": "选择服务...",
        "form.serviceConsulting": "战略咨询",
        "form.serviceCTO": "兼职CTO",
        "form.servicePlacement": "高管招聘",
        "form.serviceOther": "其他",
        "form.budget": "预算范围 *",
        "form.budgetSelect": "选择预算范围...",
        "form.budget10k": "< €10,000",
        "form.budget50k": "€10,000 - €50,000",
        "form.budget100k": "€50,000 - €100,000",
        "form.budget100kPlus": "> €100,000",
        "form.budgetNotSure": "尚未确定",
        "form.message": "告诉我您的项目 *",
        "form.messagePlaceholder": "描述您的流媒体平台需求...",
        "form.submit": "获得免费咨询",
        "form.errorRequired": "此字段为必填项",
        "form.errorEmail": "请输入有效的电子邮件地址",

        // Resources
        "resources.title": "免费资源",
        "resources.subtitle": "下载领先流媒体平台使用的经过实战检验的工具",
        "resources.badgePopular": "最受欢迎",
        "resources.cta": "下载免费PDF",

        "resources.resource1.title": "OTT平台供应商对比清单",
        "resources.resource1.description": "根据15个关键标准比较50多家OTT供应商：CDN性能、DRM支持、编码质量、分析深度等。节省数周研究时间。",
        "resources.resource1.feature1": "✓ 评估50+供应商",
        "resources.resource1.feature2": "✓ 15个比较标准",
        "resources.resource1.feature3": "✓ 包含价格基准",
        "resources.resource1.value": "价值：€299",

        "resources.resource2.title": "SVOD vs AVOD vs FAST收入计算器",
        "resources.resource2.description": "Excel模板用于建模不同的变现策略。输入您的受众规模、定价和广告库存，以预测SVOD、AVOD和FAST模式的收入。",
        "resources.resource2.feature1": "✓ 3种变现模型",
        "resources.resource2.feature2": "✓ 5年预测",
        "resources.resource2.feature3": "✓ 场景比较工具",
        "resources.resource2.value": "价值：€199",

        "resources.resource3.title": "媒体初创公司CTO招聘指南",
        "resources.resource3.description": "如何评估流媒体平台的技术候选人。包括50多个面试问题、需要注意的危险信号以及欧洲薪酬基准。",
        "resources.resource3.feature1": "✓ 50+面试问题",
        "resources.resource3.feature2": "✓ 技术评估框架",
        "resources.resource3.feature3": "✓ 欧美薪资基准",
        "resources.resource3.value": "价值：€249",

        // Modal
        "modal.title": "下载您的免费资源",
        "modal.description": "输入您的电子邮件以立即获得访问权限",
        "modal.emailPlaceholder": "your@email.com",
        "modal.submit": "发送资源给我",
        "modal.privacy": "🔒 无垃圾邮件。随时取消订阅。您还将收到Streaming Radar时事通讯的偶尔更新。",
        "modal.trust1": "✓ 2000+次下载",
        "modal.trust2": "✓ Netflix、Amazon、Disney+专业人士使用",

        // Results
        "results.title": "成果展示",
        "results.stat1.label": "全球服务用户数",
        "results.stat1.detail": "M6 Replay：从0到5000万用户（2008-2013）",
        "results.stat2.label": "累计融资额",
        "results.stat2.detail": "Afrostream $4M + Majelan $10M + Kessel $1.5M",
        "results.stat3.label": "扩展的流媒体平台",
        "results.stat3.detail": "从0到数百万用户",
        "results.stat4.label": "工作年限",
        "results.stat4.detail": "自2000年起，从M6到Kessel",

        // Testimonials
        "testimonials.title": "客户评价",
        "testimonials.testimonial1.text": "Ludovic帮助我们在18个月内将流媒体平台从0扩展到200万用户。他在CDN优化和DRM实施方面的技术专长至关重要。他设计的架构毫无问题地处理了10倍的流量。",
        "testimonials.testimonial1.name": "Patrick Z.",
        "testimonials.testimonial1.role": "CEO，欧洲流媒体平台",
        "testimonials.testimonial2.text": "与Ludovic作为兼职CTO合作是变革性的。他重建了我们的技术栈，建立了工程最佳实践，并为我们的国际扩张做好了准备。他的战略愿景超越了技术本身。",
        "testimonials.testimonial2.name": "Thibaut S.",
        "testimonials.testimonial2.role": "创始人，音频流媒体创业公司",
        "testimonials.testimonial3.text": "Ludovic的Streaming Radar时事通讯是OTT领域任何人的必读内容。他对平台策略和变现模型的分析帮助我们从SVOD转向混合AVOD/SVOD模式，收入增长了40%。",
        "testimonials.testimonial3.name": "Alexandre M.",
        "testimonials.testimonial3.role": "产品副总裁，媒体科技公司",
        "testimonials.partnersLabel": "公司与合作伙伴"
    }
};

// ============================================
// LANGUAGE SWITCHING
// ============================================

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Add event listeners to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        // Validate language
        if (!translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }

        this.currentLang = lang;

        // Save to localStorage
        localStorage.setItem('preferred-language', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Update all text with data-i18n attribute
        this.updatePageText();
    }

    updatePageText() {
        // Update text content elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = translations[this.currentLang][key];

            if (translation) {
                // Check if element is an input/textarea
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Translation not found for key: ${key} in language: ${this.currentLang}`);
            }
        });

        // Update placeholder elements
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.dataset.i18nPlaceholder;
            const translation = translations[this.currentLang][key];

            if (translation) {
                element.placeholder = translation;
            }
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create Intersection Observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        // Observe all elements with fade-in class
        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scroll to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if href is just "#"
                if (href === '#' || href === '#privacy' || href === '#terms') {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// IMAGE LAZY LOADING FALLBACK
// ============================================

class LazyLoadImages {
    constructor() {
        this.init();
    }

    init() {
        // Check if browser supports native lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for browsers that don't support native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 50) {
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================

class CounterAnimation {
    constructor() {
        this.counters = [];
        this.observer = null;
        this.init();
    }

    init() {
        // Find all result numbers
        const resultNumbers = document.querySelectorAll('.result-number[data-count]');

        resultNumbers.forEach(element => {
            this.counters.push({
                element,
                target: parseInt(element.dataset.count),
                prefix: element.dataset.prefix || '',
                suffix: element.dataset.suffix || '',
                hasAnimated: false
            });
        });

        // Create intersection observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Find counter for this element
                    const counter = this.counters.find(c => c.element === entry.target);
                    if (counter && !counter.hasAnimated) {
                        this.animateCounter(counter);
                        counter.hasAnimated = true;
                    }
                }
            });
        }, options);

        // Observe all counter elements
        this.counters.forEach(counter => {
            this.observer.observe(counter.element);
        });
    }

    animateCounter(counter) {
        const duration = 2000; // 2 seconds
        const start = 0;
        const end = counter.target;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(start + (end - start) * easeProgress);

            // Format number
            let displayValue = this.formatNumber(current, counter.target);
            displayValue = counter.prefix + displayValue + counter.suffix;

            counter.element.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exact
                let finalValue = this.formatNumber(end, end);
                finalValue = counter.prefix + finalValue + counter.suffix;
                counter.element.textContent = finalValue;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    formatNumber(value, target) {
        // For millions (50M+)
        if (target >= 1000000) {
            const millions = value / 1000000;
            return millions >= 1 ? Math.floor(millions) : '0';
        }
        // For thousands with decimals (15.5M)
        else if (target >= 100000) {
            const millions = value / 1000000;
            return millions >= 0.1 ? (millions).toFixed(1) : '0';
        }
        // Regular numbers
        else {
            return value.toString();
        }
    }
}

// ============================================
// ANALYTICS TRACKING
// ============================================

class Analytics {
    constructor() {
        this.scrollDepthTracked = {
            25: false,
            50: false,
            75: false,
            100: false
        };
        this.formStartTracked = {};
        this.init();
    }

    init() {
        this.trackScrollDepth();
        this.trackCTAClicks();
        this.trackFormStarts();
        this.trackOutboundLinks();
    }

    // Track scroll depth milestones
    trackScrollDepth() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight;
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

                    // Check each milestone
                    [25, 50, 75, 100].forEach(milestone => {
                        if (scrollPercent >= milestone && !this.scrollDepthTracked[milestone]) {
                            this.scrollDepthTracked[milestone] = true;
                            this.sendEvent('scroll_depth', {
                                percent: milestone
                            });
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Track CTA button clicks
    trackCTAClicks() {
        const ctaSelectors = '.cta-button, .content-cta';
        document.querySelectorAll(ctaSelectors).forEach(button => {
            button.addEventListener('click', (e) => {
                const ctaText = e.target.textContent.trim();
                const section = this.getParentSection(e.target);
                const ctaType = e.target.classList.contains('cta-button') ? 'primary' : 'secondary';

                this.sendEvent('cta_click', {
                    cta_text: ctaText,
                    cta_location: section,
                    cta_type: ctaType
                });
            });
        });
    }

    // Track form starts (first interaction)
    trackFormStarts() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const formId = form.id || 'unnamed-form';
            const formType = form.querySelector('[name="form_type"]')?.value || 'unknown';

            // Track first focus on any input
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (!this.formStartTracked[formId]) {
                        this.formStartTracked[formId] = true;
                        this.sendEvent('form_start', {
                            form_id: formId,
                            form_type: formType
                        });
                    }
                }, { once: true });
            });
        });
    }

    // Track outbound link clicks
    trackOutboundLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const url = e.target.href;
                const hostname = new URL(url).hostname;

                // Only track if it's an external link
                if (hostname !== window.location.hostname) {
                    this.sendEvent('outbound_click', {
                        link_url: url,
                        link_text: e.target.textContent.trim()
                    });
                }
            });
        });
    }

    // Track form submissions
    trackFormSubmit(formId, formType) {
        this.sendEvent('form_submit', {
            form_id: formId,
            form_type: formType
        });
    }

    // Get parent section name
    getParentSection(element) {
        const section = element.closest('section');
        if (section) {
            return section.className.split(' ')[0] || 'unknown';
        }
        return 'unknown';
    }

    // Send event to Google Analytics and console
    sendEvent(eventName, params = {}) {
        // Log to console for debugging
        console.log(`📊 Analytics Event: ${eventName}`, params);

        // Send to Google Analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }

        // Placeholder for Facebook Pixel (to be added in SESSION 5)
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, params);
        }
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;

        this.formspreeEndpoint = 'https://formspree.io/f/mzdddplp'; // Formspree endpoint configured
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.submitText = this.submitButton.querySelector('.submit-text');
        this.submitLoader = this.submitButton.querySelector('.submit-loader');
        this.messageContainer = this.form.querySelector('.form-message');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                // Clear error on input
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                    const errorSpan = formGroup.querySelector('.form-error');
                    if (errorSpan) errorSpan.textContent = '';
                }
            });
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        if (!this.validateForm()) {
            return;
        }

        // Show loading state
        this.setLoading(true);

        try {
            const formData = new FormData(this.form);

            // Check if Formspree endpoint is configured
            if (this.formspreeEndpoint === 'YOUR_FORMSPREE_ENDPOINT') {
                // Simulate success for demo purposes
                console.warn('⚠️ Formspree endpoint not configured. Form submission simulated.');
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Track event
                if (window.analytics) {
                    window.analytics.trackFormSubmit(this.form.id, formData.get('form_type'));
                }

                this.showMessage('success', '✓ Thank you! I\'ll get back to you within 24 hours.');
                this.form.reset();
            } else {
                // Actual Formspree submission
                const response = await fetch(this.formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Track event
                    if (window.analytics) {
                        window.analytics.trackFormSubmit(this.form.id, formData.get('form_type'));
                    }

                    this.showMessage('success', '✓ Thank you! I\'ll get back to you within 24 hours.');
                    this.form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('error', '✗ Something went wrong. Please try again or email me directly at lbostral@gmail.com');
        } finally {
            this.setLoading(false);
        }
    }

    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorSpan = formGroup?.querySelector('.form-error');
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = translations[window.languageSwitcher?.currentLang || 'en']['form.errorRequired'] || 'This field is required';
        }
        // Validate email format
        else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorMessage = translations[window.languageSwitcher?.currentLang || 'en']['form.errorEmail'] || 'Please enter a valid email address';
            }
        }

        if (errorMessage) {
            formGroup?.classList.add('error');
            if (errorSpan) errorSpan.textContent = errorMessage;
            return false;
        } else {
            formGroup?.classList.remove('error');
            if (errorSpan) errorSpan.textContent = '';
            return true;
        }
    }

    setLoading(isLoading) {
        this.submitButton.disabled = isLoading;

        if (isLoading) {
            this.submitText.style.display = 'none';
            this.submitLoader.style.display = 'inline';
        } else {
            this.submitText.style.display = 'inline';
            this.submitLoader.style.display = 'none';
        }
    }

    showMessage(type, message) {
        this.messageContainer.textContent = message;
        this.messageContainer.className = `form-message ${type}`;
        this.messageContainer.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.messageContainer.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// RESOURCE MODAL HANDLING
// ============================================

class ResourceModal {
    constructor() {
        this.modal = document.getElementById('resourceModal');
        this.form = document.getElementById('resourceForm');
        this.overlay = this.modal.querySelector('.resource-modal-overlay');
        this.closeBtn = this.modal.querySelector('.resource-modal-close');
        this.resourceTypeInput = document.getElementById('resourceType');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.submitText = this.submitButton.querySelector('.submit-text');
        this.submitLoader = this.submitButton.querySelector('.submit-loader');
        this.messageContainer = this.form.querySelector('.form-message');
        this.formspreeEndpoint = 'https://formspree.io/f/mzdddplp';

        this.init();
    }

    init() {
        // Listen to resource CTA clicks
        document.querySelectorAll('.resource-cta').forEach(button => {
            button.addEventListener('click', (e) => {
                const resourceType = e.target.dataset.resource;
                this.openModal(resourceType);
            });
        });

        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', () => this.closeModal());

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const emailInput = this.form.querySelector('input[type="email"]');
        emailInput.addEventListener('blur', () => this.validateEmail(emailInput));
        emailInput.addEventListener('input', () => {
            const formGroup = emailInput.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('error');
                const errorSpan = formGroup.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = '';
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    openModal(resourceType) {
        this.resourceTypeInput.value = resourceType;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scroll

        // Track event
        if (window.analytics) {
            window.analytics.sendEvent('resource_modal_opened', {
                resource_type: resourceType
            });
        }

        // Focus email input
        setTimeout(() => {
            this.form.querySelector('input[type="email"]').focus();
        }, 100);
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
        this.form.reset();

        // Clear errors
        const formGroup = this.form.querySelector('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorSpan = formGroup.querySelector('.form-error');
            if (errorSpan) errorSpan.textContent = '';
        }

        // Hide message
        this.messageContainer.style.display = 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();

        const emailInput = this.form.querySelector('input[type="email"]');

        // Validate email
        if (!this.validateEmail(emailInput)) {
            return;
        }

        // Show loading state
        this.setLoading(true);

        try {
            const formData = new FormData(this.form);
            const resourceType = this.resourceTypeInput.value;

            // Submit to Formspree
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Track event
                if (window.analytics) {
                    window.analytics.sendEvent('resource_downloaded', {
                        resource_type: resourceType,
                        email: formData.get('email')
                    });
                }

                this.showMessage('success', '✓ Check your email! The resource is on its way.');

                // Close modal after 2 seconds
                setTimeout(() => {
                    this.closeModal();
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Resource modal submission error:', error);
            this.showMessage('error', '✗ Something went wrong. Please try again or email me at lbostral@gmail.com');
        } finally {
            this.setLoading(false);
        }
    }

    validateEmail(emailInput) {
        const formGroup = emailInput.closest('.form-group');
        const errorSpan = formGroup?.querySelector('.form-error');
        let errorMessage = '';

        if (!emailInput.value.trim()) {
            errorMessage = translations[window.languageSwitcher?.currentLang || 'en']['form.errorRequired'] || 'This field is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                errorMessage = translations[window.languageSwitcher?.currentLang || 'en']['form.errorEmail'] || 'Please enter a valid email address';
            }
        }

        if (errorMessage) {
            formGroup?.classList.add('error');
            if (errorSpan) errorSpan.textContent = errorMessage;
            return false;
        } else {
            formGroup?.classList.remove('error');
            if (errorSpan) errorSpan.textContent = '';
            return true;
        }
    }

    setLoading(isLoading) {
        this.submitButton.disabled = isLoading;

        if (isLoading) {
            this.submitText.style.display = 'none';
            this.submitLoader.style.display = 'inline';
        } else {
            this.submitText.style.display = 'inline';
            this.submitLoader.style.display = 'none';
        }
    }

    showMessage(type, message) {
        this.messageContainer.textContent = message;
        this.messageContainer.className = `form-message ${type}`;
        this.messageContainer.style.display = 'block';
    }
}

// ============================================
// INITIALIZE APP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    window.languageSwitcher = new LanguageSwitcher();
    new ScrollAnimations();
    new SmoothScroll();
    new LazyLoadImages();
    new HeaderScroll();

    // Initialize Analytics
    window.analytics = new Analytics();

    // Initialize Counter Animation
    new CounterAnimation();

    // Initialize Contact Form
    new ContactForm('contactForm');

    // Initialize Resource Modal
    new ResourceModal();

    // Log initialization
    console.log('🚀 Ludovic Bostral Consulting Website Initialized');
    console.log('📧 Contact: lbostral@gmail.com');
    console.log('🔗 LinkedIn: https://linkedin.com/in/ludovicbostral');
    console.log('📰 Newsletter: https://streamingradar.substack.com');
});

// ============================================
// PERFORMANCE MONITORING (Development Only)
// ============================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
    });
}

// ============================================
// ANALYTICS PLACEHOLDER
// ============================================

// Add your analytics code here (Google Analytics, Plausible, etc.)
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');
