# OAuth 2.0 Потоки авторизації — Тестові сценарії через OpenAPI Client

## Тестові сценарії

На початку роботи небхідно натиснути на **🔓Autorize**

![1.png](assets%2F1.png)

Далі необхідно обрати один з чотирьх варіантів авторизації:

- Authorization Code Flow
- Implicit Flow
- Password Credentials Flow
- Client Credentials Flow

____________________________________________________________

### Authorization Code Flow

Коли обрано Authorization Code Flow заповнюємо поля:

- client_id: auth-test
- client_secret: auth-test -> Credentials -> Client Secret
- openid: true

____________________________________________________________

![2.png](assets%2F2.png)

Натискаємо **Authorize**, вводимо username/email та password користувача:

![3.png](assets%2F3.png)

Отримаємо:

![4.png](assets%2F4.png)

У відповідь на GET-запит повертається код 200 та тіло у форматі JSON:

![5.png](assets%2F5.png)

____________________________________________________________

### Implicit Flow

Коли обрано Implicit Flow заповнюємо поля:

- client_id: auth-test
- openid: true

____________________________________________________________

![6.png](assets%2F6.png)

Натискаємо **Authorize**, аналогічно до Authorization Code Flow вводимо username/email та password користувача

Отримаємо:

![7.png](assets%2F7.png)

У відповідь на GET-запит повертається код 200 та тіло у форматі JSON, як і у Authorization Code Flow

____________________________________________________________

### Password Credentials Flow

Коли обрано Password Credentials Flow заповнюємо поля:

- username: test_user
- password: ********
- client_id: auth-test
- client_secret: auth-test -> Credentials -> Client Secret
- openid: true

____________________________________________________________

![8.png](assets%2F8.png)

Натискаємо **Authorize** та отримаємо:

![9.png](assets%2F9.png)

У відповідь на GET-запит повертається код 200 та тіло у форматі JSON, як і у минулих потоках авторизації

____________________________________________________________

### Client Credentials Flow

Коли обрано Client Credentials Flow заповнюємо поля:

- client_id: auth-test
- client_secret: auth-test -> Credentials -> Client Secret
- openid: true

____________________________________________________________

![10.png](assets%2F10.png)

Натискаємо **Authorize** та отримаємо:

![11.png](assets%2F11.png)

У відповідь на GET-запит повертається код 200 та тіло у форматі JSON, яке відрізняється від відповіді у минулих потоках авторизації:

![12.png](assets%2F12.png)

____________________________________________________________

## Роз'яснення щодо відмінностей при реалізації тестових сценаріїв

### 1. Чому при Authorization Code Flow та Implicit Flow Keycloak просить ввести username/email та password, а при Password Credentials Flow та Client Credentials Flow — ні?

#### Authorization Code Flow та Implicit Flow

Ці потоки призначені для інтерактивної авторизації користувача. Тобто:

- Користувач має побачити форму логіну (вводить email/username і пароль).
- Keycloak перенаправляє користувача на екран входу, бо це частина авторизаційного процесу через браузер.
- Мета — дозволити користувачу надати згоду на доступ (через UI).

🔄 Браузер → Keycloak → логін → редірект з кодом / токеном

#### Password Credentials Flow

У цьому потоці логін і пароль вводяться напряму в клієнті (наприклад, у Postman чи через OpenAPI UI).

- Тут взаємодії з UI Keycloak нема.
- Ви передаєте логін і пароль напряму в POST-запиті на tokenUrl.
- Keycloak не запитує нічого додатково, бо вся потрібна інформація вже є.

Цей потік вважається менш безпечним і підходить лише для довірених клієнтів (наприклад, CLI або внутрішніх сервісів).

#### Client Credentials Flow

Це машина-до-машини (M2M) авторизація — жодного користувача не існує в цьому процесі.

- Процес логіну відбувається від імені клієнта, а не користувача.
- Жодного логіну чи взаємодії з UI Keycloak немає, бо нема користувача, якого логінити.
- Авторизація відбувається лише через client_id + client_secret.

### 2. Чому тіло відповіді при Client Credentials Flow інше, ніж у інших потоках?

#### Authorization Code / Implicit / Password Flows:

- Видають токен від імені користувача.
- Відповідь на /userinfo містить профіль користувача: ім'я, email, username, тощо.

#### Client Credentials Flow

Немає користувача, тому відповідь містить технічний обліковий запис:

- preferred_username: service-account-<client_id>
- email: відсутній
- name: відсутнє
- email_verified: false, бо це не людина

____________________________________________________________

## Висновки

| Потік                   | Хто авторизується           | Введення логіну/пароля | Тип профілю у відповіді    |
| ----------------------- | --------------------------- | ---------------------- | -------------------------- |
| Authorization Code Flow | Користувач через браузер    | Так                    | Повний профіль користувача |
| Implicit Flow           | Користувач через браузер    | Так                    | Повний профіль користувача |
| Password Credentials    | Користувач напряму          | Ні (в API)             | Повний профіль користувача |
| Client Credentials      | Сервіс (machine-to-machine) | Ні                     | Service account профіль    |