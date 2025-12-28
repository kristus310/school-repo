class Auto {
    constructor(znacka, model, rok, cena, palivo = '', najezd = null) {
        this.znacka = znacka;
        this.model = model;
        this.rok = rok;
        this.cena = cena;
        this.palivo = palivo;
        this.najezd = najezd;
        this.id = Date.now() + Math.random();
    }

    getPopis() {
        let popis = `${this.znacka} ${this.model} z roku ${this.rok}`;
        if (this.palivo) {
            popis += ` (${this.palivo})`;
        }
        if (this.najezd !== null && this.najezd !== '') {
            popis += `, nájezd ${this.formatNajezd()}`;
        }
        return popis;
    }

    getCenaText() {
        return this.formatCena(this.cena);
    }

    formatCena(cena) {
        return new Intl.NumberFormat('cs-CZ', {
            style: 'currency',
            currency: 'CZK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(cena);
    }

    formatNajezd() {
        return new Intl.NumberFormat('cs-CZ').format(this.najezd) + ' km';
    }
}

class Autobazar {
    constructor() {
        this.auta = [];
        this.loadFromLocalStorage();
    }

    pridatAuto(auto) {
        this.auta.push(auto);
        this.saveToLocalStorage();
    }

    smazatAuto(id) {
        this.auta = this.auta.filter(auto => auto.id !== id);
        this.saveToLocalStorage();
    }

    getPrumernaCena() {
        if (this.auta.length === 0) return 0;
        const soucet = this.auta.reduce((sum, auto) => sum + auto.cena, 0);
        return Math.round(soucet / this.auta.length);
    }

    getAutaPodlePaliva(palivo) {
        if (!palivo) return this.auta;
        return this.auta.filter(auto => auto.palivo === palivo);
    }

    getPocetAut() {
        return this.auta.length;
    }

    saveToLocalStorage() {
        const data = this.auta.map(auto => ({
            znacka: auto.znacka,
            model: auto.model,
            rok: auto.rok,
            cena: auto.cena,
            palivo: auto.palivo,
            najezd: auto.najezd,
            id: auto.id
        }));
        localStorage.setItem('autobazar', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem('autobazar');
        if (data) {
            const parsed = JSON.parse(data);
            this.auta = parsed.map(item => {
                const auto = new Auto(
                    item.znacka,
                    item.model,
                    item.rok,
                    item.cena,
                    item.palivo,
                    item.najezd
                );
                auto.id = item.id;
                return auto;
            });
        }
    }
}

class AutobazarApp {
    constructor() {
        this.bazar = new Autobazar();
        this.form = document.getElementById('addCarForm');
        this.carList = document.getElementById('carList');
        this.errorMessage = document.getElementById('errorMessage');
        this.filterPalivo = document.getElementById('filterPalivo');

        this.initEventListeners();
        this.renderCarList();
        this.updateSummary();
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.filterPalivo.addEventListener('change', () => this.renderCarList());
    }

    handleSubmit(e) {
        e.preventDefault();

        const znacka = document.getElementById('znacka').value.trim();
        const model = document.getElementById('model').value.trim();
        const rok = parseInt(document.getElementById('rok').value);
        const cena = parseInt(document.getElementById('cena').value);
        const palivo = document.getElementById('palivo').value;
        const najezd = document.getElementById('najezd').value;

        const error = this.validateInput(znacka, model, rok, cena);
        if (error) {
            this.showError(error);
            return;
        }

        const auto = new Auto(
            znacka,
            model,
            rok,
            cena,
            palivo,
            najezd ? parseInt(najezd) : null
        );

        this.bazar.pridatAuto(auto);
        this.form.reset();
        this.hideError();
        this.renderCarList();
        this.updateSummary();
    }

    validateInput(znacka, model, rok, cena) {
        if (!znacka || !model) {
            return 'Značka a model nesmí být prázdné!';
        }

        if (isNaN(rok) || rok < 1980 || rok > 2025) {
            return 'Rok výroby musí být v rozsahu 1980-2025!';
        }

        if (isNaN(cena) || cena <= 0) {
            return 'Cena musí být kladné číslo!';
        }

        return null;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    renderCarList() {
        const filtrPalivo = this.filterPalivo.value;
        const auta = this.bazar.getAutaPodlePaliva(filtrPalivo);

        if (auta.length === 0) {
            this.carList.innerHTML = '<div class="empty-state">Žádná auta k zobrazení</div>';
            return;
        }

        this.carList.innerHTML = auta.map(auto => `
                    <div class="car-item">
                        <div class="car-info">
                            <div class="car-title">${auto.znacka} ${auto.model}</div>
                            <div class="car-details">
                                Rok: ${auto.rok}
                                ${auto.palivo ? `| Palivo: ${auto.palivo}` : ''}
                                ${auto.najezd ? `| Nájezd: ${auto.formatNajezd()}` : ''}
                            </div>
                        </div>
                        <div class="car-price">${auto.getCenaText()}</div>
                        <button class="btn-delete" onclick="app.deleteCar(${auto.id})">Smazat</button>
                    </div>
                `).join('');
    }

    deleteCar(id) {
        if (confirm('Opravdu chcete smazat toto auto?')) {
            this.bazar.smazatAuto(id);
            this.renderCarList();
            this.updateSummary();
        }
    }

    updateSummary() {
        const pocet = this.bazar.getPocetAut();
        const prumer = this.bazar.getPrumernaCena();

        document.getElementById('carCount').textContent = pocet;
        document.getElementById('avgPrice').textContent = pocet > 0
            ? new Intl.NumberFormat('cs-CZ').format(prumer) + ' Kč'
            : '0 Kč';
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AutobazarApp();
});