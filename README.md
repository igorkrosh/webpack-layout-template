| [Webpack-шаблон для верстки (RU)](./README_RU.md) | [Webpack Layout Template (EN)](./README.md) |

# Webpack Layout Template

A flexible and functional template for laying out web pages using Webpack. This template is designed for layout designers and frontend developers, providing a ready-made configuration for working with PUG, SCSS, automatic font include, as well as popular tools and libraries for creating modern interfaces. Includes ready-made solutions for sliders, tabs, anchor links, input masks, and lightbox.

## Features

- PUG support for generating HTML templates
- SCSS processing with automatic compilation to CSS
- Automatic font include
- Building files into HTML, CSS, and JavaScript
- Built-in OwlCarousel slider for creating carousels
- Anchor links with smooth scrolling to page sections
- Built-in tabs for switching content
- jQuery connected for simplifying DOM work
- Input masks for forms (e.g., for phones or dates)
- Lightbox for displaying images

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/igorkrosh/webpack-layout-template.git
    ```
2. Navigate to the project directory:
    ```bash
    cd webpack-layout-template
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

- **Development mode**. Start the development server with hot reloading:
    ```bash
    npm run dev
    ```
    The browser will automatically open `http://localhost:9000`

- **Production**. Build the project for production:
    ```bash
    npm run build
    ```
    The built project will be placed in the `dist/` folder.

## Features

- **Automatic font include**

    Place .ttf font files in the path `assets/fonts/{fontName}/` and run the project build command:
    ```bash
    npm run build
    ```
    During the project build, Webpack will check for the presence of the `src/styles/fonts.scss` file. If the file is missing or its content is empty, the font import process from the `assets/fonts/` folder will start. Each folder is considered a separate font family, and the folder name will be used in `font-family`. Font files are checked for weight indicators in the name (`thin`, `extralight`, `light`, `medium`, `semibold`, `bold`, `extrabold`, `black`); if no weight indicator is found, the default value `font-weight: 400` will be assigned. Similarly, the presence of `italic` in the file name is checked for style.

    Such a structure will produce the following content in the `fonts.scss` file:
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

    **Rebuilding fonts.scss does not occur for optimization purposes. To rebuild, delete the fonts.scss file**

- **Using the lightbox**
    
    Automatically used for all `a.lightbox` and the content of the `href` attribute is displayed in the lightbox
    ```pug
    a.lightbox(href="@assets/images/image.jpg")
    ```

- **Using input masks**

    Currently, there is one automatic mask for `input.phone` in the format `+7(000) 000-00-00`. Mask settings can be found in `src/scripts/bundle.js` and you can create your own similarly : ([link to jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/)): 

    ```js
    function InitMaskPlugin()
    {
        $('input.phone').mask('+7(000) 000-00-00')
    }
    ```
- **Anchor links**

    Anchor links are created by adding the `anchor` attribute to the HTML element with a query selector to the element to scroll to

    ```pug
    a(href="#" anchor="section.docs-content") Docs
    ```

- **Tabs**

    The tab structure looks like this:

    ```pug
    .tab-viewer
        .tab.active(tab-name="tab-1")
            h3 tab1
        .tab(tab-name="tab-2")
            h3 tab2
    ```

    - `.tab-viewer` - Required wrapper for all `.tabs`

    - `.tabs` - Contains tab content. The `tab-name` attribute is required and used for switching tabs

    To switch between tabs, use `.btn-tab`: 

    ```pug
    .btn-wrapper
        button.btn-tab(target="tab-1").active tab1
        button.btn-tab(target="tab-2") tab2
    ```

    `.btn-tab` must contain the `target` attribute with the tab name `tab-name` it leads to

    When switching tabs, the `.active` class is automatically applied to the button and tab
- **Slider**

    OwlCarousel is used as a slider. Examples of its use can be found in the [docs](https://owlcarousel2.github.io/OwlCarousel2/)
- **Modals**

    Modal windows work using the [jQuery Modal](https://www.jquerymodal.com/) plugin

## Project Structure

```
webpack-layout-template/
├── assets/                     # Asset files
│   └── fonts/                  # Fonts
│       └── сonverted/          # Fonts converted to WOFF
├── dist/                       # Built project
├── plugins/                    # Custom Webpack plugins used in the project
├── src/                        # Project source files
│   ├── components/             # PUG files
│   │   └── core/               # Base PUG files (header, footer, etc.)
│   ├── layouts/                # Page templates
│   │   └── default.pug         # Default page template
│   ├── pages/                  # Site pages
│   ├── scripts/                # JavaScript files
│   │   ├── bundle.js           # Bundle file with all libraries
│   │   └── index.js            # Main JavaScript entry point
│   ├── styles/                 # SCSS files
│   │   ├── animations.scss     # File for storing animations
│   │   ├── bundle.scss         # Bundle file with animation styles, fonts, variables, base styles, and connected package styles
│   │   ├── core.scss           # Project base styles
│   │   ├── fonts.scss          # Styles for included fonts
│   │   ├── response.scss       # Responsive styles
│   │   ├── style.scss          # Main styles file
│   │   └── variables.scss      # Style variables
└── webpack.config.js           # Webpack configuration
```

## Used Libraries

- **[OwlCarousel](https://owlcarousel2.github.io/OwlCarousel2/)** - For creating responsive sliders.
- **[jQuery](https://jquery.com/)** - For simplifying DOM work and plugin support.
- **[jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/)** - For formatting input fields (e.g., phone numbers).
- **[Simple lightbox](https://dbrekalo.github.io/simpleLightbox/)** - For displaying images.
- **[jQuery Modal](https://www.jquerymodal.com/)** - For displaying modal windows

## How to Contribute

Any improvements are welcome! If you want to add new features or fix bugs:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes (`git commit -m 'Added new feature'`).
4. Push changes to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Contacts

If you have questions or suggestions, create an issue in [GitHub Issues](https://github.com/igorkrosh/webpack-layout-template/issues).

Author: Igor Kroshkin ([igorkrosh](https://github.com/igorkrosh)) 