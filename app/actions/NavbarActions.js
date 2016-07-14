import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      // Sets online users count on Socket.IO event update.
      'updateOnlineUsers',
      // Adds “fadeIn” or “fadeOut” CSS class to the loading indicator.
      'updateAjaxAnimation',
      // Update search query value on keypress.
      'updateSearchQuery',
      // Returns total number of characters.
      'getCharacterCountSuccess',
      // Returns jQuery jqXhr object.
      'getCharacterCountFail',
      'findCharacterSuccess',
      'findCharacterFail'
    );
  }

  // Find a character by name.
  findCharacter(payload) {
    $.ajax({
      url: '/api/characters/search',
      data: { name: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findCharacterSuccess(payload);
      })
      .fail(() => {
        this.actions.findCharacterFail(payload);
      });
  }

  // Fetch total number of characters from the server.
  getCharacterCount() {
    $.ajax({ url: '/api/characters/count' })
      .done((data) => {
        this.actions.getCharacterCountSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getCharacterCountFail(jqXhr)
      });
  }
}

export default alt.createActions(NavbarActions);
