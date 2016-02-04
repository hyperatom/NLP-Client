'use strict';

import React           from 'react';
import ReactDOM        from 'react-dom';
import CSSModules      from 'react-css-modules';
import ContentEditable from 'react-contenteditable';

import style from './style.scss';

class TextComposer extends React.Component {

    _textChanged(event) {

        this.props.textChanged(event.target.value);
    }

    _setCursor() {

        var _this = this;

        window.requestAnimationFrame(function() {

            var node = ReactDOM.findDOMNode(_this);

            if (node !== undefined) {

                console.log('focusing');
                node.focus();
                console.log(node);
                _this._setEndOfContenteditable(node);
            }
        });
    }

    _setEndOfContenteditable (contentEditableElement) {

        var range,selection;

        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        {
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }

    componentDidUpdate (state) {

        if (state.disabled !== this.props.disabled) {

            this._setCursor();
        }
    }

    render() {

        return (
            <ContentEditable onChange={ this._textChanged.bind(this) }
                             disabled={ this.props.disabled }
                             html={ this.props.composerHtml }
                             styleName="composer" />
        )
    }
}


export default CSSModules(TextComposer, style);