| [Webpack-шаблон для верстки (RU)](./README_RU.md) | [Webpack Layout Template (EN)](./README.md) |

# Webpack-шаблон для верстки

Гибкий и функциональный шаблон для верстки веб-страниц с использованием Webpack. Этот шаблон разработан для верстальщиков и фронтенд-разработчиков, предоставляя готовую конфигурацию для работы с PUG, SCSS, автоматическим подключением шрифтов, а также популярными инструментами и библиотеками для создания современных интерфейсов. Включает готовые решения для слайдеров, табов, якорных ссылок, масок ввода и лайтбокса.

## Возможности

- Поддержка PUG для генерации HTML-шаблонов
- Обработка SCSS с автоматической компиляцией в CSS
- Автоматическое подключение шрифтов
- Сборка файлов в HTML, CSS и JavaScript
- Встроенный слайдер OwlCarousel для создания каруселей
- Якорные ссылки с плавным скроллом к секциям страницы
- Встроенные табы для переключения контента
- Подключен jQuery для упрощения работы с DOM
- Маски ввода для форм (например, для телефонов или дат)
- Лайтбокс для отображения изображений

## Установка

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/igorkrosh/webpack-layout-template.git
    ```
2. Перейдите в директорию проекта:
    ```bash
    cd webpack-layout-template
    ```
3. Установите зависимости:
    ```bash
    npm install
    ```

## Использование

- **Режим разработки**. Запустите сервер разработки с горячей перезагрузкой:
    ```bash
    npm run dev
    ```
    Автоматически в браузере откроется `http://localhost:9000`

- **Продакшен**. Соберите проект для продакшена:
    ```bash
    npm run build
    ```
    Собранный проект будет размещен в папке `dist/`.

## Особенности

- **Автоматическое подключение шрифтов**

    Расположите файлы шрифтов в формате .ttf по пути `assets/fonts/{fontName}/` и запустите команду сборки проекта:
    ```bash
    npm run build
    ```
    Во время сборки проекта, Webpack проверит наличие файла `src/styles/fonts.scss`. Если файл отсутствует или содержимое файла пусто, то запускается процесс импорта шрифтов из папки `assets/fonts/`. Каждая папка считается отдельным семейством шрифтов и в `font-family` будет указано название папки. Файлы шрифтов проверяются на наличие в названии указание жирности (`thin`, `extralight`, `light`, `medium`, `semibold`, `bold`, `extrabold`, `black`), если указание жирности не будет найдено, то присвоится значение по умолчанию `font-weight: 400`. По аналогии проверяется наличие начертания `italic` в названии файла.

    Подобная структура даст следующие содержимое файла `fonts.scss`:
    ```
    assets/
    └── fonts/
        ├── foo/
        │   └── Foo-Bold.ttf
        └── bar/
            └── Bar-Light-Italic.ttf
    ```

    ```scss
    @mixin FontFace($fontFamily, $fileName, $weight, $style)
    {
        @font-face {
            font-family: $fontFamily;
            font-display: swap;
            src: url("#{$fileName}.woff") format("woff"), url("#{$fileName}.woff2") format("woff2");
            font-weight: #{$weight};
            font-style: #{$style};
        }
    }

    @include FontFace("Foo", "@assets/fonts/converted/Foo/Foo-Bold", "700", "regular");
    @include FontFace("Bar", "@assets/fonts/converted/Bar/Bar-Light-Italic", "300", "italic");
    ```

    **Повторная сборка fonts.scss не происходит в целях оптизизации времени сборки. Для пересборки нужно удалить файл fonts.scss**

- **Использование лайтбокса**
    
    Автоматически используется для всех `a.lightbox` и содержимое атрибута `href` отображается в лайтбоксе
    ```pug
    a.lightbox(href="@assets/images/image.jpg")
    ```

- **Использование масок для ввода**

    На данный момент есть одна автоматическая маска для `input.phone` в формате `+7(000) 000-00-00`. Настройки маски можно найти в `src/scripts/bundle.js` и по аналогии создать свои ([ссылка на jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/)): 

    ```js
    function InitMaskPlugin()
    {
        $('input.phone').mask('+7(000) 000-00-00')
    }
    ```
