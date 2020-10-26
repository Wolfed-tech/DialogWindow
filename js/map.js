let yMap; // карта Яндекса
let polygon; // полигон
let arrayPoint = []; // массив точек полигона
// Инициализация карты
ymaps.ready(_init);
function _init(){
    yMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 6
    });
    _createPolygon();
}
// Создание полигона с пустым массивом точек
function _createPolygon(){
    polygon = new ymaps.Polygon([
            // Координаты многоугольника
        arrayPoint, []
        ], {
            /* Свойства многоугольника:
               - контент хинта */
            hintContent: "Многоугольник"

        }, {
            /* Опции многоугольника:
               - флаг использования заливки */
            fill: true,
            // - флаг отрисовки контурной линии
            stroke: true,
            // - ширина линии
            strokeWidth: 3,
            // - цвет и прозрачность линии
            strokeColor: "#00ff0050",
            // - цвет и прозрачность заливки
            fillColor: "#7dfff980"
        }
    );
    polygon.geometry.setFillRule("nonZero");
    // Добавление многоугольника на карту
    yMap.geoObjects.add(polygon);
}
// Функция, добавляющая точку в полигон
function addPointToPolygon(contentNode) {
    let point = contentNode.lastChild;
    if (point.latitude.value && point.longitude.value)
    {
        arrayPoint.push([point.latitude.value, point.longitude.value]);
        polygon.geometry.setCoordinates([arrayPoint,[]]);
        if (arrayPoint.length > 1)  yMap.setBounds(polygon.geometry.getBounds());
    }
}
// Функция удаления всех точек в массиве
function removeAllPoints() {
    arrayPoint.length = 0;
    polygon.geometry.setCoordinates([arrayPoint, []]);
}