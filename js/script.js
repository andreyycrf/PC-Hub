function popularDatalist(id, opcoes) {
  const datalist = document.getElementById(id);
  opcoes.forEach(valor => {
    const option = document.createElement('option');
    option.value = valor;
    datalist.appendChild(option);
  });
}

const listas = {
  listaProcessador: [
    "Intel Core i3-10100", "Intel Core i5-10400", "Intel Core i5-12400",
    "Intel Core i7-10700K", "Intel Core i7-12700K", "Intel Core i9-10900K", "Intel Core i9-12900K",
    "AMD Ryzen 3 3100", "AMD Ryzen 5 3600", "AMD Ryzen 5 5600X",
    "AMD Ryzen 7 3700X", "AMD Ryzen 7 5800X", "AMD Ryzen 9 5900X", "AMD Ryzen 9 5950X"
  ],
  listaMemoriaRam: ["4", "8", "16", "32", "64"],
  listaGpu: [
    "NVIDIA GeForce GTX 1650", "NVIDIA GeForce GTX 1660 Super",
    "NVIDIA GeForce RTX 2060", "NVIDIA GeForce RTX 3060",
    "NVIDIA GeForce RTX 3070", "NVIDIA GeForce RTX 3080",
    "AMD Radeon RX 5600 XT", "AMD Radeon RX 5700 XT",
    "AMD Radeon RX 6600 XT", "AMD Radeon RX 6700 XT", "AMD Radeon RX 6800 XT"
  ],
  listaArmazenamento: ["256 SSD", "512 SSD", "1 TB SSD", "2 TB SSD", "1 TB HDD", "2 TB HDD", "4 TB HDD"],
  listaPlacaMae: ["B450", "B550", "X570", "Z490", "Z590", "Z690"],
  listaFonte: ["500", "600", "650", "750", "850", "1000"]
};


Object.entries(listas).forEach(([id, valores]) => popularDatalist(id, valores));

function evaluateSetup() {
  const cpu = document.getElementById("cpu").value.toLowerCase();
  const ram = parseInt(document.getElementById("ram").value) || 0;
  const gpu = document.getElementById("gpu").value.toLowerCase();
  const storage = document.getElementById("storage").value.toLowerCase();
  const psu = parseInt(document.getElementById("psu").value) || 0;
  const resultBox = document.getElementById("evaluationResult");

  // --- Avaliações baseadas em critérios simples ---
  let cpuScore = 0;
  if (cpu.includes("i9") || cpu.includes("ryzen 9")) cpuScore = 10;
  else if (cpu.includes("i7") || cpu.includes("ryzen 7")) cpuScore = 9;
  else if (cpu.includes("i5") || cpu.includes("ryzen 5")) cpuScore = 7;
  else if (cpu.includes("i3") || cpu.includes("ryzen 3")) cpuScore = 5;
  else if (cpu) cpuScore = 6; // genérico se informado algo diferente
  else cpuScore = 0;

  let ramScore = ram >= 32 ? 10 : ram >= 16 ? 8 : ram >= 8 ? 6 : ram > 0 ? 4 : 0;

  let gpuScore = 0;
  if (gpu.includes("4090") || gpu.includes("7900")) gpuScore = 10;
  else if (gpu.includes("4080") || gpu.includes("4070") || gpu.includes("rx 7800")) gpuScore = 9;
  else if (gpu.includes("3060") || gpu.includes("rx 6600")) gpuScore = 8;
  else if (gpu.includes("1650") || gpu.includes("1050") || gpu.includes("vega")) gpuScore = 6;
  else if (gpu.includes("intel uhd") || gpu.includes("vega 8") || gpu.includes("integrada")) gpuScore = 4;
  else if (gpu) gpuScore = 5;
  else gpuScore = 0;

  let storageScore = 0;
  if (storage.includes("ssd")) storageScore += 2;
  if (storage.includes("nvme")) storageScore += 3;
  if (storage.includes("1tb")) storageScore += 3;
  else if (storage.includes("512")) storageScore += 2;
  else if (storage.includes("256")) storageScore += 1;

  let psuScore = psu >= 700 ? 10 : psu >= 600 ? 8 : psu >= 500 ? 6 : psu > 0 ? 4 : 0;

  // Média ponderada
  const totalScore = Math.round((cpuScore + ramScore + gpuScore + storageScore + psuScore) / 5);
    
    // Salvar no localStorage
  localStorage.setItem('ultimaAvaliacao', JSON.stringify({ cpu, ram, gpu, totalScore }));


  // --- Classificação textual ---
  let performanceText = "";
  if (totalScore >= 9) performanceText = "Excelente! Seu PC está pronto para qualquer tarefa ou jogo pesado. 🔥";
  else if (totalScore >= 7) performanceText = "Muito bom! Ideal para jogos médios e trabalho pesado. 💪";
  else if (totalScore >= 5) performanceText = "Razoável. Dá conta do básico, mas pode melhorar. ⚙️";
  else if (totalScore > 0) performanceText = "Fraco. Hora de pensar num upgrade. 🧰";
  else performanceText = "Preencha as informações para avaliar.";

  // --- Exibir resultado ---
  resultBox.innerHTML = `
    <h3>💻 Avaliação do Seu Setup</h3>
    <p><strong>Processador:</strong> ${cpu || "Não informado"} — Nota: ${cpuScore}/10</p>
    <p><strong>Memória RAM:</strong> ${ram || "Não informado"} GB — Nota: ${ramScore}/10</p>
    <p><strong>Placa de Vídeo:</strong> ${gpu || "Não informado"} — Nota: ${gpuScore}/10</p>
    <p><strong>Armazenamento:</strong> ${storage || "Não informado"} — Nota: ${storageScore}/10</p>
    <p><strong>Fonte:</strong> ${psu || "Não informado"}W — Nota: ${psuScore}/10</p>
    <hr>
    <h4>🏁 Desempenho Geral: <span style="color:${getColor(totalScore)};">${totalScore}/10</span></h4>
    <p>${performanceText}</p>
  `;
  let recomendacao = "";
    if (ram < 8) recomendacao += "Considere aumentar a memória RAM para pelo menos 8 GB.<br>";
    if (gpuScore < 6) recomendacao += "Sua GPU é básica — uma RTX 3060 ou RX 6600 XT traria um bom salto.<br>";
    if (psu < 500) recomendacao += "Fonte fraca: escolha uma com 600W ou mais.<br>";
    resultBox.innerHTML += `<hr><h4>🔧 Sugestões de Upgrade:</h4><p>${recomendacao || "Seu setup está equilibrado!"}</p>`;


  resultBox.classList.add("show");
}

function getColor(score) {
  if (score >= 9) return "#00c853";
  if (score >= 7) return "#64dd17";
  if (score >= 5) return "#ffb300";
  return "#d50000";
}



