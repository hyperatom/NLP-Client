export default {

    _createContainerElem(markup) {

        var divElem = document.createElement('div');

        divElem.innerHTML = markup;

        return divElem;
    },

    _extractMarkupText(elem) {

        return elem.textContent;
    },

    extractTextFromMarkup(markup) {

        var elem = this._createContainerElem(markup);

        return this._extractMarkupText(elem);
    }
}