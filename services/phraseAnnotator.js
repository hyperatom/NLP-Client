
import _ from 'underscore';

import phraseNames from '../constants/phraseNames';

export default {

    showAnnotations(activePhraseTag) {

        var taggedPhrases = document.getElementsByClassName('phrase--' + activePhraseTag.toLowerCase());

        _.each(taggedPhrases, (taggedPhrase) => {

            var span = document.createElement('span');

            span.innerHTML = phraseNames[activePhraseTag];
            span.className = 'annotation ' + 'annotation--' + activePhraseTag.toLowerCase();

            span.style.position = 'absolute';
            span.style.top = 0;
            span.style.left = 0;

            var elemRect = taggedPhrase.getBoundingClientRect();

            span.style.position = 'absolute';
            span.style.top = elemRect.top + 40 + 'px';
            span.style.left = elemRect.left + 'px';

            document.body.appendChild(span);
        });
    },

    hideAllAnnotations() {

        var phrases = document.getElementsByClassName('annotation');

        while (phrases[0]) {

            phrases[0].parentNode.removeChild(phrases[0]);
        }
    },

    hideAnnotations(phraseType) {

        var phrases = document.getElementsByClassName('annotation--' + phraseType);

        while (phrases[0]) {

            phrases[0].parentNode.removeChild(phrases[0]);
        }
    }
}