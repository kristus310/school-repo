// Filmy
const filmy = [
    { nazev: "Pelíšky", reziser: "Jan Hřebejk", rok: 1999, cena: 149, zanr_kod: "K" },
    { nazev: "Vratné lahve", reziser: "Jan Svěrák", rok: 2007, cena: 199, zanr_kod: "K" },
    { nazev: "Želary", reziser: "Ondřej Trojan", rok: 2003, cena: 179, zanr_kod: "D" },
    { nazev: "Šarlatán", reziser: "Agnieszka Holland", rok: 2020, cena: 299, zanr_kod: "H" },
    { nazev: "Osmy", reziser: "Petr Václav", rok: 2011, cena: 159, zanr_kod: "D" },
    { nazev: "Čertí brko", reziser: "Martin Frič", rok: 1945, cena: 99, zanr_kod: "P" },
    { nazev: "Divided We Fall", reziser: "Jan Hřebejk", rok: 2000, cena: 169, zanr_kod: "D" },
    { nazev: "Ztracená tvář", reziser: "Jiří Mádl", rok: 2016, cena: 249, zanr_kod: "T" }
];

console.log("=".repeat(60));
console.log("PŮVODNÍ DATA - VŠECHNY FILMY");
console.log("=".repeat(60));
console.table(filmy);

// Žánry
const zanry = {
    K: "Komedie",
    D: "Drama",
    H: "Historický",
    P: "Pohádka",
    T: "Thriller"
};

console.log("\n" + "=".repeat(60));
console.log("SLOVNÍK ŽÁNRŮ (Object)");
console.log("=".repeat(60));
console.log(zanry);

// Režiséři
const unikatniReziseri = new Set(filmy.map(film => film.reziser));

console.log("\n" + "=".repeat(60));
console.log("SET - JEDINEČNÉ REŽISÉŘI");
console.log("=".repeat(60));
console.log("Počet unikátních režisérů:", unikatniReziseri.size);
console.log("Seznam:");
unikatniReziseri.forEach(reziser => console.log(`  - ${reziser}`));

// Searching podle názvu
const filmyMap = new Map();
filmy.forEach(film => {
    filmyMap.set(film.nazev, film);
});

console.log("\n" + "=".repeat(60));
console.log("MAP - RYCHLÉ DOHLEDÁNÍ FILMU");
console.log("=".repeat(60));
console.log("Počet filmů v Map:", filmyMap.size);
console.log("Klíče (názvy filmů):", Array.from(filmyMap.keys()));

// Filtrace od roku 2010
const filmyOd2010 = filmy.filter(film => film.rok >= 2010);

console.log("\n" + "=".repeat(60));
console.log("FILTRACE - FILMY OD ROKU 2010");
console.log("=".repeat(60));
console.log(`Nalezeno ${filmyOd2010.length} filmů:`);
console.table(filmyOd2010);

// Doplnění žárnu
const filmySDoplnenymZanrem = filmyOd2010.map(film => ({
    ...film,
    zanr_nazev: zanry[film.zanr_kod] || "Neznámý žánr"
}));

console.log("\n" + "=".repeat(60));
console.log("PŘEVOD - DOPLNĚNÍ PLNÉHO NÁZVU ŽÁNRU");
console.log("=".repeat(60));
console.table(filmySDoplnenymZanrem);

// Statistiky cen
const ceny = filmyOd2010.map(film => film.cena);
const soucetCen = ceny.reduce((suma, cena) => suma + cena, 0);
const prumernaCena = Math.round(soucetCen / ceny.length);
const minCena = Math.min(...ceny);
const maxCena = Math.max(...ceny);

console.log("\n" + "=".repeat(60));
console.log("AGREGACE - STATISTIKY CEN (filmy od 2010)");
console.log("=".repeat(60));
console.log(`Průměrná cena: ${prumernaCena} Kč`);
console.log(`Nejnižší cena: ${minCena} Kč`);
console.log(`Nejvyšší cena: ${maxCena} Kč`);
console.log(`Celkový součet: ${soucetCen} Kč`);

