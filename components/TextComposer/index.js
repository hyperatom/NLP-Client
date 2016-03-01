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

        (function() {
            var lastTime = 0;
            var vendors = ['webkit', 'moz'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());

        window.requestAnimationFrame(function() {

            var node = ReactDOM.findDOMNode(_this);

            if (node !== undefined) {

                node.focus();

                _this._setEndOfContenteditable(node);
            }
        });
    }

    _setEndOfContenteditable (contentEditableElement) {

        var range,selection;

        if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if (document.selection)//IE 8 and lower
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