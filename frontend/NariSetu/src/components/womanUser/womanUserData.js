export const defaultWomanProfile = {
  id: "NARI-WB-2024-8841",
  name: "Aparna Ghosh",
  age: "29 Years",
  ageNumber: 29,
  maritalStatus: "Married",
  familyCondition: "Low Income (BPL Card Holder)",
  education: "Secondary (Class 10 Pass, Madhyamik)",
  children: "2 (1 Son, 1 Daughter)",
  familyMembers: "5 Members in Household",
  income: "₹6,500 – ₹8,000 / month",
  state: "West Bengal",
  district: "Nadia",
  block: "Hanskhali",
  panchayat: "Betna Gram Panchayat",
  village: "Gobindapur (Post: Betna, PIN: 741502)",
  avatarUrl: "/images/aparna_ghosh.jpg",
  completeness: 85,
  isVerified: true,
  communitiesCount: 2,
  communitiesNames: "Hanskhali SHG & Nadia Crafts",
  verifiedBy: "NariSetu Rural Artisan Guild & Livelihood Council",
  
  verifiedSkills: [
    "Tailoring",
    "Embroidery (Kantha Stitch)",
    "Handicrafts & Jute Work"
  ],
  
  interestFields: [
    "Organic Vegetable Dyeing",
    "E-Commerce Selling & Online Cataloguing",
    "Self Help Group (SHG) Leadership"
  ],
  
  descriptionOfSkill:
    "Specialized in traditional Bengali Kantha embroidery, garment stitching, and patch artwork with over 7 years of hands-on experience. Proficient in tailoring traditional blouses, kurtas, dupattas, and handcrafted cotton quilt cushions for local melas, cooperative exhibitions, and state rural haats.",
  
  achievements: [
    {
      id: "ach-1",
      icon: "trophy",
      title: "Best Artisan Award (Runner Up)",
      detail: "Nadia District Rural Handicraft Fair 2023."
    },
    {
      id: "ach-2",
      icon: "certificate",
      title: "Certified Master Tailor",
      detail: "West Bengal State Rural Livelihoods Mission (Anandadhara)."
    },
    {
      id: "ach-3",
      icon: "users",
      title: "Peer Trainer",
      detail: "Trained 18 rural women in Hanskhali village in hand-embroidery and Kantha stitching techniques."
    }
  ]
};

export const defaultCommunities = [
  {
    id: "tailoring-embroidery",
    name: "Tailoring and embroidery",
    category: "apparel",
    membersCount: 12,
    activeArtisansCount: 12,
    cluster: "SHG Cluster Nadia",
    block: "Hanskhali Block",
    operatorName: "Rekha Mondal",
    operatorBadge: "Run by operator",
    lastMessageSnippet: "Operator: Skill-upgrade workshop...",
    joined: true,
    accentColor: "orange",
    icon: "scissors",
    messages: [
      {
        id: "msg-1",
        dateGroup: "Yesterday",
        senderType: "operator",
        senderName: "Rekha Mondal",
        senderInitials: "RM",
        time: "4:30 PM",
        type: "notice",
        noticeTitle: "Training Workshop Notice",
        content: "Skill-upgrade workshop on 5 November at the community block center. All members are encouraged to attend. Conveyance allowance provided."
      },
      {
        id: "msg-2",
        dateGroup: "Today • 24 October 2024",
        senderType: "operator",
        senderName: "Rekha Mondal",
        senderInitials: "RM",
        time: "9:45 AM",
        type: "opportunity",
        opportunity: {
          id: "NARI-704",
          badge: "VERIFIED LIVELIHOOD OPPORTUNITY",
          title: "Bulk uniform order opportunity",
          description: "Requirement: 350 sets of cotton shirts and salwar sets for Nadia block primary schools. High quality stitching required. Pattern stencils and pre-cut fabrics distributed at Hanskhali center.",
          payout: "₹4,200 / artisan",
          cutoff: "25 Oct 2024",
          deliveryHub: "Hanskhali Cluster",
          remainingSlots: "Last 4 slot allotments remaining",
          actionText: "Apply for Order"
        }
      },
      {
        id: "msg-3",
        dateGroup: "Today • 24 October 2024",
        senderType: "member",
        senderName: "Sunita Das",
        senderInitials: "SD",
        senderColor: "bg-teal-600",
        time: "10:14 AM",
        type: "text",
        content: "Didi, will the cloth fabric be distributed at the block center or directly at our SHG center in Hanskhali?"
      },
      {
        id: "msg-4",
        dateGroup: "Today • 24 October 2024",
        senderType: "member",
        senderName: "Ruma Paul",
        senderInitials: "RP",
        senderColor: "bg-purple-600",
        time: "10:18 AM",
        type: "text",
        content: "I have two pedal machines ready at my workshop. I can take up 40 sets of uniforms this week!"
      },
      {
        id: "msg-5",
        dateGroup: "Today • 24 October 2024",
        senderType: "user",
        senderName: "You (Aparna)",
        senderAvatar: "/images/aparna_ghosh.jpg",
        time: "10:22 AM",
        type: "text",
        content: "Namaste Didi, I have completed the sample Kantha collar pieces. I will bring them to tomorrow's meeting for quality sign-off.",
        status: "Delivered ✓"
      }
    ]
  },
  {
    id: "weaving-textiles",
    name: "Weaving and textiles",
    category: "handloom",
    membersCount: 8,
    activeArtisansCount: 8,
    cluster: "Santipur Handloom Belt",
    block: "Ranaghat / Nadia",
    operatorName: "Dipali Basak",
    operatorBadge: "Run by operator",
    lastMessageSnippet: "Ruma: Loom tension adjusted for...",
    joined: true,
    accentColor: "amber",
    icon: "layers",
    messages: [
      {
        id: "msg-w1",
        dateGroup: "Yesterday",
        senderType: "operator",
        senderName: "Dipali Basak",
        senderInitials: "DB",
        time: "11:20 AM",
        type: "notice",
        noticeTitle: "Cotton Yarn Subsidized Allocation",
        content: "New batch of 80s count organic cotton warp and weft hanks arrived at Santipur cooperative society. Subsidized rates for all registered Anandadhara weavers."
      },
      {
        id: "msg-w2",
        dateGroup: "Today • 24 October 2024",
        senderType: "member",
        senderName: "Ruma Paul",
        senderInitials: "RP",
        senderColor: "bg-purple-600",
        time: "9:12 AM",
        type: "text",
        content: "Loom tension adjusted for the new jacquard border order. Sampling 2 traditional sarees today."
      }
    ]
  }
];

export const recommendedCommunities = [
  {
    id: "food-processing",
    name: "Food processing",
    category: "agro",
    membersCount: 20,
    subtitle: "Fruit jams, pickles and spice grinding cluster",
    matchReason: "Matches your profile",
    icon: "jar",
    requested: false
  },
  {
    id: "handicrafts-artisan",
    name: "Handicrafts & artisan work",
    category: "crafts",
    membersCount: 15,
    subtitle: "Jute bags, bamboo crafts and home decor",
    matchReason: "Matches your profile",
    icon: "bag",
    requested: false
  },
  {
    id: "agri-allied",
    name: "Agri-allied work",
    category: "farming",
    membersCount: 18,
    subtitle: "Dairy, backyard poultry & vermicompost",
    matchReason: "Matches your profile",
    icon: "sprout",
    requested: false
  }
];
