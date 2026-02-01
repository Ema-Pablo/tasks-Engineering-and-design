    $(document).ready(function(){

  var taskProcessor = new TaskProcessor(3);

  taskProcessor.on = function (eventType) {
      var self = this;
      if ('browser_updated' == eventType) {
          $('.robot', taskProcessor.getPreviewDocument()).on('click', $.proxy(function () {
              $('.robot', taskProcessor.getPreviewDocument()).toggleClass('robot-paused');
          }, this));
          setTimeout(function () { self.checkGoals(); }, 200);
      }
  }

  taskProcessor.checkGoal1 = function(){
    var keyframes = this.findKeyframesRule('move');

    if (keyframes && keyframes.cssRules.length === 1) {
      
      return keyframes.cssRules[0].keyText === '100%' &&
             this.getPrefPropValue(keyframes.cssRules[0].style, 'left') === '400px';
    }

    return false;
  };

  taskProcessor.checkGoal2 = function(){
    var st = window.getComputedStyle(this.getPreviewDocument().querySelector('.robot'), null);

    return this.getPrefPropValue(st, 'animation-name') === 'move';
  };

  taskProcessor.checkGoal3 = function(){
    var result = false;

    $('body', this.getPreviewDocument()).append('<div class="robot robot-paused constructor robot-test"></div>');
    
    var el = this.getPreviewDocument().querySelector('.robot-test');
    var st = window.getComputedStyle(el, null);

    if (this.getPrefPropValue(st, 'animation-play-state') === 'paused') {
      result = true;
    }

    $('.robot-test', this.getPreviewDocument()).remove();
    return result;
  };

  taskProcessor.findKeyframesRule = function (rule) {
    var doc = this.getPreviewDocument();
    var ss = doc.styleSheets;
    var ruleType = window.CSSRule.WEBKIT_KEYFRAMES_RULE || window.CSSRule.KEYFRAMES_RULE;

    for (var i = 0; i < ss.length; ++i) {
      var rules = ss[i].rules || ss[i].cssRules;

      for (var j = 0; j < rules.length; ++j) {
        if (rules[j].type == ruleType && rules[j].name == rule) { 
          return rules[j]; 
        }
      }
    }
    return null;
  }

  taskProcessor.getPrefPropValue = function (st, prop) {
    return st.getPropertyValue("-webkit-" + prop) ||
        st.getPropertyValue("-moz-" + prop) ||
        st.getPropertyValue("-ms-" + prop) ||
        st.getPropertyValue("-o-" + prop) ||
        st.getPropertyValue(prop) ||
        null;
  }

  HtmlacademyTask.setTaskProcessor(taskProcessor);
  HtmlacademyTask.enableReloadButton();
  HtmlacademyTask.enablePrefixFree();

  var taskAnswers = [{
      goal: 1,
      editor: 'css',
      data: {
          tooltip: 'Создадим анимацию <code>move</code>.',
          actions: [{
              action: 'addLine',
              cursorPosition: {
                  row: 5,
                  column: 0
              },
              to: '\n@keyframes move {'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 7,
                  column: 4
              },
              to: 'to {'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 8,
                  column: 8
              },
              to: 'left: 400px;'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 9,
                  column: 4
              },
              to: '}'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 10,
                  column: 0
              },
              to: '}'
          }]
      }
  }, {
      goal: 2,
      editor: 'css',
      data: {
          tooltip: 'Зададим для <code>.robot</code> анимацию <code>move</code>.',
          actions: [{
              action: 'addLine',
              cursorPosition: {
                  row: 1,
                  column: 4
              },
              to: 'animation-name: move;'
          }]
      }
  }, {
      goal: 3,
      editor: 'css',
      data: {
          tooltip: 'Для <code>.robot-paused</code> зададим свойство <code>animation-play-state</code>, ставящее анимацию на паузу.',
          actions: [{
              action: 'addLine',
              cursorPosition: {
                  row: 12,
                  column: 0
              },
              to: '\n.robot-paused {'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 14,
                  column: 4
              },
              to: 'animation-play-state: paused;'
          }, {
              action: 'addLine',
              cursorPosition: {
                  row: 15,
                  column: 0
              },
              to: '}'
          }]
      }
  }];

  HtmlacademyTask.addAnswers(taskAnswers);

});