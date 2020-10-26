let numberMaxZIndex = 1;    // переменная, хранящая максимальное значение z-index
class Dialog {
    /**
     * Создает новый экземпляр Dialog.
     * @constructor
     * @this  {Dialog}
     * @param  {Node} contentNode - Содержимое диалогового окна.
     * @param {function} handlerButton - Обработчик события нажатия на кнопку "ОК"
     * @return {Dialog} Новый объект Dialog.
     */
    constructor(contentNode, handlerButton){
        // блок верхушки для перетаскивания
        let dialogDrag = document.createElement('div');
        dialogDrag.className = "dialog-form__drag";
        let dialogCloseButton = document.createElement('div');
        // кнопка закрытия диалогового окна
        dialogCloseButton.classList.add("button", "dialog-form__button");
        dialogCloseButton.innerHTML = "Закрыть";
        dialogCloseButton.onclick = () => this.closeDialog();
        // кнопка подтверждения
        let dialogOkButton = document.createElement('div');
        dialogOkButton.classList.add("button", "dialog-form__button");
        dialogOkButton.innerHTML = "ОК";
        dialogOkButton.onclick = () => {handlerButton(contentNode); this.closeDialog()};
        let dialogBlockButtons = document.createElement('div');
        dialogBlockButtons.className = "dialog-form__block_buttons";
        dialogBlockButtons.appendChild(dialogOkButton);
        dialogBlockButtons.appendChild(dialogCloseButton);
        // блок тела диалога
        let dialogBody = document.createElement('div');
        dialogBody.className = "dialog-form";
        dialogBody.appendChild(dialogDrag);
        dialogBody.appendChild(contentNode);
        dialogBody.appendChild(dialogBlockButtons);
        dialogBody.style.zIndex = 1;
        this._bodyDialog = dialogBody;
        //Навешивание прослушивателей для Drag&Drop
        dialogDrag.addEventListener('mousedown', this._mouseDown, false);
        addEventListener('mousemove', this._mouseMove, false);
        addEventListener('mouseup', this._moveEnd, false);
        dialogBody.addEventListener('ondragstart', this._onDragStart, false);
        dialogDrag.addEventListener('touchstart', this._touchStart, false);
        addEventListener('touchmove', this._touchMove, false);
        addEventListener('touchend', this._moveEnd, false);
        this.flagMove = false;
    }
    // Открытие диалогового окна
    openDialog  = () => document.body.appendChild(this._bodyDialog);
    // Закрытие диалогового окна
    closeDialog = () => document.body.removeChild(this._bodyDialog);
    // Нажатие на кнопку мыши
    _mouseDown  = e =>  this._startMoveDialog(e);
    // Передвижение тела Диалога
    _mouseMove  = e =>  this.flagMove ? this._moveAt(e) : null;
    // Отпускание кнопки мыши
    _moveEnd    = () => this.flagMove = false;
    // Захват диалога с помощью касания
    _touchStart = e =>  { e.preventDefault(); this._startMoveDialog(e.changedTouches[0]); }
    // Перетаскивание объекта с помошью касания
    _touchMove  = e =>  this.flagMove ? this._moveAt(e.changedTouches[0]) : null;
    // Функция переноса тела Диалога
    _moveAt = e => {
        this._bodyDialog.style.left = e.pageX - this.shiftX + 'px';
        this._bodyDialog.style.top  = e.pageY - this.shiftY + 'px';
    };
    // Отключение стандартного драга
    _onDragStart = () => false;
    // Получение координат нажатия (касания) с оффсетом
    _getCoords = (elem) => {   // кроме IE8-
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    };
    // Функция начала перемещения диалога
    _startMoveDialog = e => {
        let coords = this._getCoords(this._bodyDialog);
        this.shiftX = e.pageX - coords.left;
        this.shiftY = e.pageY - coords.top;
        this.flagMove = true;
        //Размещение в абсолютном позиционировании
        this._bodyDialog.style.position = 'absolute';
        this._moveAt(e);
        numberMaxZIndex++;
        this._bodyDialog.style.zIndex = Number(numberMaxZIndex);
    };
}
