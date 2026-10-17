export const content = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      schemes: "Schemes & Support",
      help: "Help",
      tagline: "Skilled Women | Stronger Communities | Brighter Future",
      voiceBtn: "Voice",
      login: "Login / Register",
      guestNotice: "Browsing as Guest. Welcome to NariSetu!"
    },
    hero: {
      govBadge: "Ministry of Rural Development & Skill India Initiative",
      title: "NariSetu",
      subTitle: "Connecting Rural Women with Skills, Opportunities and a Stronger Tomorrow",
      description: "A government-supported platform empowering rural women to master marketable skills, start self-reliant enterprises, and access financial schemes.",
      cards: [
        {
          id: "citizen",
          badge: "For Women / Citizens",
          title: "Women & Artisans",
          desc: "Access vocational training, job linkages, community SHGs, and government financial support.",
          action: "Get Started",
          colorTheme: "pink"
        },
        {
          id: "partner",
          badge: "For Community Support",
          title: "NGOs & SHG Operators",
          desc: "Join as village operator, trainer, self-help group leader, or business aggregator.",
          action: "Partner Login",
          colorTheme: "blue"
        },
        {
          id: "gov",
          badge: "For Government",
          title: "Officials & Gram Panchayats",
          desc: "Survey households, onboard beneficiaries, monitor disbursements, and track progress.",
          action: "Government Login",
          colorTheme: "green"
        }
      ],
      guestLink: "Continue as Guest →"
    },
    features: [
      {
        icon: "graduation-cap",
        title: "Skill Development",
        desc: "Learn high-demand trades from certified master trainers in your own dialect."
      },
      {
        icon: "briefcase",
        title: "Job & Business",
        desc: "Market linkage to buyers, local fairs, e-commerce, and enterprise grants."
      },
      {
        icon: "users",
        title: "Community Support",
        desc: "Collaborate with peer Self Help Groups (SHGs) and village sahayikas."
      },
      {
        icon: "landmark",
        title: "Financial Support",
        desc: "Direct benefit transfers, zero-collateral micro-loans, and machine subsidies."
      },
      {
        icon: "trending-up",
        title: "Progress Tracking",
        desc: "Real-time livelihood metrics, certifications, and verifiable growth records."
      },
      {
        icon: "shield-check",
        title: "Safe & Trusted",
        desc: "Bank-grade digital security backed by Government of India Aadhaar verification."
      }
    ],
    stats: [
      { number: "4,80,000+", label: "Rural Women Enrolled" },
      { number: "18,400+", label: "Active Self Help Groups" },
      { number: "₹120+ Cr", label: "Financial Grants Disbursed" },
      { number: "92%", label: "Livelihood Placement Rate" }
    ],
    about: {
      badge: "02. ABOUT US",
      heading: "Empowering Rural Indian Women Through Technology",
      description: "NariSetu bridges the divide between rural craftswomen and national economic opportunities. By blending grassroots community mobilization with accessible digital tools, we ensure no woman is left behind.",
      cta: "Explore Our Mission",
      storyTitle: "Our Story & Vision",
      storyText: "Originating as a nationwide grassroots bridge ('Setu'), NariSetu was designed to honor the ancestral skills of Indian women—from handloom weaving and handicraft to modern agritech and food processing. We bring bank officers, digital literacy mentors, and verified market buyers straight to the village doorstep.",
      pills: [
        "Financial Support",
        "Skill Training",
        "Start a Business",
        "Self Help Groups (SHGs)",
        "Handloom & Craft"
      ],
      stepsTitle: "How NariSetu Works (6-Step Idea Flow)",
      stepsSubtitle: "From initial doorstep survey to sustained monthly income generation",
      steps: [
        {
          num: "01",
          title: "Survey",
          desc: "Door-to-door digital mapping of skills, household needs, and income aspirations."
        },
        {
          num: "02",
          title: "Register",
          desc: "Instant paperless registration via Aadhaar, biometric, or local Sahayika assistance."
        },
        {
          num: "03",
          title: "Join",
          desc: "Group into certified village cohorts and Self-Help Groups (SHGs) with peer mentors."
        },
        {
          num: "04",
          title: "Inform",
          desc: "Receive localized audio/SMS alerts for relevant subsidies, grants, and training camps."
        },
        {
          num: "05",
          title: "Hire & Sell",
          desc: "Access guaranteed buyer networks, government exhibitions, and direct orders."
        },
        {
          num: "06",
          title: "Report",
          desc: "Transparent tracking of income escalation, credit scores, and household welfare."
        }
      ]
    },
    schemes: {
      badge: "03. SCHEMES & SUPPORT",
      heading: "Find Government Schemes & Financial Support",
      searchPlaceholder: "Search Government Schemes by name, skill, or keyword (e.g., Lakhpati, Loom, Loan)...",
      categories: [
        "All Schemes",
        "Financial Support",
        "Skill Training",
        "Start a Business",
        "Handloom & Craft"
      ],
      list: [
        {
          id: "lakhpati-didi",
          title: "Lakhpati Didi Yojana",
          category: "Financial Support",
          secondaryTag: "Skill Training",
          amount: "Up to ₹5,00,000",
          highlights: [
            "Collateral-free micro-credit for SHG women",
            "Financial literacy and micro-enterprise guidance",
            "Targeting sustained annual household income of ₹1 Lakh+"
          ],
          audioScript: "Lakhpati Didi Yojana provides up to five lakh rupees in collateral-free credit for women in self-help groups to start profitable micro-enterprises.",
          popular: true
        },
        {
          id: "pm-vishwakarma",
          title: "PMRY for Artisans (PM Vishwakarma)",
          category: "Handloom & Craft",
          secondaryTag: "Skill Training",
          amount: "₹15,000 Toolkit + 5% Loan",
          highlights: [
            "Free modern toolkit incentive worth ₹15,000",
            "Subsidized loan up to ₹3,00,000 at 5% interest",
            "National skill certification and marketing support"
          ],
          audioScript: "PM Vishwakarma provides free modern equipment grants worth fifteen thousand rupees and low interest loans for traditional artisans.",
          popular: true
        },
        {
          id: "tailoring-weaving",
          title: "Tailoring & Weaving Grant Scheme",
          category: "Handloom & Craft",
          secondaryTag: "Financial Support",
          amount: "Free Motorized Sewing Machine",
          highlights: [
            "100% subsidized sewing machine & weaving toolkits",
            "Advanced stitching and boutique pattern training",
            "Direct bulk supply contracts with garment exporters"
          ],
          audioScript: "Tailoring and Weaving Grant scheme provides free motorized sewing machines and direct supply contracts with garment buyers.",
          popular: false
        },
        {
          id: "stand-up-india",
          title: "Stand-Up India for Women Entrepreneurs",
          category: "Start a Business",
          secondaryTag: "Financial Support",
          amount: "₹10 Lakh to ₹1 Crore",
          highlights: [
            "Bank loans for greenfield manufacturing and services",
            "Repayment period up to 7 years with moratorium",
            "Dedicated mentorship from SIDBI and public sector banks"
          ],
          audioScript: "Stand-Up India facilitates bank loans between ten lakh and one crore rupees for women setting up greenfield enterprises.",
          popular: false
        },
        {
          id: "drone-didi",
          title: "Namo Drone Didi Scheme",
          category: "Skill Training",
          secondaryTag: "Start a Business",
          amount: "80% Equipment Subsidy",
          highlights: [
            "15-day certified agricultural drone pilot training",
            "Rent drone services to local farmers for fertilizer spraying",
            "Generate ₹15,000 to ₹25,000 additional monthly income"
          ],
          audioScript: "Namo Drone Didi trains rural women to become licensed agricultural drone pilots, generating steady seasonal rental income.",
          popular: true
        },
        {
          id: "mahila-samridhi",
          title: "Mahila Samridhi Micro-Credit",
          category: "Financial Support",
          secondaryTag: "Start a Business",
          amount: "Up to ₹1,40,000",
          highlights: [
            "Direct micro-financing for backward classes women",
            "Prompt repayment rebate of 4% interest subsidy",
            "Quick 72-hour doorstep digital approval"
          ],
          audioScript: "Mahila Samridhi offers quick micro-finance up to one lakh forty thousand rupees with interest rebates for prompt repayment.",
          popular: false
        }
      ],
      applyBtn: "Apply Now",
      voiceHelpBtn: "Voice Help"
    },
    help: {
      badge: "04. HELP / SAHAYATA KENDRA",
      heading: "How Can We Help You? / सहायता केंद्र",
      tapToSpeak: "Tap to Speak / बोलकर सहायता पाएं",
      subheading: "Accessible assistance in your language, via voice, WhatsApp, or local village Sahayikas.",
      faqsTitle: "Visual FAQs (Frequently Asked Questions)",
      faqs: [
        {
          q: "How to register without a smartphone or internet?",
          a: "You can visit your Gram Panchayat office or nearest Common Service Center (CSC). A certified Gram Sahayika will assist you in filling out the digital form using biometric Aadhaar authentication."
        },
        {
          q: "How to view your scheme eligibility?",
          a: "Click on 'Voice Help' or tap the microphone button above to speak in your native dialect. Alternatively, select any scheme card in the 'Schemes & Support' tab to view age, income, and category prerequisites."
        },
        {
          q: "How do I locate my block operator & Village Sahayika?",
          a: "Enter your 6-digit postal PIN code in our locator card, or call our toll-free rural helpline 1800-200-NARI. Your block coordinator will contact you within 24 hours."
        },
        {
          q: "Which documents are required to receive grant funds?",
          a: "Only three basic documents: (1) Aadhaar Card, (2) Bank Passbook (linked with Aadhaar for DBT), and (3) SHG membership ID or Gram Panchayat recommendation letter."
        },
        {
          q: "How can I track my submitted loan or grant application?",
          a: "You will receive SMS alerts at every stage. You can also enter your 10-digit application reference number in the portal or ask your Village Sahayika."
        }
      ],
      sahayikaCard: {
        title: "Talk to a Sahayika / Village Operator",
        name: "Smt. Pooja Devi",
        role: "Lead Village Sahayika & Gram Mitra",
        badge: "Verified CSC Operator",
        phoneLabel: "Phone Support",
        phoneNum: "1800-200-NARI (Toll Free)",
        waLabel: "WhatsApp Support",
        waNum: "+91 98765 43210 (24x7 Assistant)",
        locateLabel: "Find Nearest CSC Center",
        note: "Available Monday to Saturday, 9:00 AM - 6:00 PM in Hindi, Bengali & English"
      }
    },
    footer: {
      brandDesc: "NariSetu is a national digital public infrastructure initiative empowering rural women, nurturing artisan legacies, and building self-reliant rural economies.",
      columns: {
        quickLinks: "Quick Navigation",
        schemes: "Popular Schemes",
        contact: "Contact & Support"
      },
      copyright: "© 2026 NariSetu. All Rights Reserved. Supported by Digital India & Ministry of Rural Development.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      disclaimer: "Official Prototype Design Framework"
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      schemes: "योजनाएं और सहायता",
      help: "सहायता केंद्र",
      tagline: "कुशल नारी | सशक्त समुदाय | उज्ज्वल भविष्य",
      voiceBtn: "आवाज से खोजें",
      login: "लॉगिन / पंजीकरण",
      guestNotice: "अतिथि के रूप में ब्राउज़ कर रहे हैं। नारीसेतु में आपका स्वागत है!"
    },
    hero: {
      govBadge: "ग्रामीण विकास मंत्रालय एवं स्किल इंडिया पहल",
      title: "नारीसेतु",
      subTitle: "ग्रामीण महिलाओं को कौशल, अवसर और एक सशक्त भविष्य से जोड़ना",
      description: "ग्रामीण महिलाओं के कौशल विकास, स्वरोजगार की स्थापना और सरकारी वित्तीय योजनाओं का लाभ दिलाने के लिए एक समर्पित राष्ट्रीय मंच।",
      cards: [
        {
          id: "citizen",
          badge: "महिलाओं / नागरिकों के लिए",
          title: "महिलाएं और शिल्पकार",
          desc: "कौशल प्रशिक्षण, रोजगार के अवसर, स्वयं सहायता समूह (SHG) और सरकारी सहायता प्राप्त करें।",
          action: "शुरू करें",
          colorTheme: "pink"
        },
        {
          id: "partner",
          badge: "सामुदायिक सहयोग के लिए",
          title: "एनजीओ और संचालक",
          desc: "ग्राम ऑपरेटर, ट्रेनर, स्वयं सहायता समूह लीडर या व्यापार आयोजक के रूप में जुड़ें।",
          action: "पार्टनर लॉगिन",
          colorTheme: "blue"
        },
        {
          id: "gov",
          badge: "सरकारी अधिकारियों के लिए",
          title: "अधिकारी और ग्राम पंचायत",
          desc: "परिवारों का सर्वेक्षण करें, पंजीकरण करें, योजना लाभ वितरण और प्रगति की निगरानी करें।",
          action: "सरकारी लॉगिन",
          colorTheme: "green"
        }
      ],
      guestLink: "अतिथि के रूप में जारी रखें →"
    },
    features: [
      {
        icon: "graduation-cap",
        title: "कौशल विकास",
        desc: "अपनी स्थानीय भाषा में प्रमाणित मास्टर प्रशिक्षकों से नए हुनर सीखें।"
      },
      {
        icon: "briefcase",
        title: "रोजगार व व्यवसाय",
        desc: "बाजार से सीधा जुड़ाव, स्थानीय मेले, ई-कॉमर्स और व्यापारिक अनुदान।"
      },
      {
        icon: "users",
        title: "सामुदायिक सहायता",
        desc: "समान हुनर वाली महिलाओं और ग्राम सहायिकाओं के साथ मिलकर आगे बढ़ें।"
      },
      {
        icon: "landmark",
        title: "वित्तीय सहायता",
        desc: "सीधे बैंक खाते में अनुदान, बिना गारंटी के ऋण और सिलाई-बुनाई उपकरण।"
      },
      {
        icon: "trending-up",
        title: "प्रगति ट्रैकिंग",
        desc: "मासिक आय, प्रमाणपत्र और आत्मनिर्भरता की पारदर्शी प्रगति रिपोर्ट।"
      },
      {
        icon: "shield-check",
        title: "सुरक्षित और विश्वसनीय",
        desc: "भारत सरकार के आधार और डिजिटल इंडिया सुरक्षा मानकों द्वारा प्रमाणित।"
      }
    ],
    stats: [
      { number: "4,80,000+", label: "पंजीकृत ग्रामीण महिलाएं" },
      { number: "18,400+", label: "सक्रिय स्वयं सहायता समूह" },
      { number: "₹120+ करोड़", label: "वितरित वित्तीय अनुदान" },
      { number: "92%", label: "सफल आजीविका दर" }
    ],
    about: {
      badge: "02. हमारे बारे में",
      heading: "प्रौद्योगिकी के माध्यम से ग्रामीण भारतीय महिलाओं का सशक्तिकरण",
      description: "नारीसेतु ग्रामीण शिल्पकारों और राष्ट्रीय आर्थिक अवसरों के बीच की दूरी को मिटाता है। डिजिटल तकनीक और जमीनी सहयोग से हर महिला को आत्मनिर्भर बनाना हमारा ध्येय है।",
      cta: "हमारा उद्देश्य जानें",
      storyTitle: "हमारी कहानी और संकल्प",
      storyText: "एक राष्ट्रीय सेतु के रूप में निर्मित, नारीसेतु भारतीय ग्रामीण महिलाओं के पारंपरिक ज्ञान—हथकरघा बुनाई, हस्तशिल्प से लेकर आधुनिक कृषि तकनीक तक—को सम्मानित और बाजार से जोड़ता है।",
      pills: [
        "वित्तीय सहायता",
        "कौशल प्रशिक्षण",
        "व्यवसाय शुरू करें",
        "स्वयं सहायता समूह",
        "हथकरघा और शिल्प"
      ],
      stepsTitle: "नारीसेतु कैसे कार्य करता है (6-चरणीय प्रक्रिया)",
      stepsSubtitle: "घर-घर सर्वेक्षण से लेकर आत्मनिर्भर मासिक आय तक",
      steps: [
        { num: "01", title: "सर्वेक्षण", desc: "कौशल और पारिवारिक जरूरतों का घर-घर डिजिटल सर्वेक्षण।" },
        { num: "02", title: "पंजीकरण", desc: "आधार और सहायिका की मदद से 2 मिनट में सरल डिजिटल पहचान।" },
        { num: "03", title: "जुड़ें", desc: "गाँव के स्वयं सहायता समूह (SHG) और प्रशिक्षण बैच से जुड़ें।" },
        { num: "04", title: "सूचनाएं", desc: "अपनी भाषा में योजनाओं, अनुदान और कार्यशालाओं की वॉइस सूचना।" },
        { num: "05", title: "उत्पाद बिक्री", desc: "सीधे खरीदारों, सरकारी मेलों और ई-कॉमर्स बाजार से ऑर्डर।" },
        { num: "06", title: "प्रगति रिपोर्ट", desc: "मासिक आय, बैंक बचत और प्रमाणपत्रों की निरंतर ट्रैकिंग।" }
      ]
    },
    schemes: {
      badge: "03. योजनाएं और सहायता",
      heading: "सरकारी योजनाएं और वित्तीय सहायता खोजें",
      searchPlaceholder: "योजना का नाम या कौशल खोजें (जैसे: लखपति, सिलाई, ऋण, ड्रोन)...",
      categories: [
        "सभी योजनाएं",
        "वित्तीय सहायता",
        "कौशल प्रशिक्षण",
        "व्यवसाय शुरू करें",
        "हथकरघा और शिल्प"
      ],
      list: [
        {
          id: "lakhpati-didi",
          title: "लखपति दीदी योजना",
          category: "वित्तीय सहायता",
          secondaryTag: "कौशल प्रशिक्षण",
          amount: "₹5,00,000 तक का ऋण",
          highlights: [
            "SHG महिलाओं के लिए बिना गारंटी का आसान ऋण",
            "वित्तीय साक्षरता और सूक्ष्म उद्यम स्थापित करने का प्रशिक्षण",
            "प्रति वर्ष न्यूनतम ₹1 लाख की निरंतर आय का लक्ष्य"
          ],
          audioScript: "लखपति दीदी योजना स्वयं सहायता समूह की महिलाओं को पांच लाख रुपये तक का ब्याज मुक्त ऋण और सूक्ष्म उद्यम शुरू करने की सहायता देती है।",
          popular: true
        },
        {
          id: "pm-vishwakarma",
          title: "शिल्पकारों हेतु पीएम विश्वकर्मा",
          category: "हथकरघा और शिल्प",
          secondaryTag: "कौशल प्रशिक्षण",
          amount: "₹15,000 टूलकिट + 5% ऋण",
          highlights: [
            "₹15,000 मूल्य का मुफ्त आधुनिक टूलकिट प्रोत्साहन",
            "मात्र 5% ब्याज पर ₹3,00,000 तक का ऋण",
            "राष्ट्रीय स्तर का कौशल प्रमाणपत्र व विपणन सहायता"
          ],
          audioScript: "पीएम विश्वकर्मा योजना पारंपरिक शिल्पकारों को पंद्रह हजार रुपये का मुफ्त टूलकिट और रियायती ब्याज दर पर ऋण प्रदान करती है।",
          popular: true
        },
        {
          id: "tailoring-weaving",
          title: "सिलाई एवं बुनाई अनुदान योजना",
          category: "हथकरघा और शिल्प",
          secondaryTag: "वित्तीय सहायता",
          amount: "मुफ्त सिलाई मशीन",
          highlights: [
            "100% सब्सिडी वाली आधुनिक मोटरयुक्त सिलाई मशीन",
            "फैशन बुटीक और परिधान डिजाइनिंग का मास्टर प्रशिक्षण",
            "वस्त्र निर्माताओं से सीधे कपड़े सिलाई के थोक ऑर्डर"
          ],
          audioScript: "सिलाई एवं बुनाई अनुदान योजना में महिलाओं को मुफ्त मोटरयुक्त सिलाई मशीन और वस्त्र उद्योग से सीधे काम मिलता है।",
          popular: false
        },
        {
          id: "stand-up-india",
          title: "महिला उद्यमियों के लिए स्टैंड-अप इंडिया",
          category: "व्यवसाय शुरू करें",
          secondaryTag: "वित्तीय सहायता",
          amount: "₹10 लाख से ₹1 करोड़",
          highlights: [
            "विनिर्माण या सेवा क्षेत्र में नए व्यवसाय के लिए बैंक ऋण",
            "7 वर्ष तक की आसान किस्तों में पुनर्भुगतान सुविधा",
            "सिडबी (SIDBI) और बैंकों द्वारा विशेषज्ञ मार्गदर्शन"
          ],
          audioScript: "स्टैंड-अप इंडिया योजना महिला उद्यमियों को नया व्यवसाय शुरू करने के लिए दस लाख से एक करोड़ रुपये का बैंक ऋण देती है।",
          popular: false
        },
        {
          id: "drone-didi",
          title: "नमो ड्रोन दीदी योजना",
          category: "कौशल प्रशिक्षण",
          secondaryTag: "व्यवसाय शुरू करें",
          amount: "80% उपकरण सब्सिडी",
          highlights: [
            "15 दिवसीय प्रमाणित कृषि ड्रोन पायलट प्रशिक्षण",
            "किसानों के खेतों में दवा छिड़काव से आय का साधन",
            "प्रति माह ₹15,000 से ₹25,000 की अतिरिक्त कमाई"
          ],
          audioScript: "नमो ड्रोन दीदी योजना महिलाओं को ड्रोन पायलट का निःशुल्क प्रशिक्षण और गाँव में कृषि सेवा व्यवसाय शुरू करने में मदद करती है।",
          popular: true
        },
        {
          id: "mahila-samridhi",
          title: "महिला समृद्धि सूक्ष्म ऋण",
          category: "वित्तीय सहायता",
          secondaryTag: "व्यवसाय शुरू करें",
          amount: "₹1,40,000 तक",
          highlights: [
            "पिछड़े वर्ग की महिलाओं के लिए त्वरित माइक्रोफाइनेंस",
            "समय पर किश्त चुकाने पर 4% ब्याज की छूट",
            "72 घंटे में सीधे खाते में डिजिटल स्वीकृति"
          ],
          audioScript: "महिला समृद्धि योजना छोटे स्वरोजगार के लिए एक लाख चालीस हजार रुपये तक का तत्काल ऋण प्रदान करती है।",
          popular: false
        }
      ],
      applyBtn: "आवेदन करें",
      voiceHelpBtn: "बोलकर सुनें"
    },
    help: {
      badge: "04. सहायता केंद्र",
      heading: "हम आपकी किस प्रकार सहायता कर सकते हैं?",
      tapToSpeak: "बोलकर सहायता पाएं / Tap to Speak",
      subheading: "अपनी भाषा में बोलें, व्हाट्सएप पर संदेश भेजें या गाँव की सहायिका से सीधा संपर्क करें।",
      faqsTitle: "अक्सर पूछे जाने वाले सवाल (Visual FAQs)",
      faqs: [
        {
          q: "बिना स्मार्टफोन या इंटरनेट के पंजीकरण कैसे करें?",
          a: "आप अपने ग्राम पंचायत भवन या निकटतम सीएससी (CSC) केंद्र जा सकती हैं। वहां ग्राम सहायिका आपके आधार कार्ड की मदद से तुरंत पंजीकरण कर देंगी।"
        },
        {
          q: "अपनी योजना पात्रता कैसे देखें?",
          a: "ऊपर दिए गए 'बोलकर सहायता पाएं' बटन पर क्लिक करके अपनी भाषा में सवाल पूछें, या योजना कार्ड पर विवरण देखें।"
        },
        {
          q: "अपने ब्लॉक ऑपरेटर या ग्राम सहायिका का पता कैसे लगाएं?",
          a: "अपने क्षेत्र का 6-अंकों का पिनकोड दर्ज करें या हमारे निःशुल्क नंबर 1800-200-NARI पर कॉल करें।"
        },
        {
          q: "अनुदान और ऋण प्राप्त करने के लिए कौन से दस्तावेज चाहिए?",
          a: "केवल 3 मुख्य दस्तावेज: (1) आधार कार्ड, (2) बैंक पासबुक, और (3) स्वयं सहायता समूह (SHG) का विवरण।"
        },
        {
          q: "अपने आवेदन की स्थिति कैसे ट्रैक करें?",
          a: "आवेदन जमा करने पर आपको 10 अंकों का संदर्भ नंबर एसएमएस पर प्राप्त होगा, जिससे आप स्थिति जान सकती हैं।"
        }
      ],
      sahayikaCard: {
        title: "ग्राम सहायिका से बात करें",
        name: "श्रीमती पूजा देवी",
        role: "वरिष्ठ ग्राम मित्र व प्रमाणित सीएससी ऑपरेटर",
        badge: "प्रमाणित ग्राम मित्र",
        phoneLabel: "फोन हेल्पलाइन",
        phoneNum: "1800-200-NARI (टोल-फ्री)",
        waLabel: "व्हाट्सएप सहायता",
        waNum: "+91 98765 43210 (24x7 सेवा)",
        locateLabel: "निकटतम केंद्र खोजें",
        note: "सोमवार से शनिवार, सुबह 9:00 से शाम 6:00 बजे तक हिंदी, बांग्ला व अंग्रेजी में उपलब्ध"
      }
    },
    footer: {
      brandDesc: "नारीसेतु भारत की ग्रामीण महिलाओं के सशक्तिकरण, पारंपरिक शिल्प संरक्षण और आत्मनिर्भर ग्रामीण अर्थव्यवस्था का राष्ट्रीय मंच है।",
      columns: {
        quickLinks: "त्वरित नेविगेशन",
        schemes: "प्रमुख योजनाएं",
        contact: "संपर्क व सहायता"
      },
      copyright: "© 2026 नारीसेतु। सर्वाधिकार सुरक्षित। डिजिटल इंडिया एवं ग्रामीण विकास मंत्रालय द्वारा समर्थित।",
      privacy: "गोपनीयता नीति",
      terms: "नियम व शर्तें",
      disclaimer: "आधिकारिक प्रोटोटाइप फ्रेमवर्क"
    }
  },
  bn: {
    nav: {
      home: "হোম",
      about: "আমাদের কথা",
      schemes: "সরকারি স্কিম ও সহায়তা",
      help: "সহায়তা কেন্দ্র",
      tagline: "দক্ষ নারী | শক্তিশালী সমাজ | উজ্জ্বল ভবিষ্যৎ",
      voiceBtn: "ভয়েস সাহায্য",
      login: "লগইন / নিবন্ধন",
      guestNotice: "অতিথি হিসেবে ব্রাউজ করছেন। নারীসেতুতে স্বাগতম!"
    },
    hero: {
      govBadge: "গ্রামোন্নয়ন মন্ত্রক ও স্কিল ইন্ডিয়া উদ্যোগ",
      title: "নারীসেতু",
      subTitle: "গ্রামীণ মহিলাদের দক্ষতা, সুযোগ এবং স্বনির্ভর আগামীর মেলবন্ধন",
      description: "গ্রামীণ মহিলাদের কর্মদক্ষতা বৃদ্ধি, নিজস্ব ব্যবসা গড়ে তোলা এবং সরকারি অনুদান পাওয়ার এক বিশ্বস্ত জাতীয় ডিজিটাল প্ল্যাটফর্ম।",
      cards: [
        {
          id: "citizen",
          badge: "মহিলা ও কারিগরদের জন্য",
          title: "মহিলা ও নাগরিক",
          desc: "দক্ষতা প্রশিক্ষণ, কর্মসংস্থান, স্বনির্ভর দল (SHG) এবং সরকারি আর্থিক সহায়তা পান।",
          action: "শুরু করুন",
          colorTheme: "pink"
        },
        {
          id: "partner",
          badge: "কমিউনিটি সহায়তার জন্য",
          title: "এনজিও ও অপারেটর",
          desc: "গ্রাম অপারেটর, প্রশিক্ষক, স্বনির্ভর গোষ্ঠীর দলনেত্রী বা ব্যবসায়িক অংশীদার হিসেবে যুক্ত হন।",
          action: "পার্টনার লগইন",
          colorTheme: "blue"
        },
        {
          id: "gov",
          badge: "সরকারি আধিকারিকদের জন্য",
          title: "আধিকারিক ও গ্রাম পঞ্চায়েত",
          desc: "সার্ভে পরিচালনা, সুবিধাভোগী নিবন্ধন, অনুদান পর্যবেক্ষণ এবং অগ্রগতি ট্র্যাকিং।",
          action: "সরকারি লগইন",
          colorTheme: "green"
        }
      ],
      guestLink: "অতিথি হিসেবে এগিয়ে যান →"
    },
    features: [
      {
        icon: "graduation-cap",
        title: "দক্ষতা বৃদ্ধি",
        desc: "স্থানীয় ভাষায় অভিজ্ঞ মাস্টার ট্রেনারদের কাছ থেকে আধুনিক কাজের প্রশিক্ষণ।"
      },
      {
        icon: "briefcase",
        title: "কর্মসংস্থান ও ব্যবসা",
        desc: "সরাসরি ক্রেতা সংযোগ, মেলা, ই-কমার্স এবং ব্যবসা শুরুর মূলধন।"
      },
      {
        icon: "users",
        title: "কমিউনিটি সহায়তা",
        desc: "স্বনির্ভর গোষ্ঠী এবং গ্রাম সহায়িকাদের সঙ্গে পারস্পরিক সহযোগিতা।"
      },
      {
        icon: "landmark",
        title: "আর্থিক সহায়তা",
        desc: "সরাসরি ব্যাংক অ্যাকাউন্টে অনুদান, জামানতহীন ঋণ এবং তাঁত-সেলাই মেশিন।"
      },
      {
        icon: "trending-up",
        title: "অগ্রগতি পর্যবেক্ষণ",
        desc: "মাসিক আয় বৃদ্ধি ও সার্টিফিকেটের স্বচ্ছ ও বিশ্বাসযোগ্য তথ্য।"
      },
      {
        icon: "shield-check",
        title: "নিরাপদ ও সরকারি স্বীকৃত",
        desc: "ভারত সরকারের আধার ও ডিজিটাল ইন্ডিয়ার উচ্চ নিরাপত্তায় সুরক্ষিত।"
      }
    ],
    stats: [
      { number: "৪,৮০,০০০+", label: "নিবন্ধিত গ্রামীণ নারী" },
      { number: "১৮,৪০০+", label: "সক্রিয় স্বনির্ভর দল" },
      { number: "₹১২০+ কোটি", label: "वितরিত আর্থিক অনুদান" },
      { number: "৯২%", label: "স্বাবলম্বী জীবিকা হার" }
    ],
    about: {
      badge: "০২. আমাদের কথা",
      heading: "প্রযুক্তির হাত ধরে গ্রামীণ ভারতীয় নারীর ক্ষমতায়ন",
      description: "নারীসেতু গ্রামীণ শিল্পীদের দক্ষতার সাথে মূল ধারার বাজারের দূরত্ব ঘুচিয়ে দেয়। ডিজিটাল প্রযুক্তি এবং তৃণমূল স্তরের একতায় প্রতিটি নারীকে অর্থনৈতিকভাবে স্বাধীন করাই আমাদের লক্ষ্য।",
      cta: "আমাদের লক্ষ্য জানুন",
      storyTitle: "আমাদের গল্প ও দর্শন",
      storyText: "একটি জাতীয় সেতুবন্ধন হিসেবে তৈরি, নারীসেতু ভারতীয় গ্রামীণ নারীদের ঐতিহ্যবাহী বুনন, হস্তশিল্প ও আধুনিক কৃষি দক্ষতাকে সম্মানের সঙ্গে বাজারের সাথে যুক্ত করে।",
      pills: [
        "আর্থিক সহায়তা",
        "দক্ষতা প্রশিক্ষণ",
        "ব্যবসা শুরু করুন",
        "স্বনির্ভর গোষ্ঠী (SHG)",
        "তাঁত ও হস্তশিল্প"
      ],
      stepsTitle: "নারীসেতু কীভাবে কাজ করে (৬-ধাপের প্রক্রিয়া)",
      stepsSubtitle: "ঘরে ঘরে সার্ভে থেকে শুরু করে স্থায়ী মাসিক উপার্জন পর্যন্ত",
      steps: [
        { num: "০১", title: "সার্ভে", desc: "দক্ষতা ও পরিবারের চাহিদার ডিজিটাল সমীক্ষা।" },
        { num: "০২", title: "নিবন্ধন", desc: "আধার কার্ড ও সহায়িকার সাহায্যে সহজ ডিজিটাল আইডি তৈরি।" },
        { num: "০৩", title: "যুক্ত হন", desc: "গ্রামের স্বনির্ভর গোষ্ঠী এবং প্রশিক্ষণ ব্যাচে যুক্ত হওয়া।" },
        { num: "০৪", title: "তথ্য পান", desc: "স্থানীয় ভাষায় নতুন সরকারি স্কিম ও ভাতার ভয়েস মেসেজ।" },
        { num: "০৫", title: "উৎপাদন ও বিক্রি", desc: "সরাসরি পাইকারি ক্রেতা ও হস্তশিল্প মেলায় বিক্রি।" },
        { num: "০৬", title: "রিপোর্ট", desc: "নিয়মিত আয় বৃদ্ধি ও ব্যাংক রেকর্ডের স্বচ্ছ পর্যবেক্ষণ।" }
      ]
    },
    schemes: {
      badge: "০৩. সরকারি স্কিম ও সহায়তা",
      heading: "সরকারি স্কিম ও আর্থিক সহায়তা অনুসন্ধান করুন",
      searchPlaceholder: "স্কিমের নাম বা কাজের ধরন খুঁজুন (যেমন: লাখপতি, তাঁত, সেলাই, লোন)...",
      categories: [
        "সকল স্কিম",
        "আর্থিক সহায়তা",
        "দক্ষতা প্রশিক্ষণ",
        "ব্যবসা শুরু করুন",
        "তাঁত ও হস্তশিল্প"
      ],
      list: [
        {
          id: "lakhpati-didi",
          title: "লাখপতি দিদি যোজনা",
          category: "আর্থিক সহায়তা",
          secondaryTag: "দক্ষতা প্রশিক্ষণ",
          amount: "₹৫,০০,০০০ পর্যন্ত ঋণ",
          highlights: [
            "SHG মহিলাদের জন্য জামানতবিহীন সহজ ঋণ",
            "আর্থিক সাক্ষরতা ও ব্যবসা পরিচালনার নিবিড় প্রশিক্ষণ",
            "বছরে কমপক্ষে ১ লক্ষ টাকা নিশ্চিত আয়ের লক্ষ্য"
          ],
          audioScript: "লাখপতি দিদি যোজনা স্বনির্ভর দলের মহিলাদের ব্যবসা শুরু করতে ৫ লক্ষ টাকা পর্যন্ত সহজ ঋণ প্রদান করে।",
          popular: true
        },
        {
          id: "pm-vishwakarma",
          title: "কারিগরদের জন্য পিএম বিশ্বকর্মা",
          category: "তাঁত ও হস্তশিল্প",
          secondaryTag: "দক্ষতা প্রশিক্ষণ",
          amount: "₹১৫,০০০ টুলকিট + ৫% লোন",
          highlights: [
            "১৫,০০০ টাকা মূল্যের বিনামূল্যে আধুনিক টুলকিট গ্রান্ট",
            "মাত্র ৫% সুদে ৩ লক্ষ টাকা পর্যন্ত সহজ ঋণ সুবিধা",
            "জাতীয় স্তরের প্রশংসাপত্র ও বিক্রির সরাসরি সুযোগ"
          ],
          audioScript: "পিএম বিশ্বকর্মা প্রকল্পে গ্রামীণ কারিগরদের নিখরচায় আধুনিক যন্ত্রপাতি এবং কম সুদে ঋণ দেওয়া হয়।",
          popular: true
        },
        {
          id: "tailoring-weaving",
          title: "দর্জি ও তাঁত অনুদান প্রকল্প",
          category: "তাঁত ও হস্তশিল্প",
          secondaryTag: "আর্থিক সহায়তা",
          amount: "বিনামূল্যে মোটর সেলাই মেশিন",
          highlights: [
            "১০০% সরকারি ভরতুকিতে উন্নত মোটর চালিত সেলাই মেশিন",
            "বুটিক ও পোশাক নকশার উন্নত প্রশিক্ষণ কর্মশালা",
            "গার্মেন্টস রপ্তানিকারকদের সাথে সরাসরি কাজের চুক্তি"
          ],
          audioScript: "দর্জি ও তাঁত অনুদান প্রকল্পের মাধ্যমে সম্পূর্ণ বিনামূল্যে মোটর চালিত সেলাই মেশিন ও কাজের অর্ডার পাওয়া যায়।",
          popular: false
        },
        {
          id: "stand-up-india",
          title: "মহিলা উদ্যোক্তাদের জন্য স্ট্যান্ড-আপ ইন্ডিয়া",
          category: "ব্যবসা শুরু করুন",
          secondaryTag: "আর্থিক সহায়তা",
          amount: "₹১০ লক্ষ থেকে ₹১ কোটি",
          highlights: [
            "নতুন শিল্প বা সেবা প্রকল্প গড়ে তুলতে সরকারি ব্যাংক লোন",
            "৭ বছর পর্যন্ত সহজ কিস্তিতে পরিশোধের সুযোগ",
            "সিডবি ও ব্যাংকের পক্ষ থেকে বিশেষ পরামর্শ সহায়তা"
          ],
          audioScript: "স্ট্যান্ড-আপ ইন্ডিয়া নতুন উদ্যোগ শুরু করতে ১০ লক্ষ থেকে ১ কোটি টাকার ব্যাংক ঋণ সুবিধা দেয়।",
          popular: false
        },
        {
          id: "drone-didi",
          title: "নমো ড্রোন দিদি স্কিম",
          category: "দক্ষতা প্রশিক্ষণ",
          secondaryTag: "ব্যবসা শুরু করুন",
          amount: "৮০% যন্ত্রপাতি সাবসিডি",
          highlights: [
            "১৫ দিনের সার্টিফাইড কৃষি ড্রোন চালনা প্রশিক্ষণ",
            "জমিতে কীটনাশক ও সার ছিটানোর মাধ্যমে নতুন জীবিকা",
            "মাসে ১৫,০০০ থেকে ২৫,০০০ টাকা পর্যন্ত বাড়তি রোজগার"
          ],
          audioScript: "নমো ড্রোন দিদি প্রকল্পে মহিলারা কৃষি ড্রোন পাইলট হিসেবে প্রশিক্ষণ নিয়ে স্বনির্ভর হতে পারেন।",
          popular: true
        },
        {
          id: "mahila-samridhi",
          title: "মহিলা সমৃদ্ধি ক্ষুদ্র ঋণ",
          category: "আর্থিক সহায়তা",
          secondaryTag: "ব্যবসা শুরু করুন",
          amount: "₹১,৪০,০০০ পর্যন্ত",
          highlights: [
            "অনগ্রসর শ্রেণির মহিলাদের জন্য সহজ মাইক্রো-ফাইন্যান্স",
            "সময়মতো কিস্তি জমা দিলে ৪% সুদের বিশেষ ছাড়",
            "৭২ ঘণ্টায় সরাসরি অ্যাকাউন্টে ডিজিটাল মঞ্জুরি"
          ],
          audioScript: "মহিলা সমৃদ্ধি প্রকল্পের অধীনে ক্ষুদ্র ব্যবসার জন্য ১ লক্ষ ৪০ হাজার টাকা পর্যন্ত সরাসরি ঋণ পাওয়া যায়।",
          popular: false
        }
      ],
      applyBtn: "আবেদন করুন",
      voiceHelpBtn: "ভয়েস শুনুন"
    },
    help: {
      badge: "০৪. সহায়তা কেন্দ্র",
      heading: "আমরা আপনাকে কীভাবে সাহায্য করতে পারি?",
      tapToSpeak: "কথা বলে সাহায্য নিন / Tap to Speak",
      subheading: "আপনার নিজের ভাষায় কথা বলুন, হোয়াটসঅ্যাপে বার্তা পাঠান অথবা সরাসরি গ্রাম সহায়িকার সাথে যোগাযোগ করুন।",
      faqsTitle: "সহজ ভিজ্যুয়াল প্রশ্নোত্তর (Visual FAQs)",
      faqs: [
        {
          q: "স্মার্টফোন বা ইন্টারনেট না থাকলে কীভাবে নাম নথিভুক্ত করবেন?",
          a: "আপনি নিকটবর্তী গ্রাম পঞ্চায়েত অফিস বা সিএসসি (CSC) সেন্টারে যোগাযোগ করুন। সেখানে গ্রাম সহায়িকা আপনার আধার কার্ড দেখে বিনামূল্যে ফর্ম পূরণ করে দেবেন।"
        },
        {
          q: "আমার কোন প্রকল্পে যোগ্যতা আছে তা কীভাবে জানব?",
          a: "উপরে 'কথা বলে সাহায্য নিন' বোতামটি টিপে মুখে আপনার কাজের কথা বলুন, অথবা 'সরকারি স্কিম' ট্যাবে যে কোনো কার্ডে ক্লিক করে শর্তাবলি দেখে নিন।"
        },
        {
          q: "নিকটবর্তী ব্লক অপারেটর বা গ্রাম সহায়িকাকে কোথায় পাব?",
          a: "আপনার এলাকার ৬-সংখ্যার পিনকোড প্রদান করুন অথবা টোল-ফ্রি নম্বর ১৮০০-২০০-NARI তে কল করুন।"
        },
        {
          q: "টাকা বা অনুদান পেতে কী কী কাগজ জমা দিতে হবে?",
          a: "মাত্র ৩টি প্রয়োজনীয় কাগজ: (১) আধার কার্ড, (২) আধার লিঙ্কযুক্ত ব্যাংক পাসবই, এবং (৩) স্বনির্ভর দলের (SHG) সদস্যতার প্রমাণ।"
        },
        {
          q: "জমা দেওয়া আবেদনের স্ট্যাটাস কীভাবে জানব?",
          a: "আবেদন জমা দিলে মোবাইলে ১০-সংখ্যার ট্র্যাকিং নম্বর আসবে। সেটি পোর্টালে দিয়ে অথবা স্থানীয় সহায়িকাকে জিজ্ঞাসা করে স্ট্যাটাস দেখতে পারবেন।"
        }
      ],
      sahayikaCard: {
        title: "গ্রাম সহায়িকার সাথে কথা বলুন",
        name: "শ্রীমতী পূজা দেবী",
        role: "সিনিয়র গ্রাম মিত্র ও অনুমোদিত সিএসসি অপারেটর",
        badge: "সরকারি স্বীকৃত গ্রাম সহায়িকা",
        phoneLabel: "ফোন হেল্পলাইন",
        phoneNum: "1800-200-NARI (টোল-ফ্রি)",
        waLabel: "হোয়াটসঅ্যাপ সাপোর্ট",
        waNum: "+91 98765 43210 (২৪x৭ চ্যাটবট)",
        locateLabel: "নিকটতম সিএসসি সেন্টার খুঁজুন",
        note: "সোম থেকে শনিবার, সকাল ৯টা - সন্ধ্যা ৬টা পর্যন্ত বাংলা, হিন্দি ও ইংরেজিতে উপলব্ধ"
      }
    },
    footer: {
      brandDesc: "নারীসেতু ভারতের গ্রামীণ মহিলাদের অর্থনৈতিক স্বাবলম্বিতা, ঐতিহ্যবাহী লোকশিল্প সংরক্ষণ এবং গ্রামীণ সমৃদ্ধি বৃদ্ধির এক নির্ভরযোগ্য জাতীয় প্ল্যাটফর্ম।",
      columns: {
        quickLinks: "গুরুত্বপূর্ণ লিংক",
        schemes: "জনপ্রিয় স্কিমসমূহ",
        contact: "যোগাযোগ ও তথ্য"
      },
      copyright: "© ২০২৬ নারীসেতু। সর্বস্বত্ব সংরক্ষিত। ডিজিটাল ইন্ডিয়া ও ভারত সরকারের গ্রামোন্নয়ন মন্ত্রক কর্তৃক স্বীকৃত।",
      privacy: "গোপনীয়তা নীতি",
      terms: "নিয়ম ও শর্তাবলী",
      disclaimer: "অফিসিয়াল ফ্রেমওয়ার্ক ডিজাইন প্রোটোটাইপ"
    }
  }
};
