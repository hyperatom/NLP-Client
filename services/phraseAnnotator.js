
import _ from 'underscore';

export default {

    showAnnotations(phraseType) {

        var taggedPhrases = document.getElementsByClassName(phraseType);

        _.each(taggedPhrases, (taggedPhrase) => {

            var span = document.createElement('span');

            span.innerHTML = 'NOUN PHRASE';

            span.style.position = 'absolute';
            span.style.top = 0;
            span.style.left = 0;

            var elemRect = taggedPhrase.getBoundingClientRect();

            span.style.position = 'absolute';
            span.style.top = elemRect.top + 40 + 'px';
            span.style.left = elemRect.left + 'px';

            document.body.appendChild(span);
        });
    }
}