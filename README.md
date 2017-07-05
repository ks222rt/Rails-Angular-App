# 1DV450_ks222rt  
Webbramverk  

Starta upp registrerings applikationen genom att göra såhär:  

* Clona eller ladda ner en zip av projektet  
* Öppna en lämplig terminal som har git, till exempel git shell  
* Navigera till mappen registrationApp i projekt mappen via terminalfönstret  
* Därefter starta upp lämpligt Virtual Machine program, t.ex. Oracle VirtualBox  
* Skriv 'vagrant up' i terminal fönstret där du har navigerat till registrationApp mappen  
* När den är färdig med eventuella installationer, skriv 'vagrant ssh'  
* Du är nu inloggad i den virtuella maskinen. Skriv 'cd /vagrant' och sedan 'cd /registrationApp'  
* Nu bör du vara i projekt mappen på den virtuella maskinen. Skriv 'bundle install'   
* Skriv 'rails s -b 0.0.0.0' i terminalfönstret och servern på den virtuella maskinen startar
* Prova applikationen i webläsaren på localhost:3000 

Väl inne på registreringssidan kan man logga in genom följande användare:  

*Username: admin  
*Password: admin123  

*Username: testarn  
*Password: hej123  

*Username: stoffe  
*Password: hej123  


## APIET

 För att kunna köra APIet på localhost ladda ner och installera enligt ovan beskrivning.
 
####Creator: 
 
  * username: stoffe
  * password: hej123
  

### Requests
* **http://localhost:3000/api/v1/events?order=?**
  * Anropa med en get och ange en parameter för "order" och apiet skickar tillbaka alla events sorterat på "desc" eller "asc".
* **http://localhost:3000/api/v1/events?latitude=?&longitude=?&range=?**
  * Anropa med en get och ange parameter för latitude, longitude & range för att få en lista med events som är nära positionens lat/long och inom radien "range".
* **http://localhost:3000/api/v1/events/:event_id/tags/:tag_id**
  * Anropa med en delete och ange eventets id (event_id) och taggens id (tag_id) för att ta bort en tag.
* **http://localhost:3000/api/v1/events/:event_id**
  * Anropa med en patch och ange event_id och skicka med ett data object med 
  {"name": "value", "address": "value", "zip_code": "value", "city": "value"} för att uppdetera ett event.
* **http://localhost:3000/api/v1/events?search=?**
  * Anropa med en get och ange en stad att söka på. Returnerar alla events i den staden.
* **http://localhost:3000/api/v1/tags/:tag_id/events**
  * Anropa med en get och ange tag_id för att få ut alla events baserat på en specielltagg.
* **http://localhost:3000/api/v1/creators**
  * Anropa med en post och skicka med ett data object med 
   {"firstname": "value", "lastname": "value", "username": "value", "password": "value"} för att skapa en ny creator.
* **http://localhost:3000/api/v1/events**
  * Anropa med en get för att få tillbaka alla events.
* **http://localhost:3000/api/v1/events**
  * Anropa med en post och skicka med ett data object med 
   {"name": "value", "address": "value", "zip_code": "value", "city": "value", "tags": [{"name": "value"}]} för att skapa ett event med en tagg.
* **http://localhost:3000/api/v1/events/:event_id**
  * Anropa med en get och skicka med event_id och få tillbaka ett event med det angivna id:et.
* **http://localhost:3000/api/v1/authenticate**
  * Anropa med en get och skicka i headern två variablier "username": "value" och "password": "value" för att att logga in och få en auth-token.
* **http://localhost:3000/api/v1/events/:event_id**
  * Anropa med en delete och ange event_id för att ta bort ett event och dess taggar.
* **http://localhost:3000/api/v1/events/:event_id/tags**
  * Anropa med en post och ange event_id och skicka med ett data object med {"name": "value"} för att skapa en tagg på ett event. 
* **http://localhost:3000/api/v1/events**
  * Anropa med post och skicka med ett data object med 
{"name": "value", "address": "value", "zip_code": "value", "city": "value", "tags": [{"name": "value"}]} för att skapa ett event med en tagg. För att skapa ett event utan tagg skicka med {"name": "value", "address": "value", "zip_code": "value", "city": "value"}


## Headers
För att kunna kalla på Apiets requests så måste en API-nyckel (utvecklar api-nyckel) skickas med i header. Detta gäller alla requests.
I exemplet under skall ordet "Api-key" bytas ut mot den riktiga Api-nyckel.
 * Header kan se ut såhär: 
   * headers :"Authorization: Token token=Api-key\nContent-Type: Application/json\n".  
 
