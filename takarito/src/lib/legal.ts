import { AUTHORITY, COMPANY, EMAIL, HOSTING, RETENTION_MONTHS } from "./site";
import { CONSENT_COOKIE as CONSENT_NAME } from "./consent";

/**
 * The text of the privacy notice and the cookie notice.
 *
 * Written from what this site actually does, which can be read off the code:
 * one cookie (the consent record), no analytics, no advertising, and one form
 * whose fields are listed below and which is delivered by email. If any of
 * that changes — a tracking tag, a newsletter, a booking system — these pages
 * have to change with it.
 *
 * A template, not legal advice: have it read by someone qualified before the
 * site goes live.
 */

export type LegalSection = {
  heading: string;
  body: readonly string[];
  list?: readonly string[];
};

export const PRIVACY = {
  title: "Adatkezelési tájékoztató",
  lead: `Ez a tájékoztató leírja, milyen személyes adatokat kezelünk, amikor Ön a weboldalunkat használja vagy ajánlatot kér tőlünk, mire használjuk őket, meddig őrizzük, és milyen jogai vannak. A tájékoztató az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) és az információs önrendelkezési jogról szóló 2011. évi CXII. törvény (Infotv.) alapján készült.`,
  sections: [
    {
      heading: "1. Az adatkezelő",
      body: [
        `${COMPANY.legalName} (székhely: ${COMPANY.seat}; cégjegyzékszám: ${COMPANY.registryNumber}; adószám: ${COMPANY.taxNumber}; e-mail: ${EMAIL}).`,
        "Adatvédelmi tisztviselő kinevezésére nem vagyunk kötelesek. Adatkezeléssel kapcsolatos kérdéseit a fenti e-mail címre küldheti.",
      ],
    },
    {
      heading: "2. Ajánlatkérés és kapcsolatfelvétel",
      body: [
        "Amikor kitölti az ajánlatkérő űrlapot, írásban vagy telefonon megkeres minket, az alábbi adatokat kezeljük:",
      ],
      list: [
        "név, e-mail cím — kötelező, hogy válaszolni tudjunk;",
        "telefonszám — nem kötelező, ha telefonon is kereshetjük;",
        "a kért szolgáltatás, az alapterület és a település — az ár kiszámításához;",
        "az üzenet tartalma, valamint a beküldés időpontja.",
      ],
    },
    {
      heading: "3. Az adatkezelés célja és jogalapja",
      body: [
        "Cél: az ajánlatkérés megválaszolása, árajánlat adása, időpont egyeztetése, és ha megrendeli a szolgáltatást, annak teljesítése.",
        "Jogalap: a szerződés megkötését megelőző lépések megtétele az Ön kérésére, illetve a szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont). Ha a megrendelésből számla készül, annak megőrzése jogi kötelezettség (GDPR 6. cikk (1) c) pont, a számvitelről szóló 2000. évi C. törvény 169. §).",
      ],
    },
    {
      heading: "4. Meddig őrizzük az adatokat",
      body: [
        `Ha az ajánlatkérésből nem lesz megrendelés, az adatokat legfeljebb ${RETENTION_MONTHS} hónapig őrizzük, utána töröljük. Ha megrendelés lesz, a szerződéshez kapcsolódó adatokat a szerződés megszűnésétől számított 5 évig (a polgári jogi elévülési idő), a számlákat a jogszabály szerint 8 évig őrizzük.`,
        "Kérésére az adatait korábban is töröljük, ha megőrzésüket jogszabály nem írja elő.",
      ],
    },
    {
      heading: "5. Kik férnek hozzá az adatokhoz (adatfeldolgozók)",
      body: [
        "Az adatokhoz csak a munkatársaink férnek hozzá, akiknek az ajánlat elkészítéséhez vagy a munka elvégzéséhez szükségük van rá. Adatait nem adjuk el, és nem adjuk át harmadik félnek marketingcélra.",
        "A weboldal működéséhez az alábbi adatfeldolgozókat vesszük igénybe:",
      ],
      list: [
        `tárhely: ${HOSTING.name} (${HOSTING.address}) — a weboldal kiszolgálása; a szerver naplóiban a látogató IP-címe rövid ideig, biztonsági célból tárolódhat;`,
        "e-mail kézbesítés: Resend Inc. (USA) — az űrlap tartalmát e-mailben juttatja el hozzánk;",
        "e-mail fiók szolgáltatója — ahol a beérkezett leveleket fogadjuk.",
      ],
    },
    {
      heading: "6. Adattovábbítás az EU-n kívülre",
      body: [
        "A tárhely- és e-mail szolgáltatók egyesült államokbeli cégek. Az adattovábbítás az EU–USA adatvédelmi keretrendszer (Data Privacy Framework) szerinti megfelelőségi határozat, illetve az Európai Bizottság általános szerződési feltételei (GDPR 46. cikk) alapján történik.",
      ],
    },
    {
      heading: "7. Sütik",
      body: [
        `A weboldal egyetlen saját sütit használ (${CONSENT_NAME}), amely a süti-választását jegyzi meg. Statisztikai vagy marketing sütit csak az Ön kifejezett hozzájárulásával töltenénk be — jelenleg ilyet nem használunk. Részletek a süti tájékoztatóban.`,
      ],
    },
    {
      heading: "8. Az Ön jogai",
      body: ["Az adatkezeléssel kapcsolatban Önt az alábbi jogok illetik meg:"],
      list: [
        "hozzáférés: tájékoztatást kérhet arról, milyen adatát kezeljük, és másolatot kérhet róluk (GDPR 15. cikk);",
        "helyesbítés: kérheti a pontatlan adatok javítását (16. cikk);",
        "törlés: kérheti adatai törlését (17. cikk);",
        "korlátozás: kérheti az adatkezelés korlátozását (18. cikk);",
        "adathordozhatóság: kérheti adatai géppel olvasható formában való kiadását (20. cikk);",
        "tiltakozás: tiltakozhat az adatkezelés ellen (21. cikk).",
      ],
    },
    {
      heading: "9. Hogyan élhet a jogaival",
      body: [
        `Kérelmét a ${EMAIL} címre küldheti. Legfeljebb egy hónapon belül válaszolunk; ha a kérelem összetett, ez a határidő további két hónappal meghosszabbodhat, amiről értesítjük. A kérelem teljesítése díjmentes.`,
      ],
    },
    {
      heading: "10. Panasz és jogorvoslat",
      body: [
        `Ha úgy érzi, hogy megsértettük az adatvédelmi jogait, kérjük, először keressen minket — igyekszünk gyorsan rendezni. Panaszt tehet a felügyeleti hatóságnál is: ${AUTHORITY.name}, ${AUTHORITY.address}; ${AUTHORITY.web}; ${AUTHORITY.email}.`,
        "Jogai megsértése esetén bírósághoz is fordulhat; a pert lakóhelye vagy tartózkodási helye szerinti törvényszék előtt is megindíthatja.",
      ],
    },
    {
      heading: "11. Adatbiztonság",
      body: [
        "A weboldal titkosított (HTTPS) kapcsolaton keresztül érhető el, az űrlap adatai titkosítva jutnak el hozzánk. Az adatokhoz csak az fér hozzá, akinek a munkájához szükséges.",
      ],
    },
    {
      heading: "12. A tájékoztató módosítása",
      body: [
        "Ha az adatkezelésünk változik, ezt a tájékoztatót frissítjük. A mindenkori változat ezen az oldalon érhető el.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;

export const COOKIE_POLICY = {
  title: "Süti (cookie) tájékoztató",
  lead: "A sütik kis szöveges fájlok, amelyeket a weboldal az Ön böngészőjében tárol. Ez az oldal a lehető legkevesebbet használ belőlük.",
  sections: [
    {
      heading: "Milyen sütiket használunk",
      body: [
        `Egyetlenegyet: a ${CONSENT_NAME} nevű sütit, amely azt jegyzi meg, hogy elfogadta-e a statisztikai és marketing sütiket. Feltétlenül szükséges, ezért hozzájárulás nélkül is beállítható (az elektronikus hírközlésről szóló 2003. évi C. törvény 155. § (4) bekezdése). Élettartama 6 hónap, utána újra megkérdezzük.`,
        "Nem tartalmaz személyes adatot — csak két számjegyet, a két választását.",
      ],
    },
    {
      heading: "Statisztikai és marketing sütik",
      body: [
        "Jelenleg nem használunk ilyet: nincs látogatottságmérés, nincs hirdetési követés, nincs közösségimédia-beágyazás. Ha a jövőben bevezetünk ilyet, csak akkor töltjük be, ha Ön a süti-beállításokban engedélyezi, és ezt a tájékoztatót is frissítjük.",
      ],
    },
    {
      heading: "Harmadik felek",
      body: [
        "A betűtípusokat a saját szerverünkről töltjük be, így a látogatása során nem kerül adat a Google-hoz vagy más külső szolgáltatóhoz.",
      ],
    },
    {
      heading: "Hogyan változtathat a döntésén",
      body: [
        "Bármikor megváltoztathatja a választását az oldal bal alsó sarkában lévő süti gombbal vagy a lábléc „Süti beállítások” linkjével. A sütiket a böngésző beállításaiban is törölheti.",
      ],
    },
  ] satisfies readonly LegalSection[],
} as const;
