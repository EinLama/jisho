function LearnSession(correct, wrong, todo, current_word) {
  this.correct = typeof correct !== 'undefined' ? correct : [];
  this.current_word = typeof current_word !== 'undefined' ? current_word : null;
  this.todo  = typeof todo !== 'undefined' ? todo : [];
  this.wrong = typeof wrong !== 'undefined' ? wrong : [];

  if (this.current_word != null) {
    if ($.inArray(this.current_word, this.todo) == -1) {
      alert("current_word must be in todo");
      return;
    }
  } else {
    this.current_word = next_word();
  }



  this.words = function() {
    return correct.concat(todo);
  };

  this.is_finished = function() {
    return current_word == null;
  };

  this.mark_correct = function() {
    var correct_words = new_correct_with(current_word);
    var todo_words = new_todo_without(current_word);

    return new LearnSession(correct_words, wrong, todo_words);
  };

  this.mark_wrong = function() {
    var wrong_words = new_wrong_with(current_word);
    var todo_words = new_todo_with(current_word);

    return new LearnSession(correct, wrong_words, todo_words);
  };

  function new_correct_with(word) {
    return correct.concat(word);
  }

  function new_wrong_with(word) {
    return wrong.concat(word);
  }

  function new_todo_with(word) {
    return todo.concat(word);
  }

  function new_todo_without(word) {
    var copy = todo.slice(0);
    copy.splice(copy.indexOf(word), 1);

    return copy;
  }

  function next_word() {
    if (current_word == null) {
      /* select random word */
      current_word = todo[Math.floor(Math.random() * todo.length)];
    }

    return current_word;
  }
};

LearnSession.new_session = function(words, current_word) {
  return new LearnSession([], [], words, current_word);
};










var current_session = null;
var selector = '#current';
var correct = '.correct';
var wrong = '.wrong';


function create_session() {
  $.get('data/words.json', function(words) {
    current_session = new LearnSession([], [], words);
    reset_ui(current_session);
  });
}

function reset_ui(current_session) {
  var word = current_session.current_word;

  if (word == null) {
    alert("Fertig! :)");
    return;
  }

  var container = $(selector);
  container.find('.in_japanese').html(word.in_japanese);
  container.find('.romanji').html(word.romanji);
  container.find('.meaning').html(word.meaning);

  var correct_display = "";
  for (i=0; i != current_session.correct.length; ++i) {
    correct_display += current_session.correct[i].in_japanese + ", ";
  }
  $('.correct_words').html(correct_display);

  var wrong_display = "";
  for (i=0; i != current_session.wrong.length; ++i) {
    wrong_display += current_session.wrong[i].in_japanese + ", ";
  }
  $('.wrong_words').html(wrong_display);

  container.removeClass('show_romanji');
  container.removeClass('show_meaning');
  $('.buttons_of_truth').removeClass('shown');
}

function mark_correct() {
  current_session = current_session.mark_correct();
  reset_ui(current_session);
}

function mark_wrong() {
  current_session = current_session.mark_wrong();
  reset_ui(current_session);
}

$(function() {
  create_session();

  var cont = $(selector);
  $('.button_controls .hint').click(function() {
    if (cont.hasClass('show_romanji')) {
      if (cont.hasClass('show_meaning')) {
        $('.buttons_of_truth').addClass('shown');
        return;
      } else {
        cont.addClass('show_meaning');
      }
    } else {
      cont.addClass('show_romanji');
    }

    $('.buttons_of_truth').removeClass('shown');
  });

  $(correct).click(function() {
    $(this).removeClass('shown');
    mark_correct();
  });
  $(wrong).click(function() {
    $(this).removeClass('shown');
    mark_wrong();
  });
});

