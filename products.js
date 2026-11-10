const PRODUCTS_DATA = [
  // 1. Трубы
  {
    id: 1,
    name: "Труба круглая нержавеющая матовая DIN 11850",
    sku: "MI-PIP-304-051",
    category: "pipes",
    categoryName: "Трубы нержавеющие",
    steel: "AISI 304",
    dn: "51.0 x 1.5 мм (хлыст 6м)",
    standard: "DIN 11850 / EN 10217-7",
    pressure: "PN 16 бар",
    price: 1150,
    inStock: true,
    stockQty: 480,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Труба профильная нержавеющая зеркальная 40х40",
    sku: "MI-PIP-PRF-304",
    category: "pipes",
    categoryName: "Трубы нержавеющие",
    steel: "AISI 304",
    dn: "40 x 40 x 2.0 мм",
    standard: "ГОСТ 8639-82",
    pressure: "Конструкционная",
    price: 1420,
    inStock: true,
    stockQty: 290,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80"
  },
  
  // 2. Листы
  {
    id: 3,
    name: "Лист нержавеющий матовый 2B 1.5х1250х2500",
    sku: "MI-SHT-304-15",
    category: "sheets",
    categoryName: "Листы нержавеющие",
    steel: "AISI 304",
    dn: "1.5 мм (раскрой 1.25х2.5м)",
    standard: "ГОСТ 5582-75 / EN 10088-2",
    pressure: "Холоднокатаный",
    price: 9400,
    inStock: true,
    stockQty: 85,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Лист нержавеющий рифленый (Чечевица) 3.0 мм",
    sku: "MI-SHT-RIF-304",
    category: "sheets",
    categoryName: "Листы нержавеющие",
    steel: "AISI 304",
    dn: "3.0 мм (раскрой 1.0х2.0м)",
    standard: "ГОСТ 8568-77",
    pressure: "Горячекатаный",
    price: 16800,
    inStock: true,
    stockQty: 42,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80"
  },

  // 3. Фитинги и соединения
  {
    id: 5,
    name: "Кламп хомут нержавеющий усиленный (Tri-Clamp)",
    sku: "MI-CL-304-050",
    category: "fittings",
    categoryName: "Фитинги и соединения",
    steel: "AISI 304",
    dn: "DN 50 (фланец 64 мм)",
    standard: "DIN 32676",
    pressure: "PN 16 бар",
    price: 890,
    inStock: true,
    stockQty: 850,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Отвод 90° крутоизогнутый приварной",
    sku: "MI-ELB-316-050",
    category: "fittings",
    categoryName: "Фитинги и соединения",
    steel: "AISI 316L",
    dn: "DN 50 (51х1.5 мм)",
    standard: "DIN 11852",
    pressure: "PN 25 бар",
    price: 1850,
    inStock: true,
    stockQty: 240,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80"
  },

  // 4. Краны и арматура
  {
    id: 7,
    name: "Кран шаровой 3-х составной приварной (с синей ручкой)",
    sku: "MI-BV-304-025",
    category: "valves",
    categoryName: "Краны и арматура",
    steel: "AISI 304",
    dn: "DN 25 (1\")",
    standard: "DIN 11850",
    pressure: "PN 63 бар",
    price: 3650,
    inStock: true,
    stockQty: 140,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    name: "Дисковый затвор поворотный (баттерфляй)",
    sku: "MI-BF-316-065",
    category: "valves",
    categoryName: "Краны и арматура",
    steel: "AISI 316L",
    dn: "DN 65 (2 1/2\")",
    standard: "DIN 11850",
    pressure: "PN 10 бар",
    price: 5200,
    inStock: true,
    stockQty: 64,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
  },

  // 5. Фланцы
  {
    id: 9,
    name: "Фланец воротниковый приварной (12Х18Н10Т)",
    sku: "MI-FL-VOR-12X-080",
    category: "flanges",
    categoryName: "Фланцы и детали",
    steel: "12Х18Н10Т",
    dn: "DN 80 (ГОСТ)",
    standard: "ГОСТ 33259-2015",
    pressure: "PN 16 бар",
    price: 5200,
    inStock: true,
    stockQty: 55,
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80"
  }
];
