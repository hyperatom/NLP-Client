export default {

    isTextMissingCapitalLetter(text) {

        if (text) {

            var firstChar = text.charAt(0);

            return firstChar !== firstChar.toUpperCase();
        }
    },

    isTextMissingFullStop(text) {

        if (text) {

            return !text.match(/\.$/);
        }
    }
}