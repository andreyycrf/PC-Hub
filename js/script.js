// popularDatalist + listas completas (inclui listaSocket)
function popularDatalist(id, opcoes) {
  const datalist = document.getElementById(id);
  if (!datalist) return; // evita erro se datalist não existir no HTML
  opcoes.forEach(valor => {
    const option = document.createElement('option');
    option.value = valor;
    datalist.appendChild(option);
  });
}

const listas = {
  // Processadores (Intel + AMD)
  listaProcessador: [
    "Intel Core i3-10100", "Intel Core i3-12100", "Intel Core i3-13100",
    "Intel Core i5-10400", "Intel Core i5-11400", "Intel Core i5-12400", "Intel Core i5-13400", "Intel Core i5-13600K",
    "Intel Core i7-10700K", "Intel Core i7-11700K", "Intel Core i7-12700K", "Intel Core i7-13700K",
    "Intel Core i9-10900K", "Intel Core i9-11900K", "Intel Core i9-12900K", "Intel Core i9-13900K",
    "AMD Ryzen 3 3100", "AMD Ryzen 3 3300X",
    "AMD Ryzen 5 3600", "AMD Ryzen 5 5600X", "AMD Ryzen 5 7600", "AMD Ryzen 5 7600X",
    "AMD Ryzen 7 3700X", "AMD Ryzen 7 5800X", "AMD Ryzen 7 7700X", "AMD Ryzen 7 7700",
    "AMD Ryzen 9 5900X", "AMD Ryzen 9 5950X", "AMD Ryzen 9 7900X", "AMD Ryzen 9 7950X",
    "AMD Ryzen Threadripper 3960X"
  ],

  // Memória RAM (capacidades)
  listaMemoriaRam: ["4", "8", "16", "32", "64", "128"],

  // Tipos de memória (DDR)
  listaMemoriaTipo: ["DDR3 1600", "DDR4 2133", "DDR4 2400", "DDR4 2666", "DDR4 3000", "DDR4 3200", "DDR5 4800", "DDR5 5200", "DDR5 6000"],

  // Placas de vídeo
  listaGpu: [
    "NVIDIA GeForce GTX 1650", "NVIDIA GeForce GTX 1660 Super", "NVIDIA GeForce GTX 1660 Ti",
    "NVIDIA GeForce RTX 2060", "NVIDIA GeForce RTX 2060 Super", "NVIDIA GeForce RTX 2070", "NVIDIA GeForce RTX 2070 Super",
    "NVIDIA GeForce RTX 2080", "NVIDIA GeForce RTX 3060", "NVIDIA GeForce RTX 3060 Ti",
    "NVIDIA GeForce RTX 3070", "NVIDIA GeForce RTX 3070 Ti", "NVIDIA GeForce RTX 3080", "NVIDIA GeForce RTX 3080 Ti",
    "NVIDIA GeForce RTX 3090", "NVIDIA GeForce RTX 4060", "NVIDIA GeForce RTX 4070", "NVIDIA GeForce RTX 4070 Ti",
    "NVIDIA GeForce RTX 4080", "NVIDIA GeForce RTX 4090", "AMD Radeon RX 5500 XT", "AMD Radeon RX 5600 XT",
    "AMD Radeon RX 5700 XT", "AMD Radeon RX 6600", "AMD Radeon RX 6600 XT", "AMD Radeon RX 6700 XT",
    "AMD Radeon RX 6800", "AMD Radeon RX 6800 XT", "AMD Radeon RX 6900 XT", "AMD Radeon RX 7600",
    "AMD Radeon RX 7700 XT", "AMD Radeon RX 7800 XT", "AMD Radeon RX 7900 XTX"
  ],

  // Armazenamento
  listaArmazenamento: [
    "128 SSD", "256 SSD", "512 SSD", "1 TB SSD", "2 TB SSD", "4 TB SSD",
    "1 TB HDD", "2 TB HDD", "4 TB HDD", "8 TB HDD",
    "Samsung 970 EVO Plus 500GB", "Samsung 980 PRO 1TB", "Samsung 990 PRO 2TB",
    "WD Black SN750 1TB", "WD Black SN850 1TB", "Crucial P5 Plus 1TB", "Kingston KC3000 1TB",
    "SSD Externo 512GB", "SSD Externo 1TB"
  ],

  // Placas-mãe / chipsets e form-factors
  listaPlacaMae: [
    "A320", "B350", "B450", "X370", "X470", "B550", "X570", "A520", "B650", "X670",
    "Z370", "Z390", "Z490", "Z590", "Z690", "Z790", "H410", "H510", "B560", "H610",
    "Mini-ITX", "Micro-ATX", "ATX"
  ],

  // Sockets
  listaSocket: ["AM4", "AM5", "LGA1151", "LGA1200", "LGA1700", "TR4", "sTRX4"],

  // Fontes (wattages)
  listaFonte: ["350", "400", "450", "500", "550", "600", "650", "700", "750", "800", "850", "1000", "1200"],

  // Coolers
  listaCooler: [
    "Cooler Box (stock)", "Cooler Master Hyper 212", "Noctua NH-D15", "be quiet! Dark Rock Pro 4",
    "Corsair H100i (AIO)", "Corsair H150i (AIO)", "NZXT Kraken X63", "Deepcool Castle 360"
  ],

  // Opcional: gabinetes, periféricos e extras
  listaGabinete: ["NZXT H510", "Corsair 4000D", "Phanteks P400A", "Lian Li Lancool II"],
  listaPlacaRede: ["Onboard (Ethernet)", "Placa de Rede 1 Gbps", "Placa Wi-Fi 6 (802.11ax)"],
  listaPerifericos: ["Teclado mecânico", "Mouse gamer", "Monitor 1440p 144Hz"],
  listaVentoinha: ["120mm PWM", "140mm PWM", "RGB Fan"],
  listaExtras: ["Pasta térmica", "Backplate GPU", "SSD M.2 heatsink"]
};

