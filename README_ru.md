# Simple Landscape
JavaScript функция, создающая полотно с анимацией пейзажа. Оно создает случайное количество облако, сформированных из кругов, количество одуванчиков на земле и их пушинки, которые постепенно начинают улетать и когда заканчивается количество пушинок, от одуванчика остается только стебель. Когда облака улетают за пределы полотна, на правой границе, появляются новые и вылетают из левой, но к сожалению одуванчики остаются в виде стебелей.

Это была лабораторная(практическая) работа по дисциплине "компьютерная графика" в университете, однако остается вполне универсальной и может быть свободно использована где угодно (к примеру, использована как фон домащней/страницы новой вкладки или чего-то еще).

# Как использовать

### В браузере

1. Подключите JavaScript файо в Вашем документе

```html
<script src="https://raw.githubusercontent.com/SVGvsevolod/simple-landscape/main/sl.min.js"></script>
```

2. Напишите код, который использует `sl` функцию с указанными параметрами

```js
sl(target, width, height, (canvas, event) => {
    canvas.width = width;
    canvas.height = height;
});
```

- `target` это элемент Вашего документа, в котором будет помещено полотно
- Последний параметр - это функция для события изменения размера окна, в случае, если вам необходимо, чтобы полотно адаптировалось под размер окна.

### Как модуль

```
npm install simple-landscape
```

```js
import sl from 'simple-landscape';
```