const listaProcessador = {
    "processadores": [
    "Intel Core i3-10100",
    "Intel Core i5-10400",
    "Intel Core i5-12400",
    "Intel Core i7-10700K",
    "Intel Core i7-12700K",
    "Intel Core i9-10900K",
    "Intel Core i9-12900K",
    "AMD Ryzen 3 3100",
    "AMD Ryzen 5 3600",
    "AMD Ryzen 5 5600X",
    "AMD Ryzen 7 3700X",
    "AMD Ryzen 7 5800X",
    "AMD Ryzen 9 5900X",
    "AMD Ryzen 9 5950X"
]
};
const datalist = document.getElementById('listaProcessador');
listaProcessador.processadores.forEach(function(processador) {
    const option = document.createElement('option');
    option.value = processador;
    datalist.appendChild(option);
});

const listaMemoriaRam = {
    "memorias": [
    "8",
    "16",
    "32",
    "64",
    ]
};
const datalistRam = document.getElementById('listaMemoriaRam');
listaMemoriaRam.memorias.forEach(function(memoria) {
    const option = document.createElement('option');
    option.value = memoria;
    datalistRam.appendChild(option);
});
const listaGpu = {
    "gpus": [
    "NVIDIA GeForce GTX 1650",
    "NVIDIA GeForce GTX 1660 Super",
    "NVIDIA GeForce RTX 2060",
    "NVIDIA GeForce RTX 3060",
    "NVIDIA GeForce RTX 3070",
    "NVIDIA GeForce RTX 3080",
    "AMD Radeon RX 5600 XT",
    "AMD Radeon RX 5700 XT",
    "AMD Radeon RX 6600 XT",
    "AMD Radeon RX 6700 XT",
    "AMD Radeon RX 6800 XT"
]
};
const datalistGpu = document.getElementById('listaGpu');
listaGpu.gpus.forEach(function(gpu) {
    const option = document.createElement('option');
    option.value = gpu;
    datalistGpu.appendChild(option);
});
const listaArmazenamento = {
    "armazenamentos": [
    "256 SSD",
    "512 SSD",
    "1 TB SSD",
    "2 TB SSD",
    "1 TB HDD",
    "2 TB HDD",
    "4 TB HDD"
] };
const datalistArmazenamento = document.getElementById('listaArmazenamento');
listaArmazenamento.armazenamentos.forEach(function(armazenamento) {
    const option = document.createElement('option');
    option.value = armazenamento;
    datalistArmazenamento.appendChild(option);
});
const listaPlacaMae = {
    "placasMae": [
    "B450",
    "B550",
    "X570",
    "Z490",
    "Z590",
    "Z690"
] };
const datalistPlacaMae = document.getElementById('listaPlacaMae');
listaPlacaMae.placasMae.forEach(function(placaMae) {
    const option = document.createElement('option');
    option.value = placaMae;
    datalistPlacaMae.appendChild(option);
});
const listaFonte = {
    "fontes": [
    "500",
    "600",
    "650",
    "750",
    "850",
    "1000"
] };
const datalistFonte = document.getElementById('listaFonte');
listaFonte.fontes.forEach(function(fonte) {
    const option = document.createElement('option');
    option.value = fonte;
    datalistFonte.appendChild(option);
}
);
function evaluateSetup() {
    const processor = document.getElementById('processor').value;
    const ram = parseInt(document.getElementById('ram').value);
    const gpu = document.getElementById('gpu').value;
    const storage = document.getElementById('storage').value;
    const motherboard = document.getElementById('motherboard').value;
    const psu = parseInt(document.getElementById('psu').value);
    let score = 0;

    // Avaliação do processador
    const highEndProcessors = ["Intel Core i7-12700K", "Intel Core i9-12900K", "AMD Ryzen 7 5800X", "AMD Ryzen 9 5900X", "AMD Ryzen 9 5950X"];
    if (highEndProcessors.includes(processor)) {
        score += 3;
    } else if (processor.includes("i5") || processor.includes("Ryzen 5")) {
        score += 2;
    } else {
        score += 1;
    }
    // Avaliação da RAM
    if (ram >= 32) {
        score += 3;
    } else if (ram >= 16) {
        score += 2;
    } else {
        score += 1;
    }
    // Avaliação da GPU
    const highEndGpus = ["NVIDIA GeForce RTX 3070", "NVIDIA GeForce RTX 3080", "AMD Radeon RX 6700 XT", "AMD Radeon RX 6800 XT"];
    if (highEndGpus.includes(gpu)) {
        score += 3;
    }
    else if (gpu.includes("RTX 2060") || gpu.includes("RTX 3060") || gpu.includes("RX 5600 XT") || gpu.includes("RX 5700 XT")) {
        score += 2;
    }
    else {
        score += 1;
    }
    // Avaliação do armazenamento
    if (storage.includes("SSD")) {
        score += 2;
    } else {
        score += 1;
    }
    // Avaliação da placa-mãe
    const highEndMotherboards = ["X570", "Z590", "Z690"];
    if (highEndMotherboards.includes(motherboard)) {
        score += 3;
    } else if (motherboard.includes("B550") || motherboard.includes("Z490")) {
        score += 2;
    } else {
        score += 1;
    }
    // Avaliação da fonte de alimentação
    if (psu >= 750) {
        score += 3;
    } else if (psu >= 600) {
        score += 2;
    } else {
        score += 1;
    }
    // Exibir o resultado da avaliação
    const resultDiv = document.getElementById('evaluationResult');
    if (score >= 15) {
        resultDiv.innerHTML = "<h3>Excelente Setup!</h3><p>Seu setup é ótimo para jogos e tarefas pesadas.</p>";
    } else if (score >= 10) {
        resultDiv.innerHTML = "<h3>Bom Setup!</h3><p>Seu setup é adequado para a maioria dos jogos e tarefas.</p>";
    } else {
        resultDiv.innerHTML = "<h3>Setup Básico</h3><p>Seu setup pode ter dificuldades com jogos mais exigentes.</p>";
    }
}