// Vyhledání
console.log("\n" + "=".repeat(60));
console.log("VYHLEDÁVÁNÍ");
console.log("=".repeat(60));

// Existence filmu daného režiséra
const hledanyReziser = "Jan Hřebejk";
const filmyRezisera = filmy.filter(film => film.reziser === hledanyReziser);
console.log(`\nFilmy režiséra "${hledanyReziser}":`);
if (filmyRezisera.length > 0) {
    filmyRezisera.forEach(film => {
        console.log(`  ✓ ${film.nazev} (${film.rok})`);
    });
} else {
    console.log(`  ✗ Žádný film nenalezen`);
}

// Existence filmu podle názvu
const hledanyNazev = "Želary";
const existuje = filmy.some(film => film.nazev === hledanyNazev);
console.log(`\nExistuje film "${hledanyNazev}"? ${existuje ? "✓ ANO" : "✗ NE"}`);

// Detail filmu z Map podle názvu
const nazevProMap = "Šarlatán";
const detailFilmu = filmyMap.get(nazevProMap);
console.log(`\nDetail filmu "${nazevProMap}" z Map:`);
if (detailFilmu) {
    console.log(detailFilmu);
    console.log(`  • Režisér: ${detailFilmu.reziser}`);
    console.log(`  • Rok: ${detailFilmu.rok}`);
    console.log(`  • Cena: ${detailFilmu.cena} Kč`);
    console.log(`  • Žánr: ${zanry[detailFilmu.zanr_kod]}`);
} else {
    console.log("  ✗ Film nenalezen v Map");
}

// Třídění podle názvu
const filmySerazenePoNazvu = [...filmy].sort((a, b) =>
    a.nazev.localeCompare(b.nazev, 'cs')
);

console.log("\n" + "=".repeat(60));
console.log("TŘÍDĚNÍ - PODLE NÁZVU (české pořadí)");
console.log("=".repeat(60));
filmySerazenePoNazvu.forEach((film, index) => {
    console.log(`${index + 1}. ${film.nazev}`);
});

// Třídění podle roku
const filmySerazenePoRoku = [...filmy].sort((a, b) => b.rok - a.rok);

console.log("\n" + "=".repeat(60));
console.log("TŘÍDĚNÍ - PODLE ROKU (od nejnovějšího)");
console.log("=".repeat(60));
filmySerazenePoRoku.forEach(film => {
    console.log(`${film.rok} - ${film.nazev} (${film.reziser})`);
});

// Třídění podle ceny
const filmySerazenePoCene = [...filmy].sort((a, b) => a.cena - b.cena);

console.log("\n" + "=".repeat(60));
console.log("TŘÍDĚNÍ - PODLE CENY (od nejlevnějšího)");
console.log("=".repeat(60));
filmySerazenePoCene.forEach(film => {
    console.log(`${film.cena} Kč - ${film.nazev}`);
});

// Souhrn
console.log("\n" + "=".repeat(60));
console.log("ZÁVĚREČNÝ SOUHRN");
console.log("=".repeat(60));
console.log(`📊 Celkový počet filmů: ${filmy.length}`);
console.log(`👥 Počet unikátních režisérů: ${unikatniReziseri.size}`);
console.log(`🎬 Filmy od roku 2010: ${filmyOd2010.length}`);
console.log(`💰 Průměrná cena: ${prumernaCena} Kč`);
console.log(`🎯 Nejdražší film: ${filmySerazenePoCene[filmySerazenePoCene.length - 1].nazev} (${maxCena} Kč)`);
console.log(`💵 Nejlevnější film: ${filmySerazenePoCene[0].nazev} (${minCena} Kč)`);
console.log("=".repeat(60));
console.log("✅ Úkol dokončen! Všechny požadavky splněny.");
console.log("=".repeat(60));