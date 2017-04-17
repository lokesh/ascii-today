export default {
  // Text selection code taken from http://stackoverflow.com/a/987376/400407
  select: function(el) {
    if (document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
    } else if (window.getSelection) {
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },

  deselect: function() {
    if (document.selection) {
      document.selection.empty();
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }
}