- **Якорные ссылки**

    Якорные ссылки создаются путем добавление атрибута `anchor` к HTML-элементу с query-селектором на элемент к которому нужно скролить

    ```pug
    a(href="#" anchor="section.docs-content") Docs
    ```

- **Табы**

    Структура табов выглядит следующим образом: 

    ```pug
    .tab-viewer
        .tab.active(tab-name="tab-1")
            h3 tab1
        .tab(tab-name="tab-2")
            h3 tab2
    ```

    - `.tab-viewer` - Обязательная обертка для всех `.tabs`

    - `.tabs` - Содержит контент таба. Атрибут `tab-name` обязателен и используется для для переключения табов

    Для переключения между табами используется `.btn-tab`: 

    ```pug
    .btn-wrapper
        button.btn-tab(target="tab-1").active tab1
        button.btn-tab(target="tab-2") tab2
    ```

    `.btn-tab` должен содержать атрибут `target` с название таба `tab-name` на который он ведет

    При переключении табов класс `.active` автоматичести проставляется у кнопки и таба 
- **Слайдер**

    В качестве слайдера используется OwlCarousel, с примерами использования можно ознакомиться в [документации](https://owlcarousel2.github.io/OwlCarousel2/)

- **Модальные окна**

    Модальные окна работают с помощью плагина [jQuery Modal](https://www.jquerymodal.com/)

## Структура проекта

```
webpack-layout-template/
├── assets/                     # Файлы ассетов
│   └── fonts/                  # Шрифты
│       └── сonverted/          # Шрифты конвертированные в WOFF 
├── dist/                       # Собранный проект
├── plugins/                    # Кастомные плагины для Webpack используемые в проекте
├── src/                        # Исходные файлы проекта
│   ├── components/             # PUG файлы
│   │   └── core/               # Базовые PUG-файлы (header, footer и т.д.)
│   ├── layouts/                # Шаблоны страниц
│   │   └── default.pug         # Шаблон страниц по умолчанию
│   ├── pages/                  # Страницы сайта
│   ├── scripts/                # JavaScript файлы
│   │   ├── bundle.js           # Bundle-файл со всеми библиотеками
│   │   └── index.js            # Главная точка входа JavaScript
│   ├── styles/                 # SCSS-файлы
│   │   ├── animations.scss     # Файл для хранения анимаций
│   │   ├── bundle.scss         # Bundle-файл с стилями анимаций, шрифтов, переменных, базовые стили и стили подключенных пакетов
│   │   ├── core.scss           # Базовые стили проекта
│   │   ├── fonts.scss          # Стили подлючаемых шрифтов
│   │   ├── response.scss       # Адаптив стили
│   │   ├── style.scss          # Основной файл стилей
│   │   └── variables.scss      # Переменные стилей
└── webpack.config.js           # Конфигурация Webpack
```

## Используемые библиотеки

- **[OwlCarousel](https://owlcarousel2.github.io/OwlCarousel2/)** - Для создания адаптивных слайдеров.
- **[jQuery](https://jquery.com/)** - Для упрощения работы с DOM и поддержки плагинов.
- **[jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/)** - Для форматирования полей ввода (например, для номеров телефона).
- **[Simple lightbox](https://dbrekalo.github.io/simpleLightbox/)** - Для отображения изображений.
- **[jQuery Modal](https://www.jquerymodal.com/)** - Для отображения модальных окон

## Как внести вклад

Приветствуются любые улучшения! Если хотите добавить новые возможности или исправить ошибки:

1. Сделайте форк репозитория.
2. Создайте новую ветку (`git checkout -b feature/your-feature`).
3. Внесите изменения (`git commit -m 'Added new feature'`).
4. Отправьте изменения в ветку (`git push origin feature/your-feature`).
5. Откройте запрос на включение (pull request).

## Контакты

Если у вас есть вопросы или предложения, создайте задачу в [GitHub Issues](https://github.com/igorkrosh/webpack-layout-template/issues).

Автор: Igor Kroshkin ([igorkrosh](https://github.com/igorkrosh)) 