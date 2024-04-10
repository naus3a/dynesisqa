var curStep = 0;
var curService = 0;
var serviceNames = [
    "messaging",
    "branding",
    "ux"
];
var qaSections = []

var qaResult = {};
var bContactsClearOnFocus = [true, true, true];

function hideAllQASections(){
    for(var i=0;i<qaSections.length;i++){
        qaSections[i].style.display = "none";
    }
}

function showSection(el){
    el.style.display = "block";
}

function showOnlyQASection(idx){
    hideAllQASections();
    showSection(qaSections[idx]);
}

function startMessaging(){
    curService = 0;
    qaResult.service = serviceNames[curService];
    goLetsGo();
}

function startBranding(){
    curService = 1;
    qaResult.service = serviceNames[curService];
    goLetsGo();
}

function startUX(){
    curService = 2;
    qaResult.service = serviceNames[curService];
    goLetsGo();
}

function addButtonCallback(elId, callback){
    var el = document.getElementById(elId);
    if(el===undefined){
        console.log("ERROR: cannot find "+elId);
        return;
    }
    el.onclick = callback;
}

function addButtonClassCallback(elClass, callback){
    var els = document.getElementsByClassName(elClass);
    if(els===undefined){
        console.log("ERROR: cannot find "+elClass);
        return;
    }
    for(var i=0;i<els.length;i++){
        els[i].onclick = callback;
    }
}

function getInputText(elId){
    var el = document.getElementById(elId);
    if(el===undefined || el===null){
        console.log("ERROR: cannot find "+elId);
        return "";
    }
    return el.value;
}

function makeQuestionInputId(qNum){
    return "qa-"+qaResult.service+"-input-"+qNum;
}

function goLetsGo(){
    curStep = 1;
    showOnlyQASection(curStep);
    console.log(qaResult.service+" selected");
}

function goQuestion1(){
    curStep = 2 + (curService*3);
    showOnlyQASection(curStep);
    console.log(serviceNames[curService]+" question 1");
}

function goQuestion2(){
    var txt = getInputText(makeQuestionInputId(1));
    qaResult.q1 = txt;
    curStep = 2 + (curService*3) + 1;
    showOnlyQASection(curStep);
    console.log(serviceNames[curService]+" question 2");
}

function goQuestion3(){
    var txt = getInputText(makeQuestionInputId(2));
    qaResult.q2 = txt;
    curStep = 2 + (curService*3) + 2;
    showOnlyQASection(curStep);
    console.log(serviceNames[curService]+" question 3");
}

function goContacts(){
    var txt = getInputText(makeQuestionInputId(3));
    qaResult.q3 = txt;
    curStep = 11;
    showOnlyQASection(curStep);
    console.log("contacts");
}

function goEnd(){
    bContactsClearOnFocus = [true, true, true];

    qaResult.name = getInputText("qa-contacts-name");
    qaResult.company = getInputText("qa-contacts-company");
    qaResult.email = getInputText("qa-contacts-email");
    var elInput = document.getElementById("qa-contacts-result");
    elInput.value = JSON.stringify(qaResult);
    curStep = 12;
    showOnlyQASection(curStep);
    console.log("end");
}

function resetQA(){
    console.log("reset QA");
    bContactsClearOnFocus = [true, true, true];
    qaResult = {
        service: "",
        q1: "",
        q2: "",
        q2: "",
        name: "",
        company: "",
        email: ""
    };
    curStep = 0;

    qaSections = [
        document.getElementById("qa-start"),
        document.getElementById("qa-letsgo"),
        document.getElementById("qa-messaging-1"),
        document.getElementById("qa-messaging-2"),
        document.getElementById("qa-messaging-3"),
        document.getElementById("qa-branding-1"),
        document.getElementById("qa-branding-2"),
        document.getElementById("qa-branding-3"),
        document.getElementById("qa-ux-1"),
        document.getElementById("qa-ux-2"),
        document.getElementById("qa-ux-3"),
        document.getElementById("qa-contacts"),
        document.getElementById("qa-end")
    ];

    addButtonCallback("btnMessaging", startMessaging);
    addButtonCallback("btnBranding", startBranding);
    addButtonCallback("btnUX", startUX);
    addButtonCallback("btnSubmit", goEnd);

    addButtonCallback("btnLetsgo", goQuestion1);
    addButtonClassCallback("btn-question1", goQuestion2);
    addButtonClassCallback("btn-question2", goQuestion3);
    addButtonClassCallback("btn-question3", goContacts);

    showOnlyQASection(curStep);
}