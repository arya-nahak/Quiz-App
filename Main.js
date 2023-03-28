// Code By Arya
function QuizApp() {
  let mainObj = {
    isInit: false,
    score: 0,
    currentQuestion: 0,
    totalQuestion:quiz.JS.length,
    selectedopt:"",
    init: function (prev, next,qID,question,options,result) {
      if (!mainObj.isInit) {
        mainObj.prev_button = document.querySelector(prev);
        mainObj.next_button = document.querySelector(next);
        mainObj.questionID = document.querySelector(qID);
        mainObj.question = document.querySelector(question);
        mainObj.options = document.querySelector(options);
        mainObj.result = document.querySelector(result);
    
        
        mainObj.prev(mainObj.prev_button);
        mainObj.next(mainObj.next_button);
        mainObj.loadfunc()
        mainObj.displayQuiz(0);
        // mainObj.showResult();
        // mainObj.checkAnswer();
        mainObj.changeQuestion(mainObj.currentQuestion);
      }
    },
    displayQuiz(anoy) {
        // console.log(mainObj.totalQuestion)
        mainObj.currentQuestion = anoy;

        if(mainObj.currentQuestion < mainObj.totalQuestion ){
            // $("#tque").html(mainObj.totalQuestion);
            $(mainObj.prev_button).attr("disabled", false);
            $(mainObj.next_button).attr("disabled", false);
            $(mainObj.questionID).html(quiz.JS[mainObj.currentQuestion].id + '.');
            $(mainObj.question).html(quiz.JS[mainObj.currentQuestion].question);
            $(mainObj.options).html("");

            for (var key in quiz.JS[mainObj.currentQuestion].options[0]) {
                if (quiz.JS[mainObj.currentQuestion].options[0].hasOwnProperty(key)) {
          
                  $(mainObj.options).append(
                      "<div class='form-check option-block'>" +
                      "<label class='form-check-label'>" +
                                "<input type='radio' class='form-check-input' name='option'   id='q"+key+"' value='" + quiz.JS[mainObj.currentQuestion].options[0][key] + "'><span id='optionval'>" +
                                    quiz.JS[mainObj.currentQuestion].options[0][key] +
                               "</span></label>"
                  );
                }
              }

        }

        if(mainObj.currentQuestion <= 0){
            $(mainObj.prev_button).attr("disabled", true);
        }

        if(mainObj.currentQuestion >= mainObj.totalQuestion){
            $(mainObj.next_button).attr("disabled", true);

            for(var i = 0; i < mainObj.totalQuestion; i++) {
                mainObj.score = mainObj.score + quiz.JS[i].score;
            }

            mainObj.showResult(this.score);
        }
    },
    prev(prev) {
      prev.addEventListener("click", (e) => {
        e.preventDefault();
        if (mainObj.selectedopt) {
            mainObj.checkAnswer(mainObj.selectedopt);
          }
          mainObj.changeQuestion(-1);
      });
    },
    next(next) {
      next.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(mainObj.selectedopt)
        if (mainObj.selectedopt) {
            mainObj.checkAnswer(mainObj.selectedopt);
          }
          mainObj.changeQuestion(1);
      });
    },showResult(score){
        $(mainObj.result).addClass('result');
        $(mainObj.result).html("<h1 class='res-header'>Total Score: &nbsp;" + score  + '/' + mainObj.totalQuestion + "</h1>");
        for(var j = 0; j < mainObj.totalQuestion; j++) {
			var res;
			if(quiz.JS[j].score == 0) {
					res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
			} else {
				res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
			}
			$(mainObj.result).append(
			'<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
			'<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
			'<div class="last-row"><b>Score:</b> &nbsp;' + res +
			
			'</div>' 
			
			);
			
		}
    },checkAnswer(option){
        var answer = quiz.JS[mainObj.currentQuestion].answer;
		option = option.replace(/\</g,"&lt;")   //for <
		option = option.replace(/\>/g,"&gt;")   //for >
		option = option.replace(/"/g, "&quot;")

		if(option ==  quiz.JS[mainObj.currentQuestion].answer) {
			if(quiz.JS[mainObj.currentQuestion].score == "") {
				quiz.JS[mainObj.currentQuestion].score = 1;
				quiz.JS[mainObj.currentQuestion].status = "correct";
		}
		} else {
			quiz.JS[mainObj.currentQuestion].status = "wrong";
		}
    },changeQuestion(anoy){
        console.log(anoy,"----")
        console.log(mainObj.currentQuestion,"-----------")
        mainObj.currentQuestion = mainObj.currentQuestion + anoy
        mainObj.displayQuiz(mainObj.currentQuestion)
        
    },
    loadfunc(){
        mainObj.displayQuiz(0);
        $(mainObj.options).on(
            "change",
            "input[type=radio][name=option]",
            function (e) {
              //var radio = $(this).find('input:radio');
              $(this).prop("checked", true);
              mainObj.selectedopt = $(this).val();
            }
          );
    }

    
  };
  return {
    init: mainObj.init,
  };
}

let quizApp = new QuizApp();

quizApp.init("#previous", "#next" , "#qid" , "#question" , "#question-options","#result");