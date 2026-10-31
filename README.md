# Football Clubs Dataset

Ovaj otvoren skup podataka drži podatke o europskim nogometnim klubovima, njihovim stadionima i osvojenim 
trofejima. Podaci su organizirani u tri zasebne kolekcije - `stadiums`, `football_clubs` i `trophies`.

Skup podataka obuhvaća 12 nogometnih klubova, 11 stadiona i 34 zapisa o osvojenim trofejima. Za svaki
klub dostupni su podaci o:
* nazivu kluba
* gradu i državi kluba
* godini osnutka
* ligi u kojoj klub trenutačno igra
* nadimku kluba
* bojama koje opisuju klub
* maskotama kluba
* poveznica na službene stranice kluba
* podaci o stadionu na kojem klub igra (ime, grad, državu i kapacitet)
* podaci o najznačajnijim trofejima koje je klub kroz svoju povijest osvojio (naziv i količina)
* datumu i vrijeme kada su podaci zadnji put osvježeni

Svaki nogometni klub povezan je s jednim stadionom, dok jedan stadion može biti povezan s više klubova.
Svaki zapis o trofeju povezan je s jednim nogometnim klubom, a klub može imati više osvojenih trofeja.
Povezivanje kolekcija ostvareno je pomoću `ObjectId` identifikatora.

Podaci su pohranjeni u MongoDB bazi podataka, a dostupni su i u CSV i JSON formatima.

## Formati datoteka i posebnosti

### CSV
Datoteka `football_clubs.csv` sadrži 16 stupaca i 34 reda podataka.
Budući da klub može imati više trofeja, podaci o klubu i stadionu ponavljaju se kroz više redaka.
Atributi koji sadrže nizove vrijednosti poput boja kluba i maskota zapisani su u jednom stupcu,
odvojeni graničnikom "|". Prazni stupci predstavljaju nedostupne ili nedefinirane vrijednosti.

### JSON
Datoteka `football_clubs.json` sadrži 12 objekata pri čemu svaki od njih predstavlja jedan klub.
Podaci su organizirani hijerarhijski:
* klub je roditelj i osnovni podaci o klubu nalaze se na najvišoj razini
* podaci o stadionu na kojem klub igra domaće utakmice nalaze se u ugniježđenom objektu `stadium`
* podaci o osvojenim trofejima kluba nalaze se u polju `trophies` koje sadrži niz objekata

### MongoDB dump
MongoDB dump baze podataka sadrži podatke iz sve tri kolekcije u BSON formatu, zajedno s pripadajućim
metapodacima. Time je omogućena ponovna uspostava baze podataka.

## Metapodaci

| Metapodatak | Vrijednost |
|---|---|
| Naziv skupa podataka | Football Clubs Dataset |
| Autor | Marko Fuček |
| Verzija | 1.0 |
| Datum objave podataka | 31.10.2026. |
| Jezik | engleski |
| Formati podataka | CSV, JSON, BSON |
| Baza podataka | MongoDB |
| Licencija programskog koda | MIT License |
| Licencija podataka | CC BY 4.0 |
| Kategorije | Nogometni klubovi, nogometni stadioni, nogometni trofeji |
| Datum posljednjeg ažuriranja podataka | 31.10.2026. |

## Licencije
Skup podataka sadrži informacije prikupljene s različitih javnih izvora.

Pripadni programski kod za opis i kreiranje baze podataka te manipulaciju formatima
skupa podataka objavljen je pod licencijom **MIT License** (https://opensource.org/license/mit).

Skup podataka objavljen je pod licencijom **Creative Commons Attribution 4.0 International License (CC BY 4.0)** (https://creativecommons.org/licenses/by/4.0/).