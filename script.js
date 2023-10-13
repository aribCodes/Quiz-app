var ques = [
    {
        question: 'Where is the correct place to insert a JavaScript?',
        opt1: 'The <head> section',
        opt2: 'The <body> section',
        opt3: 'Both the sections',
        answer: 'Both the sections'
    },
    {
        question: 'What is the correct syntax for referring to an external script called "abc.js" ?',
        opt1: '<script name="abc.js">',
        opt2: '<script href="abc.js">',
        opt3: '<script src="abc.js">',
        answer: '<script src="abc.js">'
    },
    {
        question: 'The external JavaScript file must contain the "script" tag.',
        opt1: 'False',
        opt2: 'True',
        answer: 'False'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        opt1: 'alertBox("Hello World!")',
        opt2: 'msg("Hello World!")',
        opt3: 'alert("Hello World!")',
        answer: 'alert("Hello World!")'
    },
    {
        question: 'How do you create a function in JavaScript?',
        opt1: 'function = myFunction()',
        opt2: 'function:myFunction()',
        opt3: 'function myFunction()',
        answer: 'function myFunction()'
    },
    {
        question: 'How do you call a function named "myFunction"?',
        opt1: 'call function myFunction()',
        opt2: 'myFunction()',
        opt3: 'call myFunction()',
        answer: 'myFunction()'
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        opt1: 'if i==5',
        opt2: 'if(i == 5)',
        opt3: 'if(i = 5)',
        answer: 'if(i == 5)'
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        opt1: 'Math.round(7.25)',
        opt2: 'round(7.25)',
        opt3: 'rnd(7.25)',
        answer: 'Math.round(7.25)'
    },
    {
        question: 'How do you find the number with the highest value of x and y?',
        opt1: 'top(x,y)',
        opt2: 'Math.max(x,y)',
        opt3: 'Math.ceil(x,y)',
        answer: 'Math.max(x,y)'
    },
    {
        question: 'JavaScript is the same as Java.',
        opt1: 'True',
        opt2: 'False',
        answer: 'False'
    }
];

// the above 4 lines are to shuffle the array
shuffle(ques);
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

var index = 0;
var ans = [];  // array to store answers
var total_score = 0; // variable to store total score

// getting username from local storage
var username = JSON.parse(localStorage.getItem("login")).nameof;

//displaying name of the user 
document.getElementById("greeting").innerHTML = username;

// hiding html div with id 'optDisplay'
document.getElementById("optDisplay").style.display = "none";

// hiding button with id 'nextBtn'
document.getElementById("nextBtn").style.display = "none";

// hiding div with id 'result'
document.getElementById("result").style.display = "none";

var questions = () => {
    // hiding start quiz text and button by targeting its div
    document.getElementById("startQuiz").style.display = "none";

    // displaying questions
    document.getElementById("question").innerHTML = `Q${index+1}) ${ques[index].question}`;
    // displaying html div with id 'optDisplay'
    document.getElementById("optDisplay").style.display = "block";

    // now displaying options on label1, label2
    document.getElementById("label1").innerText = ques[index].opt1;
    document.getElementById("label2").innerText = ques[index].opt2;

    // setting values of input option(1 & 2)
    document.getElementById("input1").setAttribute("value",ques[index].opt1);
    document.getElementById("input2").setAttribute("value",ques[index].opt2);

    // if any question does not have option 3 then 3rd input(option) will be removed
    if(ques[index].opt3 === undefined)
    {
        // hiding input3(3rd option) and its label3(label)
        document.getElementById("input3").style.display = "none";
        document.getElementById("label3").style.display = "none";

        // setting values of input option(3)
        document.getElementById("input3").setAttribute("value",undefined);
    }
    else{
        document.getElementById("input3").style.display = "inline";
        document.getElementById("label3").style.display = "inline";

        // setting values of input option(3)
        document.getElementById("input3").setAttribute("value",ques[index].opt3);

        // now displaying options on label3
        document.getElementById("label3").innerText = ques[index].opt3;
    }

    if(index < 9)
    {
        // displaying hidden next button
        document.getElementById("nextBtn").style.display = "block";

        // incrementing the index of ques array
        index = index + 1;
    }
    else{
        document.getElementById("nextBtn").remove();

        // creating submit button and adding it to the main div as its child
        var submit_btn = document.createElement("button");
        submit_btn.setAttribute("id","submitBtn");
        var text = document.createTextNode("Submit");
        submit_btn.appendChild(text);
        document.getElementById("main").appendChild(submit_btn);

        // submitting the quiz
        document.getElementById("submitBtn").addEventListener("click",() => {
            score();
            document.getElementById("submitBtn").remove();
        });
    }
}
function getvalue(){
    var ele = document.getElementsByName("choose");
    var temp;

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        {
            ans.push(ele[i].value);
            temp = ele[i].value;
        }
    }
    if(!temp)
    {
        ans.push(0);
    }
    questions();
}

var check = [];  // it will carry the right and wrong answers
function score(){
    // displaying div with id 'result'
    document.getElementById("result").style.display = "block";

    var ele = document.getElementsByName("choose");

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
            ans.push(ele[i].value);
    }

    var i = 0;
    ques.forEach((element) => {
        if(element.answer === ans[i])
        {
            check.push("Correct Answer");
            total_score = total_score + 1;
            i = i + 1;
        }
        else{
            check.push("Wrong Answer");
            i = i + 1;
        }   
    });
    var r = document.querySelector(':root');
    r.style.setProperty('--scorebar', `${total_score*10}%`);

    document.getElementById("score").innerHTML = `Score Acheived: ${total_score} / 10`;
    document.getElementById("quesDisplay").style.display = "none";
}

var signout = () => {
    localStorage.removeItem('login');
    location.href = "index.html";
}