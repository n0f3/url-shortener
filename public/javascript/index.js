$(function() {
  var shortUrlContainer = $('#short-url-container');
  var shortUrlLink = $('#short-url');
  shortUrlContainer.hide();
  $('#send-data').on('click', (function(e) {
    e.preventDefault();
    var input = $('#data-input').val();
    if (input !== 'undefined' && input !== '') {
      $.get('/new/' + input).done(function(data, textStatus) {
        if (data) {
          $('#return-object').html(data);
          var dataObj = JSON.parse(data);
          shortUrlLink.attr('href', dataObj.short_url);
          shortUrlLink.html(dataObj.short_url);
          shortUrlContainer.show();
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      }).always(function() {
        $('#data-input').val('');
      });
    }
  }));
});