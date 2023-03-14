![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


# HTTP server to ExpressJS

ExpressJS jest warstwą abstrakcji nałożoną na wbudowany w Node.js serwer HTTP. Wynika z tego, że da się przepisać każdy serwer zbudowany za pomocą modułu `http` na aplikację w expressie. 

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

## Zadanie 1

W pliku `app.js` uruchamianym skryptem `node app.js` znajduje się prosta aplikacja, serwer http zbudowany przy pomocy wbudowanego w Node.js modułu `http`. 

Twoim zadaniem jest przepisanie aplikacji w taki sposób, żeby zamiast modułu `http` wykorzystywała teraz framework ExpressJS.

# Obiekty req i res, middleware, routing, obsługa błędów

Poznaliśmy już całkiem sporo funkcjonalności, które oferuje nam ExpressJS. Teraz pora wykorzystać je tworząc trochę większą aplikację serwerową.

**Pamiętaj o uruchomieniu `npm install` przed rozpoczęciem zadania!**

W pliku `app.js` uruchamianym skryptem `node app.js` umieść swoje rozwiązania. Stwórz instancję `express()` i przypisz do zmiennej app. Na zapytania nasłuchuj na porcie `3000`.

W pliku `books.json` znajduje się lista obiektów reprezentujących książki z którymi będziemy pracować.

## Zadanie 1

Stwórz obsługę zapytania `GET /books`, które w odpowiedzi zwróci JSON ze wszystkimi książkami. Pamiętaj o obsłużeniu ewentualnych błędów przy odczycie pliku. Do wysyłania zawartości pliku w odpowiedzi użyj `res.json()`. Plik możesz odczytać za pomocą asynchronicznej funkcji `readFile` z modułu `fs`.

## Zadanie 2

Stwórz obsługę zapytania `GET /books/:isbn`, które w odpowiedzi zwróci JSON z konkretną książką. Jeśli książki nie ma liście wyrzuć wyjątek za pomocą `throw new Error('No book found!')`. Sprawdź jak ExpressJS obsłuży ten wyjątek. Z jakim statusem zakończyło się nasze zapytanie?

A teraz, przed wyrzuceniem błędu ustaw w kodzie status odpowiedzi na `409`. Zobacz co się zmieniło.

## Zadanie 3

Stwórz własny middleware do obsługi wyjątków, w którym w odpowiedzi będziemy wysyłać atrybut `message` z obiektu typu Error `{message: err.message}`, gdzie `err` to przychodzący w pierwszym parametrze błąd (`next(throw new Error('No book found!'))`). Popraw dotychczasową obsługę błędów w taki sposób, aby korzystała ze stworzonego przez Ciebie middleware.

## Zadanie 4

Stwórz obsługę zapytania `POST /books/:isbn`, które doda do pliku nową książkę. Pamiętaj, aby dane nowej książki umieścić w body zapytania. Przykładowa książka, którą możesz dodać to:

```json
{
  "title": "JBoss in Action",
  "isbn": "1933988029",
  "pageCount": 496,
  "publishedDate": { "$date": "2009-01-01T00:00:00.000-0800" },
  "status": "PUBLISH",
  "authors": ["Javid Jamae", "Peter Johnson"],
  "categories": ["Java"]
}
```

- Użyj w tym celu narzędzia POSTMAN i wbudowanego w ExpressJS middleware do parsowania body w formacie `x-www-form-urlencoded`.
- Upewnij się, czy książka nie została już wcześniej dodana i nie pozwól na ponowne dodanie jej do listy. W odpowiedzi zwróć obiekt `{message: 'Book is already on the list'}` i status `409`, używając stworzonego przez Ciebie middleware do obsługi błędów.
- Jeśli książkę udało się dodać, zwróć użytkownikowi listę wszystkich książek.

## Zadanie 5

Zmodyfikuj istniejącą już obsługę zapytania `POST /books/:isbn`, tak by przychodzące w obiekcie `req` body mogło być w formacie JSON. Użyj w tym celu narzędzia POSTMAN i wbudowanego w ExpressJS middleware do parsowania body w formacie `JSON`.

## Zadanie 6

Stwórz obsługę zapytania `PUT /books/:isbn`, które podmieni odpowiednie dane w obiekcie książka, np. zmieni status książki z `PUBLISH` na `IN WRITING`, a listę kategorii z `["Java"]` na `["Java", "Internet"]`. Jeśli książki nie ma jeszcze na liście w odpowiedzi zwróć obiekt `{message: 'Book is not on the list'}` i status `409`. Jeśli podmiana się udała, zwróć w odpowiedzi całą listę. Obiekt wysyłany w body powinien wyglądać w następujący sposób:

```json
{
  "status": "IN WRITING",
  "categories": ["Java", "Internet"]
}
```

## Zadanie 7

Stwórz obsługę zapytania `DELETE /books/:isbn`, które usuwa książkę z listy. Jeśli książki nie ma na liście w odpowiedzi zwróć obiekt `{message: 'Book is not on the list'}` i status `409`. Jeśli usuwanie się udało, zwróć w odpowiedzi całą listę.

## Zadanie 8

Stwórz własny middleware, który wyświetli w konsoli szczegółowe informacje na temat każdego z zapytań tj. atrybuty obiektu `req`.

## Zadanie 9

Stwórz własny middleware, który wyświetli w konsoli timestamp dla wszystkich zapytań ze ścieżki `/books/:isbn` ale pominie ścieżkę `/books`.

## Zadanie 10

Dodaj funkcjonalność, która pozwoli na filtrowanie listy książek przy użyciu tzw. query params w następujący sposób:

- dla zapytania `GET /books?category=Internet` wyświetli wszystkie książki, które zawierają w tablicy `categories` frazę `Internet`
- dla zapytania `GET /books?author=Bauer` wyświetli wszystkie książki, które zawierają w tablicy `authors` autora o nazwisku `Bauer`
- dla zapytania `GET /books?pageCountMin=400` wyświetli wszystkie książki, które mają więcej niż `400` stron
- dla zapytania `GET /books?pageCountMax=880` wyświetli wszystkie książki, które mają mniej niż `800` stron
- dla zapytania `GET /books?pageCountMin=400&pageCountMax=880` wyświetli wszystkie książki, które mają więcej niż `400` i mniej niż `800` stron

Jeśli masz ochotę możesz dodać kilka swoich pomysłów na filtrowanie książek (np. po dacie, albo po pozycji w tablicy tj. zwróć pierwszą, drugą czy trzecią dziesiątkę książek).

Musisz wiedzieć, że możesz dowolnie łączyć query params przy użyciu znaku `&` tworząc znacznie bardziej skomplikowane filtrowania, tak jak zrobiliśmy to w przypadku `GET /books?pageCountMin=400&pageCountMax=880`

## Zadanie 11

Obsłuż wszystkie zapytania o nieistniejące zasoby. Zwróć komunikat błędu i status `404`

## Zadanie 12

Zmień wszystkie używane w projekcie wystąpienia `console.log` na logi obsługiwane za pomocą modułu `debug`
