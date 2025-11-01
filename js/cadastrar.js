function popularDatalist(id, opcoes) {
  const datalist = document.getElementById(id);
  opcoes.forEach(valor => {
    const option = document.createElement('option');
    option.value = valor;
    datalist.appendChild(option);
  });
}

const listas = {
  // Processadores (Intel + AMD, várias gerações)
  listaProcessador: [
    "Intel Core i3-10100", "Intel Core i3-12100", "Intel Core i3-13100",
    "Intel Core i5-10400", "Intel Core i5-11400", "Intel Core i5-12400", "Intel Core i5-13400", "Intel Core i5-13600K",
    "Intel Core i7-10700K", "Intel Core i7-11700K", "Intel Core i7-12700K", "Intel Core i7-13700K",
    "Intel Core i9-10900K", "Intel Core i9-11900K", "Intel Core i9-12900K", "Intel Core i9-13900K",
    "AMD Ryzen 3 3100", "AMD Ryzen 3 3300X",
    "AMD Ryzen 5 3600", "AMD Ryzen 5 5600X", "AMD Ryzen 5 7600", "AMD Ryzen 5 7600X",
    "AMD Ryzen 7 3700X", "AMD Ryzen 7 5800X", "AMD Ryzen 7 7700X", "AMD Ryzen 7 7700",
    "AMD Ryzen 9 5900X", "AMD Ryzen 9 5950X", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X",
    "AMD Ryzen Threadripper 3960X" // workstation (opcional)
  ],

  // Memória RAM (capacidades) — use junto com 'tipos' se quiser especificar DDR4/DDR5
  listaMemoriaRam: ["4", "8", "16", "32", "64", "128"],

  // Placas de vídeo (NVIDIA + AMD, várias gerações)
  listaGpu: [
    "NVIDIA GeForce GTX 1650", "NVIDIA GeForce GTX 1660 Super", "NVIDIA GeForce GTX 1660 Ti",
    "NVIDIA GeForce RTX 2060", "NVIDIA GeForce RTX 2060 Super", "NVIDIA GeForce RTX 2070", "NVIDIA GeForce RTX 2070 Super", "NVIDIA GeForce RTX 2080",
    "NVIDIA GeForce RTX 3060", "NVIDIA GeForce RTX 3060 Ti", "NVIDIA GeForce RTX 3070", "NVIDIA GeForce RTX 3070 Ti", "NVIDIA GeForce RTX 3080", "NVIDIA GeForce RTX 3080 Ti", "NVIDIA GeForce RTX 3090",
    "NVIDIA GeForce RTX 4060", "NVIDIA GeForce RTX 4070", "NVIDIA GeForce RTX 4070 Ti", "NVIDIA GeForce RTX 4080", "NVIDIA GeForce RTX 4090",
    "AMD Radeon RX 5500 XT", "AMD Radeon RX 5600 XT", "AMD Radeon RX 5700 XT",
    "AMD Radeon RX 6600", "AMD Radeon RX 6600 XT", "AMD Radeon RX 6700 XT", "AMD Radeon RX 6800", "AMD Radeon RX 6800 XT", "AMD Radeon RX 6900 XT",
    "AMD Radeon RX 7600", "AMD Radeon RX 7700 XT", "AMD Radeon RX 7800 XT", "AMD Radeon RX 7900 XTX"
  ],

  // Armazenamento (capacidades + modelos NVMe/SATA comuns)
  listaArmazenamento: [
    "128 SSD", "256 SSD", "512 SSD", "1 TB SSD", "2 TB SSD", "4 TB SSD",
    "1 TB HDD", "2 TB HDD", "4 TB HDD", "8 TB HDD",
    "Samsung 970 EVO Plus 500GB", "Samsung 980 PRO 1TB", "Samsung 990 PRO 2TB",
    "WD Black SN750 1TB", "WD Black SN850 1TB", "Crucial P5 Plus 1TB", "Kingston KC3000 1TB",
    "SSD Externo 512GB", "SSD Externo 1TB"
  ],

  // Placas-mãe / chipsets (AMD + Intel)
  listaPlacaMae: [
    "A320", "B350", "B450", "X370", "X470", "B550", "X570", "A520", "B650", "X670",
    "Z370", "Z390", "Z490", "Z590", "Z690", "Z790", "H410", "H510", "B560", "H610",
    "Mini-ITX", "Micro-ATX", "ATX" // form-factors
  ],

  // Fontes (wattages)
  listaFonte: ["350", "400", "450", "500", "550", "600", "650", "700", "750", "800", "850", "1000", "1200"],
};


// Popular todos os datalists
for (const id in listas) {
  popularDatalist(id, listas[id]);
}

