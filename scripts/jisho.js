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
  current_session = new LearnSession([], [], all_words);
  reset_ui(current_session);
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



var all_words = [{"created_at":"2013-03-12T18:17:17Z","id":1,"in_japanese":"\u304b\u304e","meaning":"Schl\u00fcssel","romanji":"kagi","updated_at":"2013-03-12T18:17:17Z"},
{"created_at":"2013-03-12T18:23:54Z","id":2,"in_japanese":"\u3057\u304b","meaning":"Reh / Hirsch","romanji":"shika","updated_at":"2013-03-12T18:24:34Z"},
{"created_at":"2013-03-12T18:24:21Z","id":3,"in_japanese":"\u306f\u3057","meaning":"Br\u00fccke / St\u00e4bchen","romanji":"hashi","updated_at":"2013-03-12T18:24:21Z"},
{"created_at":"2013-03-12T18:24:48Z","id":4,"in_japanese":"\u306f\u306a","meaning":"Blume","romanji":"hana","updated_at":"2013-03-12T18:24:48Z"},
{"created_at":"2013-03-12T18:25:05Z","id":5,"in_japanese":"\u306f\u3053","meaning":"Schachtel","romanji":"hako","updated_at":"2013-03-12T18:25:05Z"},
{"created_at":"2013-03-12T18:25:23Z","id":6,"in_japanese":"\u3053\u306a","meaning":"Pulver","romanji":"kona","updated_at":"2013-03-12T18:25:23Z"},
{"created_at":"2013-03-12T18:26:25Z","id":7,"in_japanese":"\u305b\u306a\u304b","meaning":"R\u00fccken / R\u00fcckseite","romanji":"senaka","updated_at":"2013-03-12T18:26:25Z"},
{"created_at":"2013-03-12T18:26:46Z","id":8,"in_japanese":"\u307e\u3061\u30fb\u753a","meaning":"Stadt","romanji":"machi","updated_at":"2013-03-12T18:31:09Z"},
{"created_at":"2013-03-12T18:27:05Z","id":9,"in_japanese":"\u3078\u3093","meaning":"komisch","romanji":"hen","updated_at":"2013-03-12T18:27:05Z"},
{"created_at":"2013-03-12T18:27:25Z","id":10,"in_japanese":"\u304a\u304a\u304d\u3044\u30fb\u5927\u304d\u3044","meaning":"gro\u00df","romanji":"ookii","updated_at":"2013-03-12T18:29:42Z"},
{"created_at":"2013-03-12T18:30:38Z","id":11,"in_japanese":"\u304a\u304a\u304d\u3044\u307e\u3061\u30fb\u5927\u304d\u3044\u753a","meaning":"gro\u00dfe Stadt","romanji":"ookiimachi","updated_at":"2013-03-21T18:25:13Z"},
{"created_at":"2013-03-12T18:34:50Z","id":12,"in_japanese":"\u3053\u306d\u3053\u30fb\u5b50\u732b","meaning":"kleine Katze / K\u00e4tzchen","romanji":"koneko","updated_at":"2013-03-12T18:34:50Z"},
{"created_at":"2013-03-12T18:36:10Z","id":13,"in_japanese":"\u3042\u306e\u3046","meaning":"\u00e4\u00e4h / ehm / also...","romanji":"anoo","updated_at":"2013-03-12T18:36:10Z"},
{"created_at":"2013-03-12T18:36:42Z","id":14,"in_japanese":"\u3055\u3042","meaning":"keine Ahnung... / Tjaaaa...","romanji":"saa","updated_at":"2013-03-12T18:36:42Z"},
{"created_at":"2013-03-12T18:37:15Z","id":15,"in_japanese":"\u3072\u3068\u30fb\u4eba","meaning":"Mensch / Person","romanji":"hito","updated_at":"2013-03-12T18:37:15Z"},
{"created_at":"2013-03-12T18:38:20Z","id":16,"in_japanese":"\u305f\u304b\u3044","meaning":"teuer / hoch","romanji":"takai","updated_at":"2013-03-12T18:38:20Z"},
{"created_at":"2013-03-12T18:38:47Z","id":17,"in_japanese":"\u304a\u3044\u3057\u3044","meaning":"lecker","romanji":"oishii","updated_at":"2013-03-12T18:38:47Z"},
{"created_at":"2013-03-12T18:39:26Z","id":18,"in_japanese":"\u3072\u3053\u3046\u304d","meaning":"Flugzeug","romanji":"hikooki","updated_at":"2013-03-12T18:39:26Z"},
{"created_at":"2013-03-12T18:39:49Z","id":19,"in_japanese":"\u3075\u3046\u305b\u3093","meaning":"Luftballon","romanji":"fuusen","updated_at":"2013-03-12T18:39:49Z"},
{"created_at":"2013-03-21T18:26:03Z","id":20,"in_japanese":"\u3084\u3055\u3044","meaning":"Gem\u00fcse","romanji":"yasai","updated_at":"2013-03-21T18:26:03Z"},
{"created_at":"2013-03-21T18:26:26Z","id":21,"in_japanese":"\u3084\u306d","meaning":"Dach","romanji":"yane","updated_at":"2013-03-21T18:26:26Z"},
{"created_at":"2013-03-21T18:28:15Z","id":22,"in_japanese":"\u3084\u308c\u3084\u308c","meaning":"\"\u00fcberstanden!\" (nachdem man etw. erreicht hat)","romanji":"yareyare","updated_at":"2013-03-21T18:29:08Z"},
{"created_at":"2013-03-21T18:29:30Z","id":23,"in_japanese":"\u3086\u3081","meaning":"Traum / Wunsch","romanji":"yume","updated_at":"2013-03-21T18:29:30Z"},
{"created_at":"2013-03-21T18:29:55Z","id":24,"in_japanese":"\u3086\u3046\u3084\u3051","meaning":"Abendrot","romanji":"yuuyake","updated_at":"2013-03-21T19:55:57Z"},
{"created_at":"2013-03-21T18:30:12Z","id":25,"in_japanese":"\u3088\u308b","meaning":"Nacht","romanji":"yoru","updated_at":"2013-03-21T18:30:12Z"},
{"created_at":"2013-03-21T18:30:38Z","id":26,"in_japanese":"\u3088\u3046\u3084\u304f","meaning":"\"endlich!\"","romanji":"youyaku","updated_at":"2013-03-21T18:30:38Z"},
{"created_at":"2013-03-21T18:31:08Z","id":27,"in_japanese":"\u3084\u307e\u30fb\u5c71","meaning":"Berg","romanji":"yama","updated_at":"2013-03-21T18:31:39Z"},
{"created_at":"2013-03-21T18:32:15Z","id":28,"in_japanese":"\u307e\u3084\u304f","meaning":"Kokain","romanji":"mayaku","updated_at":"2013-03-21T18:32:15Z"},
{"created_at":"2013-03-21T18:32:33Z","id":29,"in_japanese":"\u3084\u3059\u3044","meaning":"billig","romanji":"yasui","updated_at":"2013-03-21T18:32:33Z"},
{"created_at":"2013-03-21T18:32:55Z","id":30,"in_japanese":"\u3084\u304f\u307f","meaning":"Gew\u00fcrz","romanji":"yakumi","updated_at":"2013-03-21T18:32:55Z"},
{"created_at":"2013-03-21T18:33:36Z","id":31,"in_japanese":"\u3086\u308a","meaning":"Lilie (Blume)","romanji":"yuri","updated_at":"2013-03-21T18:33:48Z"},
{"created_at":"2013-03-21T18:34:21Z","id":32,"in_japanese":"\u3084\u304f\u305d\u3046\u30fb\u85ac\u8349","meaning":"Kr\u00e4uter","romanji":"yakusou","updated_at":"2013-03-21T18:34:21Z"},
{"created_at":"2013-03-21T18:40:24Z","id":33,"in_japanese":"\u307e\u3042\u307e\u3042","meaning":"\"es geht...\" / \"geht so\"","romanji":"maamaa","updated_at":"2013-03-21T18:40:24Z"},
{"created_at":"2013-03-21T18:40:41Z","id":34,"in_japanese":"\u307e\u304f\u3089","meaning":"Kopfkissen","romanji":"makura","updated_at":"2013-03-21T18:40:41Z"},
{"created_at":"2013-03-21T18:40:53Z","id":35,"in_japanese":"\u307e\u3069","meaning":"Fenster","romanji":"mado","updated_at":"2013-03-21T18:40:53Z"},
{"created_at":"2013-03-21T18:41:04Z","id":36,"in_japanese":"\u307f\u305d","meaning":"Miso (Paste aus Soja)","romanji":"miso","updated_at":"2013-03-21T18:41:25Z"},
{"created_at":"2013-03-21T18:41:50Z","id":37,"in_japanese":"\u307f\u305d\u3059\u308b","meaning":"Miso-Suppe","romanji":"misosuru","updated_at":"2013-03-21T18:41:50Z"},
{"created_at":"2013-03-21T18:42:09Z","id":38,"in_japanese":"\u3080\u304b\u3057","meaning":"\"fr\u00fcher...\" / \"es war einmal...\"","romanji":"mukashi","updated_at":"2013-03-21T18:42:36Z"},
{"created_at":"2013-03-21T18:42:55Z","id":39,"in_japanese":"\u3080\u3057","meaning":"Wurm / Insekt","romanji":"mushi","updated_at":"2013-03-21T18:42:55Z"},
{"created_at":"2013-03-21T18:43:11Z","id":40,"in_japanese":"\u3081\u304f\u3089","meaning":"blind","romanji":"mekura","updated_at":"2013-03-21T18:43:11Z"},
{"created_at":"2013-03-21T18:45:44Z","id":41,"in_japanese":"\u3081\u3044\u3057\u3083","meaning":"Augenarzt","romanji":"me-isha","updated_at":"2013-03-21T18:45:44Z"},
{"created_at":"2013-03-21T18:46:08Z","id":42,"in_japanese":"\u306f\u3044\u3057\u3083","meaning":"Zahnarzt","romanji":"ha-isha","updated_at":"2013-03-21T18:46:08Z"},
{"created_at":"2013-03-21T18:46:37Z","id":43,"in_japanese":"\u3042\u3081\u30fb\u96e8","meaning":"Regen","romanji":"ame","updated_at":"2013-03-21T18:46:37Z"},
{"created_at":"2013-03-21T18:47:05Z","id":44,"in_japanese":"\u3082\u3082\u30fb\u6843","meaning":"Pfirsich","romanji":"momo","updated_at":"2013-03-21T18:47:31Z"},
{"created_at":"2013-03-21T18:47:58Z","id":45,"in_japanese":"\u3082\u3057\u3082\u3057","meaning":"\"hallo\" (meist am Telefon)","romanji":"moshimoshi","updated_at":"2013-03-21T18:47:58Z"},
{"created_at":"2013-03-21T18:48:25Z","id":46,"in_japanese":"\u3082\u3046","meaning":"\"... schon ...\"","romanji":"mou","updated_at":"2013-03-21T18:48:25Z"},
{"created_at":"2013-03-21T18:48:37Z","id":47,"in_japanese":"\u3082","meaning":"\"... auch ...\"","romanji":"mo","updated_at":"2013-03-21T18:48:37Z"},
{"created_at":"2013-03-21T18:48:48Z","id":48,"in_japanese":"\u3057\u3082","meaning":"Frost","romanji":"shimo","updated_at":"2013-03-21T18:48:48Z"},
{"created_at":"2013-03-21T18:49:01Z","id":49,"in_japanese":"\u3064\u306a\u307f","meaning":"Tsunami","romanji":"tsunami","updated_at":"2013-03-21T18:49:01Z"},
{"created_at":"2013-03-21T18:49:53Z","id":50,"in_japanese":"\u3075\u304f\u3057\u307e\u30fb\u798f\u5cf6","meaning":"Fukushima (Gl\u00fccksinsel)","romanji":"fukushima","updated_at":"2013-03-21T18:49:53Z"},
{"created_at":"2013-03-21T18:50:37Z","id":51,"in_japanese":"\u30b7\u30de\u30a6\u30de","meaning":"Zebra","romanji":"shimauma","updated_at":"2013-03-21T18:50:37Z"},
{"created_at":"2013-03-21T18:51:25Z","id":52,"in_japanese":"\u307e\u3044\u306b\u3061\u30fb\u6bce\u65e5","meaning":"jeden Tag","romanji":"mainichi","updated_at":"2013-03-21T18:51:25Z"},
{"created_at":"2013-03-21T18:52:22Z","id":53,"in_japanese":"\u307e\u3063\u304f\u3089","meaning":"stockdunkel, finster","romanji":"makkura","updated_at":"2013-03-21T18:52:22Z"},
{"created_at":"2013-03-21T18:53:24Z","id":54,"in_japanese":"\u3042\u3055\u3072\u30fb\u65ed","meaning":"Morgensonne","romanji":"asahi","updated_at":"2013-03-21T18:53:24Z"},
{"created_at":"2013-03-21T18:54:03Z","id":55,"in_japanese":"\u3081\u304c\u306d\u30fb\u773c\u93e1","meaning":"Brille","romanji":"megane","updated_at":"2013-03-21T18:54:03Z"},
{"created_at":"2013-03-21T18:55:09Z","id":56,"in_japanese":"\u306a\u3059","meaning":"Aubergine","romanji":"nasu","updated_at":"2013-03-21T18:55:09Z"},
{"created_at":"2013-03-21T18:55:20Z","id":57,"in_japanese":"\u306b\u304f\u30fb\u8089","meaning":"Fleisch","romanji":"niku","updated_at":"2013-03-21T19:15:05Z"},
{"created_at":"2013-03-21T18:55:54Z","id":58,"in_japanese":"\u306c\u306e","meaning":"Stoff","romanji":"nuno","updated_at":"2013-03-21T18:55:54Z"},
{"created_at":"2013-03-21T18:56:14Z","id":59,"in_japanese":"\u306d\u3053\u30fb\u732b","meaning":"Katze","romanji":"neko","updated_at":"2013-03-21T18:56:14Z"},
{"created_at":"2013-03-21T18:56:55Z","id":60,"in_japanese":"\u3042\u3055\u30fb\u671d","meaning":"(der) Morgen","romanji":"asa","updated_at":"2013-03-21T18:56:55Z"},
{"created_at":"2013-03-21T18:57:30Z","id":61,"in_japanese":"\u3055\u3068\u3046\u30fb\u7802\u7cd6","meaning":"Zucker","romanji":"satou","updated_at":"2013-03-21T18:57:30Z"},
{"created_at":"2013-03-21T18:57:49Z","id":62,"in_japanese":"\u3057\u3044\u305f\u3051","meaning":"Pilz","romanji":"shiitake","updated_at":"2013-03-21T18:57:49Z"},
{"created_at":"2013-03-21T18:58:03Z","id":63,"in_japanese":"\u3059\u3057\u30fb\u5bff\u53f8","meaning":"Sushi","romanji":"sushi","updated_at":"2013-03-21T18:58:28Z"},
{"created_at":"2013-03-21T18:58:49Z","id":64,"in_japanese":"\u305b\u3044\u3068","meaning":"Sch\u00fcler","romanji":"seito","updated_at":"2013-03-21T18:58:49Z"},
{"created_at":"2013-03-21T18:59:14Z","id":65,"in_japanese":"\u305b\u304b\u3044\u30fb\u4e16\u754c","meaning":"Welt","romanji":"sekai","updated_at":"2013-03-21T18:59:14Z"},
{"created_at":"2013-03-21T18:59:36Z","id":66,"in_japanese":"\u3044\u306c\u30fb\u72ac","meaning":"Hund","romanji":"inu","updated_at":"2013-03-21T18:59:36Z"},
{"created_at":"2013-03-21T18:59:51Z","id":67,"in_japanese":"\u304b\u3055\u30fb\u5098","meaning":"Schirm","romanji":"kasa","updated_at":"2013-03-21T18:59:51Z"},
{"created_at":"2013-03-21T19:00:11Z","id":68,"in_japanese":"\u306b\u3057\u30fb\u897f","meaning":"Westen","romanji":"nishi","updated_at":"2013-03-21T19:00:11Z"},
{"created_at":"2013-03-21T19:00:45Z","id":69,"in_japanese":"\u304d\u305f\u30fb\u5317","meaning":"Norden","romanji":"kita","updated_at":"2013-03-21T19:00:45Z"},
{"created_at":"2013-03-21T19:01:03Z","id":70,"in_japanese":"\u3048\u304d\u30fb\u99c5","meaning":"Bahnhof","romanji":"eki","updated_at":"2013-03-21T19:01:08Z"},
{"created_at":"2013-03-21T19:01:29Z","id":71,"in_japanese":"\u304f\u3082","meaning":"Wolke / Spinne","romanji":"kumo","updated_at":"2013-03-21T19:01:29Z"},
{"created_at":"2013-03-21T19:06:49Z","id":72,"in_japanese":"\u304f\u3057","meaning":"Kamm","romanji":"kushi","updated_at":"2013-03-21T19:06:49Z"},
{"created_at":"2013-03-21T19:07:05Z","id":73,"in_japanese":"\u3055\u3051","meaning":"Reiswein / Lachs","romanji":"sake","updated_at":"2013-03-21T19:07:05Z"},
{"created_at":"2013-03-21T19:07:23Z","id":74,"in_japanese":"\u3048\u304b\u304d","meaning":"Kunstmaler","romanji":"ekaki","updated_at":"2013-03-21T19:07:23Z"},
{"created_at":"2013-03-21T19:07:33Z","id":75,"in_japanese":"\u3046\u3057","meaning":"Kuh","romanji":"ushi","updated_at":"2013-03-21T19:07:33Z"},
{"created_at":"2013-03-21T19:07:44Z","id":76,"in_japanese":"\u3044\u3048","meaning":"Haus","romanji":"ie","updated_at":"2013-03-21T19:07:44Z"},
{"created_at":"2013-03-21T19:07:57Z","id":77,"in_japanese":"\u304b\u3057","meaning":"S\u00fc\u00dfigkeit","romanji":"kashi","updated_at":"2013-03-21T19:07:57Z"},
{"created_at":"2013-03-21T19:08:09Z","id":78,"in_japanese":"\u3042\u3057","meaning":"Bein / Fu\u00df","romanji":"ashi","updated_at":"2013-03-21T19:08:09Z"},
{"created_at":"2013-03-21T19:08:21Z","id":79,"in_japanese":"\u3051\u3044\u3068","meaning":"Wolle","romanji":"keito","updated_at":"2013-03-21T19:08:21Z"},
{"created_at":"2013-03-21T19:08:32Z","id":80,"in_japanese":"\u3068\u3051\u3044","meaning":"Uhr","romanji":"tokei","updated_at":"2013-03-21T19:08:32Z"},
{"created_at":"2013-03-21T19:08:45Z","id":81,"in_japanese":"\u3066\u30fb\u624b","meaning":"Hand","romanji":"te","updated_at":"2013-03-21T19:08:45Z"},
{"created_at":"2013-03-21T19:09:57Z","id":82,"in_japanese":"\u3064\u304d\u30fb\u6708","meaning":"Mond","romanji":"tsuki","updated_at":"2013-03-21T19:09:57Z"},
{"created_at":"2013-03-21T19:10:30Z","id":83,"in_japanese":"\u3061\u30fb\u8840","meaning":"Blut","romanji":"chi","updated_at":"2013-03-21T19:10:30Z"},
{"created_at":"2013-03-21T19:11:43Z","id":84,"in_japanese":"\u30bf\u30b3\u30fb\u9bb9\u3000\u3000","meaning":"Oktopus","romanji":"tako","updated_at":"2013-03-21T19:11:43Z"},
{"created_at":"2013-03-21T19:12:03Z","id":85,"in_japanese":"\u305d\u3057\u3066","meaning":"\"... und ...\"","romanji":"soshite","updated_at":"2013-03-21T19:15:28Z"},
{"created_at":"2013-03-21T19:12:21Z","id":86,"in_japanese":"\u305b\u304d","meaning":"Sitzplatz","romanji":"seki","updated_at":"2013-03-21T19:12:21Z"},
{"created_at":"2013-03-21T19:13:12Z","id":87,"in_japanese":"\u3059\u3044\u304b\u30fb\u6c34\u74dc","meaning":"Wassermelone","romanji":"suika","updated_at":"2013-03-21T19:13:12Z"},
{"created_at":"2013-03-21T19:14:06Z","id":88,"in_japanese":"\u3053\u3044","meaning":"Karpfen","romanji":"koi","updated_at":"2013-03-21T19:14:06Z"},
{"created_at":"2013-03-21T19:14:34Z","id":89,"in_japanese":"\u304f\u3055\u30fb\u8349","meaning":"Gras","romanji":"kusa","updated_at":"2013-03-21T19:14:34Z"},
{"created_at":"2013-03-21T19:16:04Z","id":90,"in_japanese":"\u3042\u304b\u3044\u30fb\u8d64\u3044","meaning":"rot","romanji":"akai","updated_at":"2013-03-21T19:16:04Z"},
{"created_at":"2013-03-21T19:16:24Z","id":91,"in_japanese":"\u3042\u304a\u3044\u30fb\u9752\u3044","meaning":"blau","romanji":"aoi","updated_at":"2013-03-21T19:16:24Z"},
{"created_at":"2013-03-21T19:16:45Z","id":92,"in_japanese":"\u3042\u304d\u30fb\u79cb","meaning":"Herbst","romanji":"aki","updated_at":"2013-03-21T19:16:45Z"},
{"created_at":"2013-03-21T19:17:05Z","id":93,"in_japanese":"\u3044\u3051\u30fb\u6c60","meaning":"Teich","romanji":"ike","updated_at":"2013-03-21T19:17:05Z"},
{"created_at":"2013-03-21T19:17:38Z","id":94,"in_japanese":"\u3044\u3051\u3084\u30fb\u6c60\u5c4b","meaning":"Teichgesch\u00e4ft","romanji":"ikeya","updated_at":"2013-03-21T19:17:38Z"},
{"created_at":"2013-03-21T19:18:00Z","id":95,"in_japanese":"\u304b\u304a\u30fb\u9854","meaning":"Gesicht","romanji":"kao","updated_at":"2013-03-21T19:18:00Z"},
{"created_at":"2013-03-21T19:18:59Z","id":96,"in_japanese":"\u305f\u3060\u3057\u3044\u30fb\u6b63\u3057\u3044","meaning":"richtig","romanji":"tadashii","updated_at":"2013-03-21T19:18:59Z"},
{"created_at":"2013-03-21T19:19:30Z","id":97,"in_japanese":"\u3060\u3081\u30fb\u99c4\u76ee","meaning":"falsch","romanji":"dame","updated_at":"2013-03-21T19:19:30Z"},
{"created_at":"2013-03-21T19:22:07Z","id":98,"in_japanese":"\u30da\u30fc\u30b8","meaning":"Seite","romanji":"peeji","updated_at":"2013-03-21T19:22:07Z"},
{"created_at":"2013-03-21T19:23:11Z","id":99,"in_japanese":"\u304c\u304f\u305b\u3044\u30fb\u5b66\u751f","meaning":"Student / Sch\u00fcler","romanji":"gakusei","updated_at":"2013-03-21T19:23:11Z"},
{"created_at":"2013-03-21T19:26:32Z","id":100,"in_japanese":"\u304b\u3044\u3057\u3083\u3044\u3093\u30fb\u4f1a\u793e\u54e1","meaning":"Firmenangstellter","romanji":"kaishain","updated_at":"2013-03-21T19:26:32Z"},
{"created_at":"2013-03-21T19:28:16Z","id":101,"in_japanese":"\u30a8\u30f3\u30b8\u30cb\u30a2","meaning":"Ingenieur","romanji":"enjinia","updated_at":"2013-03-21T19:28:16Z"},
{"created_at":"2013-03-21T19:28:35Z","id":102,"in_japanese":"\u3044\u3057\u3083\u30fb\u533b\u8005","meaning":"Arzt","romanji":"isha","updated_at":"2013-03-21T19:28:35Z"},
{"created_at":"2013-03-21T19:29:21Z","id":103,"in_japanese":"\u304b\u305f\u30fb\u65b9","meaning":"Person (h\u00f6fliche Form)","romanji":"kata","updated_at":"2013-03-21T19:29:21Z"},
{"created_at":"2013-03-21T19:29:47Z","id":104,"in_japanese":"\u3060\u3044\u304c\u304f\u30fb\u5927\u5b66","meaning":"Universit\u00e4t","romanji":"daigaku","updated_at":"2013-03-21T19:29:47Z"},
{"created_at":"2013-03-21T19:30:23Z","id":105,"in_japanese":"\u305b\u3093\u305b\u3044\u30fb\u5148\u751f","meaning":"Lehrer","romanji":"sensei","updated_at":"2013-03-21T19:30:23Z"},
{"created_at":"2013-03-21T19:31:22Z","id":106,"in_japanese":"\u306a\u3093\u3055\u3044\u30fb\u4f55\u6b73","meaning":"Fragewort f\u00fcr Alter","romanji":"nansai","updated_at":"2013-03-21T19:31:22Z"},
{"created_at":"2013-03-21T19:34:08Z","id":107,"in_japanese":"\u304e\u3093\u3053\u3046\u30fb\u9280\u884c","meaning":"Bank","romanji":"ginkou","updated_at":"2013-03-21T19:34:08Z"},
{"created_at":"2013-03-21T19:37:33Z","id":108,"in_japanese":"\u304d\u3087\u3046\u3057\u30fb\u6559\u5e2b","meaning":"Lehrer / Dozent / Professor","romanji":"kyoushi","updated_at":"2013-03-21T19:37:33Z"},
{"created_at":"2013-03-21T19:38:18Z","id":109,"in_japanese":"\u3058\u3057\u3087\u30fb\u8f9e\u66f8","meaning":"W\u00f6rterbuch","romanji":"jisho","updated_at":"2013-03-21T19:38:18Z"},
{"created_at":"2013-03-21T19:39:05Z","id":110,"in_japanese":"\u30b3\u30f3\u30d4\u30e5\u30fc\u30bf\u30fc","meaning":"Computer","romanji":"konpyuutaa","updated_at":"2013-03-21T19:39:05Z"},
{"created_at":"2013-03-21T19:39:27Z","id":111,"in_japanese":"\u307b\u3093\u30fb\u672c","meaning":"Buch","romanji":"hon","updated_at":"2013-03-21T19:39:27Z"},
{"created_at":"2013-03-21T19:39:52Z","id":112,"in_japanese":"\u30c6\u30ec\u30db\u30f3\u30ab\u30fc\u30c9","meaning":"Telefonkarte","romanji":"terehonkaado","updated_at":"2013-03-21T19:39:59Z"},
{"created_at":"2013-03-21T19:40:59Z","id":113,"in_japanese":"\u3056\u3063\u3057","meaning":"Zeitschrift","romanji":"zasshi","updated_at":"2013-03-21T19:40:59Z"},
{"created_at":"2013-03-21T19:41:51Z","id":114,"in_japanese":"\u3081\u3044\u3057\u30fb\u540d\u523a","meaning":"Visitenkarte","romanji":"meishi","updated_at":"2013-03-21T19:41:51Z"},
{"created_at":"2013-03-21T19:42:26Z","id":115,"in_japanese":"\u3058\u3069\u3046\u3057\u3083\u30fb\u304f\u308b\u307e","meaning":"Auto","romanji":"jidousha, kuruma","updated_at":"2013-03-21T19:42:26Z"},
{"created_at":"2013-03-21T19:42:46Z","id":116,"in_japanese":"\u304b\u3070\u3093","meaning":"Tasche","romanji":"kaban","updated_at":"2013-03-21T19:42:46Z"},
{"created_at":"2013-03-21T19:43:26Z","id":117,"in_japanese":"\u30ce\u30fc\u30c8","meaning":"Heft","romanji":"nooto","updated_at":"2013-03-21T19:43:26Z"},
{"created_at":"2013-03-21T19:44:30Z","id":118,"in_japanese":"\u3066\u3061\u3087\u3046\u30fb\u624b\u8457","meaning":"Organizer / Taschenkalender / Notizbuch","romanji":"techou","updated_at":"2013-03-21T19:44:30Z"},
{"created_at":"2013-03-21T19:45:19Z","id":119,"in_japanese":"\u3057\u3093\u3076\u3093","meaning":"Zeitung","romanji":"shinbun","updated_at":"2013-03-21T19:45:19Z"},
{"created_at":"2013-03-21T19:45:51Z","id":120,"in_japanese":"\u30dc\u30fc\u30eb\u30da\u30f3","meaning":"Kugelschreiber","romanji":"boorupen","updated_at":"2013-03-21T19:45:51Z"},
{"created_at":"2013-03-21T19:46:29Z","id":121,"in_japanese":"\u30b7\u30e3\u30fc\u30d7\u30da\u30f3\u30b7\u30eb","meaning":"Druckbleistift","romanji":"shaapupenshiru","updated_at":"2013-03-21T19:46:29Z"},
{"created_at":"2013-03-21T19:46:57Z","id":122,"in_japanese":"\u3064\u304f\u3048\u30fb\u673a","meaning":"Tisch","romanji":"tsukue","updated_at":"2013-03-21T19:46:57Z"},
{"created_at":"2013-03-21T19:47:26Z","id":123,"in_japanese":"\u30ab\u30e1\u30e9","meaning":"Kamera","romanji":"kamera","updated_at":"2013-03-21T19:47:26Z"},
{"created_at":"2013-03-21T19:47:57Z","id":124,"in_japanese":"\u3044\u3059\u30fb\u6905\u5b50","meaning":"Stuhl / Hocker","romanji":"isu","updated_at":"2013-03-21T19:47:57Z"},
{"created_at":"2013-03-21T19:48:34Z","id":125,"in_japanese":"\u30c6\u30fc\u30d7","meaning":"Kassette","romanji":"teepu","updated_at":"2013-03-21T19:48:34Z"},
{"created_at":"2013-03-21T19:49:11Z","id":126,"in_japanese":"\u30e9\u30b8\u30aa","meaning":"Radio","romanji":"rajio","updated_at":"2013-03-21T19:49:11Z"}];