// preencher todos os datalists que existirem no HTML com os ids correspondentes às chaves de 'listas'
Object.entries(listas).forEach(([id, valores]) => popularDatalist(id, valores));

/* --------------------
  Helpers de avaliação
   -------------------- */

// heurística simples para detectar socket a partir do nome do CPU
function detectSocketFromCPU(cpuLower) {
  if (!cpuLower) return "";
  if (cpuLower.includes("threadripper") || cpuLower.includes("trx")) return "trx4";
  if (cpuLower.includes("ryzen")) {
    // heurística: gerações 7000+ usam AM5, outras AM4 (simples)
    if (/\b(7[6-9]00|7900|7950|7600|7700)\b/.test(cpuLower) || cpuLower.includes("7600") || cpuLower.includes("7700")) return "am5";
    return "am4";
  }
  if (cpuLower.includes("intel")) {
    // heurística para gerações LGA1700
    if (/\b(12|13|12400|12700|12900|13400|13700|13900|13600)\b/.test(cpuLower)) return "lga1700";
    if (/\b(10|11|10900|11700|10700)\b/.test(cpuLower)) return "lga1200-or-1151";
    return "";
  }
  return "";
}

function isHighEndGPU(gpuLower) {
  if (!gpuLower) return false;
  const high = ["4090", "4080", "3090", "3080", "7900", "6900", "6800 xt", "4090"];
  return high.some(h => gpuLower.includes(h));
}

function getColor(score) {
  if (score >= 9) return "#00c853";
  if (score >= 7) return "#64dd17";
  if (score >= 5) return "#ffb300";
  return "#d50000";
}

/* --------------------
  Função de avaliação
   -------------------- */
