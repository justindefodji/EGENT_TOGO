export const products = [
  {
    id: 1,
    slug: 'armoire-billy',
    name: 'Armoire Billy',
    price: '500 000 FCFA',
    category: 'Anti-délestage',
    shortDescription: 'Solution anti délestage performante pour éviter les coupures de courant.',
    description: `L'Armoire Billy est une solution anti-délestage innovante et performante conçue pour protéger votre foyer ou votre entreprise contre les coupures de courant. Elle remplace efficacement les groupes électrogènes traditionnels avec zéro émission polluante.`,
    longDescription: `
    <h3>Caractéristiques principales:</h3>
    <ul>
      <li>Technologie anti-délestage avancée</li>
      <li>Zéro émission polluante</li>
      <li>Installation simple et rapide</li>
      <li>Compatible avec les systèmes solaires</li>
      <li>Garantie 2 ans</li>
      <li>Support technique 24/7</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Prévient les coupures de courant imprévisibles</li>
      <li>Réduit les dommages aux appareils électriques</li>
      <li>Silencieuse et respectueuse de l'environnement</li>
      <li>Durée de vie prolongée: 10+ ans</li>
      <li>Maintenance minimale requise</li>
    </ul>
    `,
    images: [
      new URL('../assets/images/armoireBilly_monté.jpg', import.meta.url).href,
      new URL('../assets/images/armoireBilly_monté.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href
    ],
    mainImage: new URL('../assets/images/armoireBilly_monté.jpg', import.meta.url).href,
    specs: [
      { label: 'Puissance', value: '500W - 5000W' },
      { label: 'Tension', value: '220V/50Hz' },
      { label: 'Dimensions', value: '60cm x 40cm x 30cm' },
      { label: 'Poids', value: '25kg' },
      { label: 'Garantie', value: '2 ans' }
    ]
  },
  {
    id: 2,
    slug: 'lampadaires-egent-solar',
    name: 'Lampadaires EGENT SOLAR',
    price: '200 000 FCFA',
    category: 'Énergie Solaire',
    shortDescription: 'Lampadaires solaires autonomes et écologiques pour illuminer vos espaces extérieurs.',
    description: `Les Lampadaires EGENT SOLAR sont des solutions d'éclairage solaire autonomes, écologiques et économiques. Parfaits pour illuminer vos routes, places publiques, jardins et espaces extérieurs sans aucun coût d'électricité.`,
    longDescription: `
    <h3>Caractéristiques principales:</h3>
    <ul>
      <li>Panneaux solaires intégrés haute efficacité</li>
      <li>Batterie lithium longue durée</li>
      <li>LED haute luminosité (3000-5000 lumens)</li>
      <li>Détecteur de mouvement optionnel</li>
      <li>Installation au sol ou sur poteau</li>
      <li>Étanche IP65</li>
      <li>Garantie 3 ans</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Zéro frais d'électricité</li>
      <li>Autonomie complète - fonctionne 24h/24</li>
      <li>Respectueux de l'environnement</li>
      <li>Installation simple sans câblage</li>
      <li>Durée de vie batterie: 5-7 ans</li>
      <li>Maintenance minimale</li>
    </ul>
    `,
    images: [
      new URL('../assets/images/lampendaire_monté.jpg', import.meta.url).href,
      new URL('../assets/images/lampandaire_monté2.jpg', import.meta.url).href,
      new URL('../assets/images/lampandaire_monté3.jpg', import.meta.url).href
    ],
    mainImage: new URL('../assets/images/lampendaire_monté.jpg', import.meta.url).href,
    specs: [
      { label: 'Puissance solaire', value: '10W - 50W' },
      { label: 'Batterie', value: 'Lithium 5000mAh' },
      { label: 'Luminosité', value: '3000-5000 lumens' },
      { label: 'Hauteur', value: '2m à 4m (configurable)' },
      { label: 'Autonomie', value: '12+ heures nuit' },
      { label: 'Garantie', value: '3 ans' }
    ]
  },
  {
    id: 3,
    slug: 'kit-zoklin',
    name: 'Kit Zoklin',
    price: '750 000 FCFA',
    category: 'Kits Solaires',
    shortDescription: 'Kit solaire préconçu et complet pour une installation rapide et facile.',
    description: `Le Kit Zoklin est un système solaire photovoltaïque préconçu et complet, parfait pour débuter votre transition énergétique en toute confiance. Installation rapide, performance garantie.`,
    longDescription: `
    <h3>Composition du Kit:</h3>
    <ul>
      <li>Panneaux solaires monocristallins 3kW</li>
      <li>Onduleur hybride intelligent</li>
      <li>Batteries lithium 5kWh</li>
      <li>Support de montage structure</li>
      <li>Câbles et connecteurs de qualité</li>
      <li>Système de monitoring cloud</li>
      <li>Installation et mise en service</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Économies d'électricité jusqu'à 80%</li>
      <li>Autonomie énergétique partielle ou complète</li>
      <li>Installation en 2-3 jours</li>
      <li>Monitoring en temps réel via app mobile</li>
      <li>Durée de vie: 25+ ans pour panneaux</li>
      <li>Expansion facile du système</li>
      <li>Garantie produit et installation 5 ans</li>
    </ul>
    `,
    images: [
      new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href,
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href
    ],
    mainImage: new URL('../assets/images/montage_panneau2.jpg', import.meta.url).href,
    specs: [
      { label: 'Puissance panneaux', value: '3kW' },
      { label: 'Capacité batterie', value: '5kWh lithium' },
      { label: 'Onduleur', value: 'Hybride 5kVA' },
      { label: 'Production journalière', value: '12-15 kWh (moyenne)' },
      { label: 'Autonomie', value: '2-3 jours' },
      { label: 'Garantie', value: '5 ans' }
    ]
  },
  {
    id: 4,
    slug: 'free-water',
    name: 'Free Water',
    price: '350 000 FCFA',
    category: 'Systèmes d\'eau',
    shortDescription: 'Solution innovante de purification d\'eau solaire autonome et écologique.',
    description: `Free Water est une solution révolutionnaire de purification d'eau alimentée par l'énergie solaire. Un système autonome et écologique qui fournit de l'eau potable sans coûts énergétiques pour vos communautés.`,
    longDescription: `
    <h3>Caractéristiques principales:</h3>
    <ul>
      <li>Technologie de purification multi-étages avancée</li>
      <li>Alimentation solaire complète</li>
      <li>Batterie de stockage intégrée</li>
      <li>Capacité: 100-500 litres/jour selon modèle</li>
      <li>Filtre ultra-performant éliminant 99,9% des contaminants</li>
      <li>Interface utilisateur intuitive</li>
      <li>Garantie 3 ans</li>
    </ul>
    
    <h3>Avantages:</h3>
    <ul>
      <li>Eau potable de qualité garantie</li>
      <li>Zéro coûts d'exploitation énergétique</li>
      <li>Solution autonome et indépendante du réseau</li>
      <li>Parfait pour zones isolées et communautés</li>
      <li>Installation simple et rapide</li>
      <li>Maintenance facile - filtres remplaçables</li>
      <li>Impact environnemental minimal</li>
    </ul>
    `,
    images: [
      new URL('../assets/images/montage_panneau.jpg', import.meta.url).href,
      new URL('../assets/images/panneau_montés.jpg', import.meta.url).href,
      new URL('../assets/images/freewater.jpeg', import.meta.url).href
    ],
    mainImage: new URL('../assets/images/freewater.jpeg', import.meta.url).href,
    specs: [
      { label: 'Capacité', value: '100-500 L/jour' },
      { label: 'Puissance solaire', value: '1000W' },
      { label: 'Batterie', value: 'Lithium 2kWh' },
      { label: 'Purification', value: 'Multi-étages (99.9%)' },
      { label: 'Durée de vie filtre', value: '12 mois' },
      { label: 'Garantie', value: '3 ans' }
    ]
  }
]

export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug)
}

export const getProductById = (id) => {
  return products.find(product => product.id === id)
}
