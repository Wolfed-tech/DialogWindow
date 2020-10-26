// Функция создания нового экземпляра класса Dialog
function createDialog(contentDialog, handlerButton) {
    let dialog = new Dialog(contentDialog, handlerButton);
    dialog.openDialog();
}
// Функция создания содержимого для сбора координат
function createContentForCoords() {
    let contentBody = document.createElement('div');
    contentBody.className = "dialog-form__content";
    let contentText = document.createElement('div');
    let inputLatitude = document.createElement('input');
    let inputLongitude = document.createElement('input');
    contentText.className = "dialog-form__text";
    contentText.innerHTML = "Введите координаты";
    let formForInputs = document.createElement('form');
    formForInputs.name = 'form';
    inputLatitude.className = inputLongitude.className = "dialog-form__input";
    inputLatitude.placeholder = inputLatitude.title = "Введите широту";
    inputLatitude.name = "latitude";
    inputLatitude.min = '-90';
    inputLatitude.max = '90';
    inputLongitude.placeholder =  inputLongitude.title = "Введите долготу";
    inputLongitude.name = "longitude";
    inputLongitude.min = '-180';
    inputLongitude.max = '180';
    inputLatitude.type = inputLongitude.type = "number";
    inputLatitude.step = inputLongitude.step = "any";
    formForInputs.appendChild(inputLatitude);
    formForInputs.appendChild(inputLongitude);
    contentBody.appendChild(contentText);
    contentBody.appendChild(formForInputs);
    //Запрет выделения текста
    let b = document.body;
    b.style.webkitUserSelect = b.style.mozUserSelect = b.style.msUserSelect = 'none';
    return contentBody;
}
// Функция создания содержимого для удаления всех координат
function createContentForRemovePoints() {
    let contentBody = document.createElement('div');
    contentBody.className = "dialog-form__content";
    let contentText = document.createElement('div');
    contentText.className = "dialog-form__text";
    contentText.innerHTML = "Вы точно хотите удалить все координаты?";
    contentBody.appendChild(contentText);
    return contentBody;
}
