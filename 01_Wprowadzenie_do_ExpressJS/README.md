![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


# Pierwsza aplikacja serwerowa w ExpresJS

Zaczęliśmy dziś przygodę z frameworkiem Express.js. Aby przygotować się do pracy w dalszej części tygodnia, spróbujmy sami uruchomić naszą pierwszą serwerową aplikację.

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

# Zadanie 1

W pliku `app.js`, który uruchomisz skryptem `node app.js` umieść swoje rozwiązanie.

Twoim zadaniem jest stworzenie prostej aplikacji serwerowej, która wyświetli użytkownikowi `Hello World` pod adresem `http//:localhost:3000/`

**Pamiętaj o zaimportowaniu Express.js i stworzeniu jego instancji!**


# Podstawowy routing i POSTMAN

Aby sprawnie poruszać się w świecie tworzenia aplikacji musimy znać dostępne narzędzie i umieć z nich korzystać. Dlatego przy okazji ćwiczenia podstaw mechanizmu routing w aplikacjach serwerowych, przetestujemy działanie aplikacji POSTMAN.

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

# Zadanie 1

W pliku `app.js`, który uruchomisz skryptem `node app.js` umieść swoje rozwiązanie.

1. Dla ścieżki `/test` w adresie `http://localhost:3000/test` stwórz request handler dla kilku z metod HTTP tj. `GET`, `PUT`, `POST`, `DELETE`. W każdej z odpowiedzi zwróć inną wiadomość.
2. Zainstaluj aplikację **POSTMAN** i wykorzystując utworzone wcześniej funkcje obsługi zapytań sprawdź jakie dane zostają zwracane jeśli dla tej samej ścieżki - `/test` zmieniamy tylko metodę zapytania tj. `GET`, `PUT`, `POST`, `DELETE`.
3. Stwórz request handler dla każdej z metod `GET`, `PUT`, `POST`, `DELETE`, tym razem zmieniając także ścieżki np. (`/about`, `/book`, etc.) i oczywiście zwracane wiadomości.
4. Używając aplikacji **POSTMAN**, sprawdź dodane ścieżki.
5. Przetestuj co się stanie, jeśli spróbujesz wpisać kombinację ścieżka + metoda, dla której nie istnieje request handler (funkcja obsługi zapytania).


# Debugowanie

Jedną z podstawowych metod odnajdywania i naprawiania błędów jest logowanie stanów aplikacji i odczytywanie z tych logów istotnych dla nas, developerów informacji. Zanim nauczymy się pisać skomplikowane aplikacje serwerowe, powinniśmy poznać narzędzia, które pomogą nam je utrzymać.

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

# Zadanie 1

W pliku `app.js`, który uruchomisz skryptem `node app.js` umieść swoje rozwiązanie.

1. Stwórz prostą aplikację serwerową, a w niej kilka funkcji obsługujących dowolne zapytania.
2. Zaimportuj moduł `debug` i nazwij przestrzeń logowania np. `const debugMyApp = debug('app')`
3. W każdej z funkcji obsługującej zapytania wyloguj dowolną wiadomość przy użyciu `debugMyApp('important data here')`
4. Uruchom serwer za pomocą `node app.js`
5. Przy pomocy narzędzia POSTMAN lub przeglądarki wysyłaj odpowiednie żądania i zobacz czy Twoje logi są widoczne w konsoli
6. Uruchom serwer w następujący sposób:
   - dla systemów Unix, macOS: `DEBUG=* node app.js`
   - dla systemu Windows i konsoli powershell: `$env:DEBUG='*';node app.js`
7. Przy pomocy narzędzia POSTMAN lub przeglądarki wysyłaj odpowiednie żądania i zobacz czy Twoje logi są widoczne w konsoli. Czy coś się zmieniło?
8. A teraz uruchom serwer jeszcze trochę inaczej:
   - dla systemów Unix, macOS: `DEBUG=app node app.js`
   - dla systemu Windows i konsoli powershell: `$env:DEBUG='app';node app.js`
9. Przy pomocy narzędzia POSTMAN lub przeglądarki wysyłaj odpowiednie żądania i zobacz czy Twoje logi są widoczne w konsoli. Czy tym razem coś się zmieniło?


# Serwowanie statycznych plików - zadanie dodatkowe

Bardzo szybko przekonasz się, że przy tworzeniu aplikacji serwerowych przydaje się umiejętność serwowania statycznych plików. Zobaczmy więc jak to działa w praktyce już teraz.

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

W pliku `app.js`, który uruchomisz skryptem `node app.js` umieść swoje rozwiązanie.

# Zadanie 1

1. Stwórz prostą aplikację serwerową, obsługującą tylko metodę `GET` na ścieżce `http://localhost:3000/`
2. W folderze bootstrap stwórz prosty plik `index.html`.
3. Spróbuj zaserwować ten statyczny plik przy pomocy metody `res.sendFile(path.resolve('index.html'))`, pamiętaj o tym, że ścieżka do pliku musi być absolutna.

# Zadanie 2

1. Stwórz prostą aplikację serwerową, obsługującą tylko metodę `GET` na ścieżce `http://localhost:3000/`
2. Stwórz folder `public` i umieść tam plik `index.html`
3. Używając gotowego middleware tj. `app.use(express.static('public'))` zaserwuj statyczne pliki z tego folderu i zobacz co się zmieniło.