function evaluateSetup() {
  const cpu = (document.getElementById("cpu")?.value || "").toLowerCase();
  const ram = parseInt(document.getElementById("ram")?.value) || 0;
  const memoriaTipo = (document.getElementById("memoriaTipo")?.value || "").toLowerCase();
  const gpu = (document.getElementById("gpu")?.value || "").toLowerCase();
  const storage = (document.getElementById("storage")?.value || "").toLowerCase();
  const psu = parseInt(document.getElementById("psu")?.value) || 0;
  const placaMae = (document.getElementById("placaMae")?.value || "").toLowerCase();
  const socket = (document.getElementById("socket")?.value || "").toLowerCase();
  const cooler = (document.getElementById("cooler")?.value || "").toLowerCase();
  const resultBox = document.getElementById("evaluationResult");
  if (!resultBox) return console.warn("Elemento #evaluationResult não encontrado no HTML.");

  // CPU score
  let cpuScore = 0;
  if (cpu.includes("i9") || cpu.includes("ryzen 9")) cpuScore = 10;
  else if (cpu.includes("i7") || cpu.includes("ryzen 7")) cpuScore = 9;
  else if (cpu.includes("i5") || cpu.includes("ryzen 5")) cpuScore = 7;
  else if (cpu.includes("i3") || cpu.includes("ryzen 3")) cpuScore = 5;
  else if (cpu) cpuScore = 6;
  else cpuScore = 0;

  // RAM score
  let ramScore = ram >= 64 ? 10 : ram >= 32 ? 9 : ram >= 16 ? 8 : ram >= 8 ? 6 : ram > 0 ? 4 : 0;

  // RAM type score (compatibilidade)
  let memoriaTipoScore = 0;
  const detectedSocket = detectSocketFromCPU(cpu);
  if (memoriaTipo) {
    if (memoriaTipo.includes("ddr5")) {
      memoriaTipoScore = (detectedSocket === "am5" || detectedSocket === "lga1700") ? 10 : 6;
    } else if (memoriaTipo.includes("ddr4")) {
      memoriaTipoScore = (detectedSocket === "am4" || detectedSocket === "lga1200-or-1151" || detectedSocket === "") ? 9 : 7;
    } else {
      memoriaTipoScore = 6;
    }
  } else memoriaTipoScore = 0;

  // GPU score
  let gpuScore = 0;
  if (gpu.includes("4090") || gpu.includes("7900 x") || gpu.includes("7900 xtx")) gpuScore = 10;
  else if (gpu.includes("4080") || gpu.includes("4070") || gpu.includes("rx 7800") || gpu.includes("4070 ti")) gpuScore = 9;
  else if (gpu.includes("3080") || gpu.includes("3070") || gpu.includes("3060 ti") || gpu.includes("3070 ti")) gpuScore = 9;
  else if (gpu.includes("3060") || gpu.includes("rx 6600")) gpuScore = 8;
  else if (gpu.includes("1660") || gpu.includes("2060") || gpu.includes("1650")) gpuScore = 7;
  else if (gpu.includes("integrada") || gpu.includes("intel uhd") || gpu.includes("vega")) gpuScore = 4;
  else if (gpu) gpuScore = 5;
  else gpuScore = 0;

  // Storage score
  let storageScore = 0;
  if (storage.includes("nvme") || storage.includes("m.2")) storageScore += 3;
  if (storage.includes("ssd")) storageScore += 2;
  if (storage.includes("1 tb") || storage.includes("1tb")) storageScore += 2;
  else if (storage.includes("512")) storageScore += 1;
  else if (storage.includes("256")) storageScore += 0.5;
  storageScore = Math.min(Math.round(storageScore * 2), 10);

  // PSU score e ajuste por GPU
  let psuScore = psu >= 1200 ? 10 : psu >= 1000 ? 9 : psu >= 850 ? 8 : psu >= 750 ? 7 : psu >= 650 ? 6 : psu >= 550 ? 5 : psu > 0 ? 4 : 0;
  if (isHighEndGPU(gpu) && psu > 0 && psu < 850) psuScore = Math.min(psuScore, 4);
  else if (gpuScore >= 9 && psu >= 850) psuScore = Math.max(psuScore, 8);

  // Socket / placa-mãe score
  let socketScore = 0;
  if (socket) {
    if (detectedSocket && socket.includes(detectedSocket)) socketScore = 10;
    else socketScore = 3;
  } else if (placaMae) {
    // heurística com base no nome da placa-mãe e marca do CPU
    if (placaMae.includes("b") || placaMae.includes("x") || placaMae.includes("a")) {
      if (cpu.includes("ryzen")) socketScore = 9;
      else socketScore = 7;
    }
    if (placaMae.includes("z") || placaMae.includes("h")) {
      if (cpu.includes("intel")) socketScore = 9;
      else socketScore = Math.max(socketScore, 6);
    }
    if (socketScore === 0) socketScore = 6;
  } else socketScore = 0;

  // Cooler score
  let coolerScore = 0;
  if (cooler) {
    if (cooler.includes("aio") || cooler.includes("h100") || cooler.includes("kraken") || cooler.includes("castle")) coolerScore = 9;
    else if (cooler.includes("noctua") || cooler.includes("nh-d15") || cooler.includes("dark rock")) coolerScore = 9;
    else if (cooler.includes("hyper 212") || cooler.includes("air")) coolerScore = 7;
    else if (cooler.includes("stock") || cooler.includes("box")) coolerScore = 4;
    else coolerScore = 6;
  } else coolerScore = 0;

  // compor média — ignorar zeros (campos não informados)
  const scores = [cpuScore, ramScore, memoriaTipoScore, gpuScore, storageScore, psuScore, socketScore, coolerScore];
  const validScores = scores.filter(s => typeof s === "number" && s > 0);
  const totalScore = validScores.length ? Math.round(validScores.reduce((a,b)=>a+b,0) / validScores.length) : 0;

  // salvar no localStorage
  localStorage.setItem('ultimaAvaliacao', JSON.stringify({
    cpu, ram, memoriaTipo, gpu, storage, psu, placaMae, socket, cooler, totalScore, timestamp: new Date().toISOString()
  }));

  // montar texto de saída
  let performanceText = "";
  if (totalScore >= 9) performanceText = "Excelente! Seu PC está pronto para qualquer tarefa ou jogo pesado. 🔥";
  else if (totalScore >= 7) performanceText = "Muito bom! Ideal para jogos médios e trabalho pesado. 💪";
  else if (totalScore >= 5) performanceText = "Razoável. Dá conta do básico, mas pode melhorar. ⚙️";
  else if (totalScore > 0) performanceText = "Fraco. Hora de pensar num upgrade. 🧰";
  else performanceText = "Preencha as informações para avaliar.";

  // exibir resultado
  resultBox.innerHTML = `
    <h3>💻 Avaliação do Seu Setup</h3>
    <p><strong>Processador:</strong> ${cpu || "Não informado"} — Nota: ${cpuScore}/10</p>
    <p><strong>Memória:</strong> ${ram ? ram + " GB" : "Não informado"} — Nota: ${ramScore}/10</p>
    <p><strong>Tipo de RAM:</strong> ${memoriaTipo || "Não informado"} — Nota: ${memoriaTipoScore}/10</p>
    <p><strong>Placa de Vídeo:</strong> ${gpu || "Não informado"} — Nota: ${gpuScore}/10</p>
    <p><strong>Armazenamento:</strong> ${storage || "Não informado"} — Nota: ${storageScore}/10</p>
    <p><strong>Fonte:</strong> ${psu ? psu + " W" : "Não informado"} — Nota: ${psuScore}/10</p>
    <p><strong>Placa-mãe:</strong> ${placaMae || "Não informado"} — Socket detectado: ${detectedSocket || "—"} — Compatibilidade: ${socketScore}/10</p>
    <p><strong>Cooler:</strong> ${cooler || "Não informado"} — Nota: ${coolerScore}/10</p>
    <hr>
    <h4>🏁 Desempenho Geral: <span style="color:${getColor(totalScore)};">${totalScore}/10</span></h4>
    <p>${performanceText}</p>
  `;

  // recomendações
  let recomendacao = "";
  if (ram < 16) recomendacao += "Considere aumentar a memória RAM para pelo menos 16 GB para melhor performance em multitarefa e jogos.<br>";
  if (gpuScore < 7) recomendacao += "GPU básica: avalie uma RTX 3060 / RX 6600 XT ou superior para jogos modernos.<br>";
  if (psu > 0 && isHighEndGPU(gpu) && psu < 850) recomendacao += "GPU topo-de-linha detectada, mas sua fonte pode ser insuficiente — recomendo >= 850W de boa qualidade.<br>";
  if (socketScore > 0 && socketScore <= 4) recomendacao += "Possível incompatibilidade entre CPU e placa-mãe/socket — verifique os sockets/chipset antes de comprar.<br>";
  if (coolerScore <= 4 && cpuScore >= 9) recomendacao += "CPU poderosa com cooler stock — considere um cooler melhor (AIO ou high-end air) para manter temperaturas seguras.<br>";

  resultBox.innerHTML += `<hr><h4>🔧 Sugestões de Upgrade:</h4><p>${recomendacao || "Seu setup está equilibrado!"}</p>`;
  resultBox.classList.add("show");
}

/* --------------------
  Conexões automáticas (se existir botão/form no HTML)
   -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('avaliarBtn');
  if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); evaluateSetup(); });

  const form = document.getElementById('avaliarForm');
  if (form) form.addEventListener('submit', (e) => { e.preventDefault(); evaluateSetup(); });
});

// Expor global (opcional)
window.evaluateSetup = evaluateSetup;
