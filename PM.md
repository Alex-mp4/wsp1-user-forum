# Forum MK-II | wsp1 | Post Mortem 

- titel: User Forum
- tagline: Du kommer aldrig behöva ett annat forum!
- url: https://crystalline-sun-gambler.glitch.me/
- git: https://github.com/Alex-mp4/wsp1-node-intro

## Inledning
Syftet med denna uppgift var att blanda ihop två tidigare projekt för att skapa det största och bästa forumet. Det vill säga; det första forumet skapat i början av webbserverprogrammeringskursen samt login projektet skapat i grupp. Dessutom läggs det på ytterligare funktioner allt-eftersom vid behov, så som att kunna klicka på posts, profiler samt att ha varsin profilbild. Detta arbete slutför kursen och beprövar våran kunskap med node, npm, express och allt därimellan.

## Bakgrund
Bakgrunden till projektet går egentligen längre än den första commit:en. På grund av att basen skapades utifrån tidigare projekt kunde jag klona majoriteten av koden och anpassa den till uppbyggnaden av existerande kod från Jens git-projekt "user-forum". Detta hände först och därefter anpassades kod från login-projektet, främst kopierad med vissa ändringar i formen av namn eller variabler. För att koppla dessa projekt krävdes det mest ändringar till den underliggande HTML koden i views, då "login.njk", "logout.njk" och "register.njk" (för att ta några exempel) inte fanns innan. Genom att skapa länkar mellan viewsen var båda projekten in princip sömlöst intryckta in i varandra för att skapa "user-forum".

Mycket av funktionerna jag la till krävde ändringar i MySQL kod. De krävde främst kopplingar mellan user databasen med forum databasen. Med det i åtanke kunde de förstå att authorId och users var kopplade med nummer. Då fungerade det att anpassa länken till posts med rätt postId. Av samma anledning kan användare gå in på andra users och granska alla deras post utöver andra användares posts på forumet. Sedan anpassades users med ett fält för profilbilder. Denna funktion fungerar endast för users och posts eftersom forumets SQL kod är annorlunda skrivet.

## Negativa erfarenheter
Att skriva SQL kod var det svåraste med arbetet eftersom upplägget var annorlunda jämfört med kod jag har bekantat mig med genom åren. Detta kommer nog inte vara ett långdraget problem, och dessutom är Google våran bästa hjälp för sådant. Av denna anledning finns det tillfällen där flera queries är på rad då de egentligen kan bildas till en enstaka query ifall koden var skriven på ett annorlunda sätt.

## Positiva erfarenheter
Att använda gammal kod och skapa nya funktioner med dem fungerade ganska galant. Jag förstod hur jag kunda anpassa databasen med routes och därför kunde jag hitta buggar eller komma på sätt att skapa nya funktioner på egen hand. Allt-i-allt var projektet kul att hålla på med och jag är nöjd med resultatet.

## Sammanfattning
Jag har skapat ett program som använder sig utav två gamla projekt för det ultimata forumet. Användare kan skapa ett konto, logga in och skapa en post. Majoriteten av arbetet kändes lätt men ändå kunde jag lära mig saker från varenda kod-snutt.