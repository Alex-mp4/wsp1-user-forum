# Forum med inloggningssystem | wsp1 | Documentation

- titel: Forum
- tagline: Ett fantastiskt forum för alla
- url: N/A
- git: https://github.com/Alex-mp4/wsp1-user-forum

## 2023-03-17 (Fredag)
1. Implementerade login, register, profile och delete till forumet
2. Filer har konverterats till forumets format
3. Påbörjade att author alltid är inloggade kontot
4. Skapade en accessdenied sida för bättre flyt

Nästa gång: Jag behöver fixa att author är den som är inloggad. Dessutom ska postId vara rätt när man klickar på en post.

## 2023-03-21 (Tisdag) 
VGJS?: Sist så blandade jag ihop forumet med allt vi skapade på ALC projektet.
VSJGI?: Jag vill fixa att authorn som är inloggad automatiskt blir authorn när de gör en post under session. Om jag hinner skulle det vara trevligt om man tar sig till rätt post när den blir klickad.
VHMF...: Jadu, inte så mycket egentligen. Dock måste jag hitta ett sätt så att authorId blir det som skickas vidare till posten.

1. Authorn är den som är inloggad
2. Man tar sig till rätt post vid klick
3. Ifall man klickar på en user får man endast deras posts

Nästa gång: Fixa så att man kan se username för users

## 2023-03-24 (Fredag)
VGJS?: Nu skapas posten utefter vem som är inloggad. Ifall man klickar på en post tar man sig till endast den specifika posten. Dessutom kan man ta sig in på andras profiler för att se deras post.
VSJGI?: Tvätta data, skapa ytterliggare test, navbar ändrar ifall användaren är inloggad, användarnamn i profiler
VHMF...: Ingenting just nu. Jag vet mer eller mindre vad som pågår.

1. Navbar ändringar
2. Init. av tvättad data
3. Init. av användarnamn i profiler

Nästa gång: Fixa 2+3, kommentar system och ytterliggare test

## 2023-03-28 (Tisdag)
VGJS?: Navbar ändras beroende på om man är inloggad eller inte, jag implementerade tvätta data kod
VSJGI?: Jag vill verkligen fixa att man kan se användarnamnet i någons profil!!
VHMF...: Jag måste bara hitta rätt variabel att skicka vidare.

1. Användarnamn är nu tillgängligt vart man än går
2. Sanitized
3. Error för posts