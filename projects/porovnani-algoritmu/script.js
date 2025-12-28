function soucetKladnych(pole) {
    if (!Array.isArray(pole)) {
        return 0;
    }

    let soucet = 0;
    for (let cislo of pole) {
        if (typeof cislo === 'number' && !isNaN(cislo) && cislo > 0) {
            soucet += cislo;
        }
    }
    return soucet;
}

function test(nazev, vstup, ocekavany) {
    const vysledek = soucetKladnych(vstup);
    const status = vysledek === ocekavany ? '✅ OK' : '❌ FAIL';

    console.log(`\n${nazev}`);
    console.log(`  Vstup: [${vstup}]`);
    console.log(`  Očekávaný: ${ocekavany}`);
    console.log(`  Skutečný: ${vysledek}`);
    console.log(`  ${status}`);

    return vysledek === ocekavany;
}

console.log('═══════════════════════════════════════');
console.log('ČÁST A: TESTY FUNKCE "SOUČET KLADNÝCH"');
console.log('═══════════════════════════════════════');

let uspesne = 0;
let celkem = 0;

celkem++;
if (test('Test 1: Prázdné pole', [], 0)) uspesne++;

celkem++;
if (test('Test 2: Jen záporná čísla', [-5, -10, -3, -100], 0)) uspesne++;

celkem++;
if (test('Test 3: Smíšená čísla', [-5, 10, -3, 7, 0, 15], 32)) uspesne++;

celkem++;
if (test('Test 4: Velká čísla', [1000000, 5000000, -2000000], 6000000)) uspesne++;

celkem++;
if (test('Test 5: Delší pole', [1, 2, 3, -1, -2, 4, 5, 0, -10, 6, 7, 8, -5, 9, 10], 55)) uspesne++;

celkem++;
if (test('Test 6: S nečíselnými hodnotami', [5, 'text', 10, null, 3, undefined, NaN], 18)) uspesne++;

celkem++;
if (test('Test 7: Pouze nuly', [0, 0, 0, 0], 0)) uspesne++;

console.log(`\n${'='.repeat(40)}`);
console.log(`SHRNUTÍ TESTŮ: ${uspesne}/${celkem} úspěšných`);
console.log(`${'='.repeat(40)}`);

console.log('\n\n═══════════════════════════════════════');
console.log('ČÁST B: ODSTRANĚNÍ DUPLICIT');
console.log('═══════════════════════════════════════');

function odstranitDuplicity_Array(pole) {
    const vysledek = [];
    for (let prvek of pole) {
        if (!vysledek.includes(prvek)) {
            vysledek.push(prvek);
        }
    }
    return vysledek;
}

function odstranitDuplicity_Set(pole) {
    return [...new Set(pole)];
}

function generujData(pocet) {
    const data = [];
    for (let i = 0; i < pocet; i++) {
        data.push(`item_${Math.floor(Math.random() * (pocet * 0.2))}`);
    }
    return data;
}

function zmerCas(funkce, data, nazev) {
    const start = performance.now();
    const vysledek = funkce(data);
    const konec = performance.now();
    const cas = (konec - start).toFixed(3);

    console.log(`\n${nazev}`);
    console.log(`  Velikost vstupu: ${data.length} prvků`);
    console.log(`  Počet unikátních: ${vysledek.length}`);
    console.log(`  Čas: ${cas} ms`);

    return { cas, pocetUnikatnich: vysledek.length };
}

console.log('\nGenerování testovacích dat...');
const malaData = generujData(1000);
const velkaData = generujData(50000);

console.log('\n--- MALÁ DATA (1 000 prvků) ---');
const malaArray = zmerCas(odstranitDuplicity_Array, malaData, 'Varianta 1 (Array)');
const malaSet = zmerCas(odstranitDuplicity_Set, malaData, 'Varianta 2 (Set)');

console.log('\n--- VELKÁ DATA (50 000 prvků) ---');
const velkaArray = zmerCas(odstranitDuplicity_Array, velkaData, 'Varianta 1 (Array)');
const velkaSet = zmerCas(odstranitDuplicity_Set, velkaData, 'Varianta 2 (Set)');

console.log('\n\n╔════════════════════════════════════════════════════════╗');
console.log('║         TABULKA VÝSLEDKŮ MĚŘENÍ                      ║');
console.log('╠════════════════════════════════════════════════════════╣');
console.log('║ Varianta       │ Malá data    │ Velká data           ║');
console.log(`║ Array          │ ${malaArray.cas.padEnd(12)} │ ${velkaArray.cas.padEnd(20)} ║`);
console.log(`║ Set            │ ${malaSet.cas.padEnd(12)} │ ${velkaSet.cas.padEnd(20)} ║`);
console.log('╚════════════════════════════════════════════════════════╝');

const rozdilMala = ((parseFloat(malaArray.cas) / parseFloat(malaSet.cas))).toFixed(1);
const rozdilVelka = ((parseFloat(velkaArray.cas) / parseFloat(velkaSet.cas))).toFixed(1);

console.log(`\n📊 POROVNÁNÍ:`);
console.log(`   Malá data: Array je ${rozdilMala}× pomalejší než Set`);
console.log(`   Velká data: Array je ${rozdilVelka}× pomalejší než Set`);

console.log('\n✅ Všechny testy dokončeny! Výsledky najdeš výše v konzoli.');
console.log('📋 Pro vypracování úkolu zkopíruj výstupy do README.');