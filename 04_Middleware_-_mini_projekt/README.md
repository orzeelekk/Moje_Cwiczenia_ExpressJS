![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


# Zewnętrze middleware

Poznaliśmy w tym tygodniu bardzo wiele użytecznych funkcjonalności, które ułatwią nam pracę i tworzenie serwerowych aplikacji w ExpressJS. Dzisiejsze zadania przybliżą nam koncept zewnętrznych funkcji middleware oraz pokażą jak odpytywać nasz serwis poprzez aplikacje kliencką (front-end) przy użyciu `Fetch API`.

## Wstęp do zadań

Naszym zadaniem jest stworzenie aplikacji serwerowej, która zwraca zasoby (katalog książek), modyfikuje je, tworzy nowe obiekty i usuwa już istniejące. Tak zaprojektowany system będziemy łączyć z aplikacją kliencką i odpytywać o zasoby, zapewniając komunikację między dwoma osobnymi aplikacjami. W aplikacji serwerowej dodamy także kilka zewnętrznych middleware i przetestujemy ich działanie. To zaczynajmy!

W folderze `fe-projekt/books` znajduje się osobna aplikacja kliencka (frontend), napisana przy pomocy biblioteki `lit-html`. W jej skład wchodzą pliki `index.html`, który jest startową stroną aplikacji, style css w folderze `styles` oraz pliki JavaScript w folderze `js`.

W pliku `modal.js` znajduje się template do okna dialogowego, wyświetlanego w aplikacji.

W pliku `books-state.js` znajduje się obiekt stanu aplikacji, odpowiedzialny za całą jej logikę, tj. trzymanie oraz przetwarzanie danych, notyfikacje o zmianie stanu aplikacji, etc.

Do tych plików tylko zajrzyj. Nie będzie potrzeby ich modyfikacji w tym ćwiczeniu.

Plik `index.js` jest startowym plikiem aplikacji. Tworzy widoki, tworzy obiekt stanu i wykonuje pierwsze zapytanie o dane. W tym pliku być może będziesz zmieniać adres serwera, jeśli zdecydujesz się postawić go na porcie innym niż `3000`

```javascript
new ApiService('http://localhost:3000');
```

Plik `api-service.js` interesuje nas najbardziej. To w nim będziemy tworzyć zapytania do naszego serwisu, korzystając przy tym z `Fetch API`.

**Aby aplikacja działała poprawnie należy w folderze `fe-project/books` wykonać instrukcję `npm install` w konsoli.**

W folderze `fe-project` znajdziesz plik `app.js`. Tworzymy w nim serwer ExpressJS i będziemy serwować naszą aplikację kliencką (front-end).
Jeśli tego nie zmienisz, aplikacja będzie działała na porcie `3001`.

**Tutaj także potrzebne jest wywołanie `npm install` w konsoli. Serwer uruchom za pomocą komendy `npm run start`.**

Stworzona w projekcie aplikacja kliencka jest tylko prostym przykładem. Najlepiej działa w przeglądarce Chrome (jak chyba wszystko) .

W folderze `booksAPI` znajduje się szkielet aplikacji serwerowej, którą będziemy tworzyć. W katalogu `data_storage` znajduje się plik `books.json` z danymi, na których będziemy pracować.

W folderze `routers` znajduje się plik, w którym będziemy tworzyć osobny obiekt typu `Router` naszej aplikacji.

W folderze `utils` w pliku `utils.js` znajduje się szkielet dwóch funkcji pomocniczych, które będziemy uzupełniać.

Plik `app.js` to plik wejściowy naszej aplikacji, w którym utworzony jest prosty serwer ExpressJS nasłuchujący na porcie `3000`.

**Pamiętaj o komendzie `npm install` w konsoli. Aby uruchomić aplikacje wpisz `npm run start`.**

Zwróć uwagę, że zadanie zakłada komunikację między dwiema aplikacjami serwerowymi. Obie muszą nasłuchiwać równocześnie, by mogły wymieniać dane.

Skoro wstęp mamy już za sobą, to zacznijmy zadania.

## Zadanie 1

W pliku `booksAPI/utils/utils.js` znajdują się szkielety dwóch funkcji. Jedna będzie odczytywać dane z pliku `booksAPI/data_storage/books.json`, a druga do niego zapisywać. Pamiętaj aby odczyt i zapis do pliku były asynchroniczne. Użyj funkcji `writeFile` do zapisywania danych do pliku i podmieniaj całą zawartość.

## Zadanie 2

W pliku `/books.js` stwórz prosty router dla ścieżki `/books`. Obsłuż zapytanie `GET /books`, które zwraca `json` ze wszystkimi książkami na liście jeśli pobieranie danych powiodło się. Jeśli coś poszło nie tak ustaw status na `500` i wywołaj funkcję `next(err)`. Wykorzystaj do tego stworzone w poprzednim zadaniu funkcje.

Użyj stworzony router w pliku `app.js`.

## Zadanie 3

Dodaj middleware obsługujące błędy dla obiektu typu `Router` z pliku `books.js`.

## Zadanie 4

Obsłuż metody `PUT /books/:id`, `POST /books/:id` oraz `DELETE /books/:id` pozwalające na modyfikację obiektu książka, dodawanie nowej książki oraz usuwanie już istniejącej. Możesz pomóc sobie wykorzystując metodę `router.param` do sprawdzania czy książka, którą chcemy modyfikować lub usuwać istnieje, bądź czy dodawana przez nas książka nie znajduje się już na liście. Wyjątek przekazuj do funkcji `next(err)`.

```javascript
router.param('id', async (req, res, next, id) => {
  try {
    const book; // get data, find book, maybe add to req.book if necessary
    const index; // find index, it will be easier to delete

  } catch (err) {
    next(err);
  }
});
```

Do projektu dodaj moduł `body-parser` w taki sposób aby metoda HTTP `PUT` przyjmowała obiekt `req.body` w formacie `x-www-form-urlencoded`, a metoda `POST` zwykły `JSON`.

## Zadanie 5

W aplikacji klienckiej a w pliku `api-service.js` uzupełnij funkcje `booksGetRequest`, `booksDeleteRequest`, `booksPutRequest`, `booksPostRequest` w taki sposób aby wykonywały poprawne zapytania do Twojego serwisu.

Pamiętaj o różnych formatowaniach `body` dla metod `POST` oraz `PUT`. Aby poprawnie sformatować `x-www-form-urlencoded` użyj klasy `URLSearchParams` opisywanej w pierwszym artykule.

Uzupełniane przez Ciebie metody są już wywoływane wewnątrz aplikacji klienckiej. Aplikacja zacznie wyświetlać dane w przeglądarce i działać poprawnie tak szybko jak uzupełnisz funkcje `fetch` adresem i opcjami.

## Zadanie 6

Do projektu aplikacji serwerowej dodaj zewnętrzne middleware do logowania informacji o zapytaniach `morgan`. Przetestuj różne opcje i zdecyduj się na jedną z nich.

## Zadanie 7

Skompresuj każde z zapytań używając do tego modułu `compression`. Sprawdź odpowiednie nagłówki, aby zobaczyć czy dane obiektu `res` faktycznie są kompresowane.

Jeśli masz ochotę dla niektórych zapytań ustaw filtr, który pozwoli pominąć ich kompresję. Możesz to zrobić za pomocą funkcji filtra. Pamiętaj, że musisz ustawić wtedy odpowiedni nagłówek w aplikacji klienckiej.

```javascript
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};
```

## Zadanie 8

Dodaj mechanizm `CORS` do Twojej aplikacji. Pamiętaj aby w opcjach dodać jako `origin` cały adres aplikacji klienckiej:

```javascript
const corsOptions = {
  origin: 'http://localhost:3001',
};
```

Ustaw takie opcje, aby umożliwić przesyłanie ciasteczek między aplikacjami.

## Zadanie 9

Dodaj mechanizm `cookie-parser` do Twojej aplikacji. Za pomocą nagłówka `Set-Cookie` ustawianego w następujący sposób:`res.cookie('role', 'admin', { sameSite: 'None'});` wysyłaj ciasteczko do aplikacji klienckiej.

W aplikacji klienckiej do każdego z obiektów opcji żądania (drugi parametr `fetch`) dodaj `credentials: 'include'` aby aplikacja odsyłała ciasteczka.

W aplikacji serwerowej, wykorzystując `req.cookies` dodawane przez `cookie-parser`, sprawdź czy ciasteczka faktycznie przychodzą. Jeśli tak, to na jakąkolwiek zmianę w katalogu książek pozwalaj tylko wtedy, kiedy w ciasteczku znajduje się informacja `role=admin`. W przeciwnym wypadku wywołaj funkcję `next(err)` z obiektem błędu.

Ustawione w aplikacji ciasteczka możesz sprawdzić w narzędziu `DevTools` w przeglądarce `Chrome` w zakładce `Application`.
