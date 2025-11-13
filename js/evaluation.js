// evaluation.js - Lógica da página de avaliação

class SetupEvaluator {
    constructor() {
        this.form = document.getElementById('setupForm');
        this.resultsSection = document.getElementById('evaluationResults');
        this.resultsContainer = document.getElementById('evaluationResult');
        this.evaluateBtn = document.getElementById('evaluateBtn');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAutoComplete();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validação em tempo real
        this.form.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') {
                this.validateField(e.target);
            }
        });
    }

    initializeAutoComplete() {
        // Dados de autocomplete podem ser carregados aqui
        console.log('Auto-complete inicializado');
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            this.setFieldError(field, 'Este campo é obrigatório');
            return false;
        }

        if (field.type === 'number') {
            const min = parseInt(field.getAttribute('min')) || 0;
            const max = parseInt(field.getAttribute('max')) || Infinity;
            const numValue = parseInt(value);
            
            if (value && (numValue < min || numValue > max)) {
                this.setFieldError(field, `Valor deve estar entre ${min} e ${max}`);
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    setFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const inputs = this.form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        await this.evaluateSetup();
    }

    async evaluateSetup() {
        this.setLoadingState(true);
        
        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const formData = this.getFormData();
            const evaluation = this.generateEvaluation(formData);
            
            this.displayResults(evaluation);
            this.showResultsSection();
            
        } catch (error) {
            this.showNotification('Erro ao avaliar setup. Tente novamente.', 'error');
            console.error('Evaluation error:', error);
        } finally {
            this.setLoadingState(false);
        }
    }

    getFormData() {
        const data = {};
        const formElements = this.form.elements;
        
        for (let element of formElements) {
            if (element.name || element.id) {
                const key = element.id || element.name;
                data[key] = element.value.trim();
            }
        }
        
        return data;
    }

    generateEvaluation(data) {
        return {
            score: this.calculateScore(data),
            categories: this.analyzeCategories(data),
            recommendations: this.generateRecommendations(data),
            compatibility: this.checkCompatibility(data)
        };
    }

    calculateScore(data) {
        let score = 70;
        
        if (data.cpu && (data.cpu.includes('i7') || data.cpu.includes('Ryzen 7'))) score += 10;
        if (data.cpu && (data.cpu.includes('i9') || data.cpu.includes('Ryzen 9'))) score += 15;
        
        const ram = parseInt(data.ram) || 0;
        if (ram >= 32) score += 10;
        if (ram >= 64) score += 5;
        
        if (data.gpu && (data.gpu.includes('RTX 30') || data.gpu.includes('RX 6'))) score += 10;
        if (data.gpu && (data.gpu.includes('RTX 40') || data.gpu.includes('RX 7'))) score += 15;
        
        return Math.min(score, 100);
    }

    analyzeCategories(data) {
        return [
            {
                name: 'Processador',
                status: 'good',
                score: 85,
                details: 'CPU adequada para a maioria das tarefas'
            },
            {
                name: 'Memória RAM',
                status: 'excellent',
                score: 92,
                details: 'Quantidade de RAM suficiente para multitarefa'
            },
            {
                name: 'Placa de Vídeo',
                status: 'good',
                score: 78,
                details: 'Boa para jogos em 1080p'
            },
            {
                name: 'Armazenamento',
                status: 'warning',
                score: 65,
                details: 'Considere adicionar SSD para melhor performance'
            },
            {
                name: 'Fonte',
                status: 'good',
                score: 82,
                details: 'Potência adequada para os componentes'
            }
        ];
    }

    generateRecommendations(data) {
        const recommendations = [];
        
        if (parseInt(data.ram) < 16) {
            recommendations.push('Considere upgrade para 16GB de RAM para melhor multitarefa');
        }
        
        if (!data.storage?.includes('SSD')) {
            recommendations.push('Adicione um SSD para boot e carregamento mais rápidos');
        }
        
        if (parseInt(data.psu) < 600 && data.gpu) {
            recommendations.push('Verifique se a fonte é suficiente para a placa de vídeo');
        }
        
        return recommendations.length > 0 ? recommendations : ['Seu setup está bem equilibrado!'];
    }

    checkCompatibility(data) {
        const issues = [];
        
        if (data.socket && data.placaMae) {
            const socketMappings = {
                'LGA1700': ['B660', 'Z690', 'H670'],
                'AM4': ['B450', 'B550', 'X570'],
                'AM5': ['B650', 'X670']
            };
            
            const compatibleBoards = socketMappings[data.socket];
            if (compatibleBoards && !compatibleBoards.some(board => data.placaMae.includes(board))) {
                issues.push('Possível incompatibilidade entre processador e placa-mãe');
            }
        }
        
        return issues;
    }

    displayResults(evaluation) {
        const scoreClass = evaluation.score >= 80 ? 'excellent' : 
                          evaluation.score >= 60 ? 'good' : 
                          evaluation.score >= 40 ? 'warning' : 'critical';

        this.resultsContainer.innerHTML = `
            <div class="result-header">
                <div class="result-score ${scoreClass}">${evaluation.score}/100</div>
                <h3 class="result-title">${this.getScoreTitle(evaluation.score)}</h3>
                <p class="result-description">${this.getScoreDescription(evaluation.score)}</p>
            </div>

            <div class="result-grid">
                ${evaluation.categories.map(category => `
                    <div class="result-category">
                        <div class="category-header">
                            <span class="category-icon">${this.getCategoryIcon(category.name)}</span>
                            <h4 class="category-title">${category.name}</h4>
                            <span class="category-status status-${category.status}">${category.score}/100</span>
                        </div>
                        <p>${category.details}</p>
                    </div>
                `).join('')}
            </div>

            ${evaluation.recommendations.length > 0 ? `
                <div class="recommendations">
                    <h4>💡 Recomendações de Melhoria</h4>
                    <ul>
                        ${evaluation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            ${evaluation.compatibility.length > 0 ? `
                <div class="compatibility-issues">
                    <h4>⚠️ Problemas de Compatibilidade</h4>
                    <ul>
                        ${evaluation.compatibility.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;

        setTimeout(() => {
            this.resultsContainer.classList.add('show');
        }, 100);
    }

    getScoreTitle(score) {
        if (score >= 90) return 'Setup Excelente!';
        if (score >= 75) return 'Setup Muito Bom';
        if (score >= 60) return 'Setup Satisfatório';
        return 'Setup Precisa de Melhorias';
    }

    getScoreDescription(score) {
        if (score >= 90) return 'Seu PC está otimizado e pronto para qualquer tarefa.';
        if (score >= 75) return 'Bom equilíbrio entre componentes. Pequenos upgrades podem melhorar ainda mais.';
        if (score >= 60) return 'Setup funcional, mas algumas melhorias trariam ganhos significativos.';
        return 'Recomendamos considerar upgrades para melhorar a experiência.';
    }

    getCategoryIcon(categoryName) {
        const icons = {
            'Processador': '🔧',
            'Memória RAM': '🧠',
            'Placa de Vídeo': '🎮',
            'Armazenamento': '💾',
            'Fonte': '🔋'
        };
        return icons[categoryName] || '⚙️';
    }

    showResultsSection() {
        this.resultsSection.hidden = false;
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    setLoadingState(loading) {
        this.evaluateBtn.disabled = loading;
        
        if (loading) {
            this.evaluateBtn.classList.add('loading');
            this.evaluateBtn.innerHTML = `
                <span class="btn-icon" aria-hidden="true">📊</span>
                Analisando...
                <span class="loading-spinner" aria-hidden="true"></span>
            `;
        } else {
            this.evaluateBtn.classList.remove('loading');
            this.evaluateBtn.innerHTML = `
                <span class="btn-icon" aria-hidden="true">📊</span>
                Analisar Setup
                <span class="loading-spinner" aria-hidden="true"></span>
            `;
        }
    }

    showNotification(message, type = 'info') {
        // Sistema simples de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new SetupEvaluator();
    
    // Menu mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navLinks.classList.toggle('show');
        });
    }
});