För att kunna använda sig av apiets CRUD requests så måste även en auth-token skickas med som kan fås när man loggar in sig via apiet. I exemplet nedan skall "Api-key" vara den riktiga nyckeln och test & test2 bytas ut mot det riktiga username/lösenord. Tillbaka får man en auth-token som man skall skicka till CRUD funktionerna.

* För att logga in (autentisiera sig) skickas headern:
  * headers :"Authorization: Token token=Api-key\nusername: test\npassword: test2\n"
  
När man fått sin auth-token så kan man använda sig av CRUD funktionerna. I exemplet nedan skall "Api-key" bytas mot den riktiga api-nyckeln, "auth-token" skall bytas mot den riktiga auth-token.

* För att anropa CRUD funktionerna skicka headern: 
  * headers :"Authorization: Token token=Api-key\nauthtoken: auth-token\nContent-Type: Application/json\n"   

  
## ClIENTEN  

#### Ändringar i API:et  
* Lade till gemet "Rack-cors" för att kunna låte access headers mote apiet  
* Lade till URL i Tag serializern   
* Lade till latitude och longitude på Event serializer  
* Lade till mer i seedfilen  
* Ändrade så att man hämtar en "creator" på username istället för id  
* Ändrade så variabeln "tags" heter "tags_attribute" i event_params funktionen istället för "accepts_nested_attributes_for" inte hittar tags attributet annars  
* Ändrade så att när man uppdaterar ett event tas gamla tags bort först och sen läggs de nya taggsen på  
* Lade till ActiveRecord::RecordNotFound när man söker efter tags med events  
* Ändrade så att man inte kan returnera en tom array med events ifall man söker på en stad som inte finns i databasen  


#### För att köra igång applikationen  
* Ladda ner zip eller clona ner repot  
* Gör som instruktionerna längst upp för att få igång Rails APIet
* Innehållet i (SPA mappen) lägger du i valfri localhost server som till exempel (WAMP eller EasyPHP)  
* Starta servern och surfa in på den localhosten som (wamp eller easyPHP) tillger dig  
* Ready to go  


### Motförmodan fel i seeden  
* Är det inget i seeden/databasen så får man i terminalfönstret där Rails APIet körs skriva "rake db:setup"  
* Sedan gå in på localhost:3000/ och logga in med   
* username: stoffe  
* password: hej123  
* Och plocka API-nyckeln som finns där och kopiera den  
* Och klistra in den i app_route.js i client mappen  


## Till exeminator  

Första delen var en registreringsapplikation där en användare kan skapa ett konto och få ut en eller flera api-nycklar. Finns även tillgång för en admin att logga in och plocka bort användare som inte sköter sig.  

I andra delen skapades ett restAPI som hanterar events med taggningar. Kallar det events då det egentligen kan vara precis vad som helst som en användare vill skapa och i mitt fall blev det pubar i clienten. Apiet kan skapa/ändra och ta bort events och lägga till taggar på eventsen, man kan även ta bort taggar från befintliga events. Via anrop kan man få ut ett event eller flera events, men även events som har en särskild tagg. Via en sökquery kan man söka pubar efter städare eller longitud/latitude, men även på en "creators" events. 

I tredje och sista delen skapade jag en client som listar pubar jag har besökt och tyckt skall finnas med på clienten. Startsidan visar alla pubar i en lista och på en karta, trycker man på en pub får man upp information om den. Man kan sortera efter ordning (desc/asc), sortera pubar efter taggar och även söka på städer. Som inloggad användare kan man skapa en ny pub, med eller utan taggar, och du kan ändra eller ta bort befintliga pubar. 

Kursen har varit väldigt rolig och givade, dock väldigt krävande. Det har varit mycket att lära sig och göra i varje labb och med tanke på att webprojekt 1 kördes samtidigt och tog mycket tid fick man lägga en hel del kvällar för att få ihop allt, men i slutändan var det roligt att göra labbarna och man har lärt sig mycket. Dock har jag inte i de två första delarna gjort någon extra funktionell del utan har gjort det som krävs för godkänt.  
I den tredje uppgiften implementerade jag så att man kan skapa taggar i samband med när användaren skapar en händelse och även när man uppdaterar en händelse kan man lägga till flera taggar.  

Tycker Rails och angular har varit riktigt roligt att lära mig och kommer testa det mer i framtiden.  
