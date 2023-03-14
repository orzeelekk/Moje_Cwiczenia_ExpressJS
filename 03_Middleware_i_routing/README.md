![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/30623667/104709394-2cabee80-571f-11eb-9518-ea6a794e558e.png)


# Routing i middleware

W przypadku aplikacji serwerowych w ExpressJS narzędzia, którymi będziesz się posługiwać to między innymi właśnie funkcje middleware i mechanizm routing. Powtórzmy raz jeszcze omawiane przez nas koncepty i wypróbujmy na prostych przykładach.

**Pamiętaj o uruchomieniu `npm install` przed zadaniami!**

W pliku `app.js` uruchamianym za pomocą `npm run start` umieść swoje rozwiązania. Na początek stwórz prosty serwer nasłuchujący na porcie `3000`.

## Zadanie 1

Wygeneruj bardzo prostą listę zawierającą kilkanaście obiektów reprezentujących użytkownika, wystarczy `{ id: 1, email: user_1@gmail.com}`. Do serwera dodaj obsługę zapytania `GET /user/:id`, w której zwrócisz informację o wskazanym w zapytaniu użytkowniku. Użytkownika przypisz do parametru URI w metodzie `app.param`.

## Zadanie 2

Obsłuż wyjątek jeśli użytkownik o podanym id nie istnieje.

## Zadanie 3

Obsłuż wyjątek dla nieodnalezionej strony - `404 NotFound`

## Zadanie 4

Do serwera dodaj obsługę zapytania `GET /user/info/:id`. W odpowiedzi zwróć informację `Identyfikator parzysty`, dla wszystkich użytkowników, dla których identyfikator faktycznie jest parzysty i `Identyfikator nieparzysty` dla pozostałych. Wywołaj w tym celu funkcję `next` z argumentem `route`.

## Zadanie 5

Stwórz osobny `Router` dla wszystkich zapytań rozpoczynających się od ścieżki `/calc`. Obsłuż zapytanie `GET /calc/:num1/:operation/:num2`, w którym `num1` oraz `num2` to liczby, a `operation` to działanie matematyczne ze zbioru `add, subtract, divide, multiply, modulo`. Wyrzuć wyjątek i zwróć status `409` dla niepoprawnych wartości początkowych np. `num1` lub `num2` nie dają sie skonwertować do liczby, a działanie matematyczne nie zawiera się w zbiorze. Zwróć wynik dla poprawnych danych.

Osobny `Router` stwórz w pliku `calc.js`.

## Zadanie 6

Stwórz osobny `Router` dla wszystkich zapytań rozpoczynających się od ścieżki `/toPLN`. Obsłuż zapytanie `GET /toPLN/:currency/:amount`, w którym `currency` to nazwa jednej z trzech walut `USD`, `EUR`, `CHF`, a `amount` to kwota którą chcesz przeliczyć na złotówki. Zapytanie obsłuż za pomocą trzech funkcji route handler i funkcji `next` z argumentem `route`. Jeśli użytkownik poda inną niż przyjmowane przez nas waluty, ponownie użyj funkcji `next` tym razem z parametrem `router` i wyświetl użytkownikowi błąd, z funkcji middleware stworzonej w Zadaniu 3. Jeśli użytkownik poda jedną z trzech dopuszczalnych walut, przelicz kwotę na złotówki po aktualnym kursie znalezionym w internecie.

Osobny `Router` stwórz w pliku `converter.js`.
