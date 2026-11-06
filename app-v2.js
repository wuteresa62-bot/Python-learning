(function(){
"use strict";
var bank=[
{id:"name-1",skill:"变量命名",type:"单项选择",kind:"choice",title:"下面哪一个是合法、清晰的 Python 变量名？",options:["2nd_score","user score","user_score","class"],answer:2,explain:"Python 变量名可以包含字母、数字和下划线，但不能以数字开头，也不能使用 class 这样的关键字。user_score 同时清楚表达了变量用途。",optionNotes:["变量名不能以数字开头。","变量名中不能包含空格。","","class 是 Python 关键字，不能用作普通变量名。"]},
{id:"name-2",skill:"变量命名",type:"同类强化",kind:"choice",title:"要保存购物车的商品总价，哪个变量名最合适？",options:["x","total_price","1price","total-price"],answer:1,explain:"total_price 使用下划线连接单词，符合 Python 常见命名习惯，而且一眼就能看出它保存的是总价。",optionNotes:["x 虽然合法，但含义不清楚。","","变量名不能以数字开头。","连字符 - 会被当作减号。"]},
{id:"name-3",skill:"变量命名",type:"同类强化",kind:"choice",title:"下面哪个变量名会因为以数字开头而报错？",options:["score2","score_2","2_score","second_score"],answer:2,explain:"2_score 以数字 2 开头，因此不是合法变量名；数字可以出现在变量名中，但不能放在第一位。",optionNotes:["这个名称合法，数字没有放在开头。","这个名称合法。","","这个名称合法且含义清楚。"]},
{id:"name-4",skill:"变量命名",type:"多项选择",kind:"multi",title:"选出所有合法的 Python 变量名。",options:["student_name","student-name","_score","for"],answer:[0,2],explain:"student_name 和 _score 都合法；连字符会被解释为减号，而 for 是 Python 关键字。"},
{id:"name-5",skill:"变量命名",type:"同类强化",kind:"choice",title:"保存用户是否已经登录，哪个名字最容易理解？",options:["a","login","is_logged_in","user1"],answer:2,explain:"布尔变量常用 is_、has_ 等开头。is_logged_in 能直接表达“是否已登录”。",optionNotes:["含义太模糊。","login 更像动作，不能明确表示真假状态。","","user1 看不出保存的是登录状态。"]},

{id:"assign-1",skill:"赋值",type:"代码填空",kind:"input",title:"补全代码，把数字 18 保存到变量 age 中。",code:"age ___ 18",answer:"=",explain:"单个等号 = 是赋值运算符：把右边的值 18 保存到左边的变量 age 中。"},
{id:"assign-2",skill:"赋值",type:"同类强化",kind:"input",title:"补全代码，把字符串“小林”保存到 name 中。",code:'name ___ "小林"',answer:"=",explain:"这里是在创建变量并保存数据，所以使用赋值运算符 =。"},
{id:"assign-3",skill:"赋值",type:"判断输出",kind:"input",title:"变量可以被更新。下面代码输出什么？",code:"score = 5\nscore = score + 2\nprint(score)",answer:"7",explain:"第一行 score 是 5；第二行先计算右边的 5 + 2，再把结果 7 重新保存到 score。"},
{id:"assign-4",skill:"赋值",type:"找出错误",kind:"choice",title:"哪一行代码正确地把 10 保存到 count？",options:["10 = count","count == 10","count = 10","count :=: 10"],answer:2,explain:"赋值时变量名写在左边，值写在右边，中间使用一个等号。",optionNotes:["赋值方向反了，值不能放在左边。","== 用于比较两个值是否相等，不是普通赋值。","","Python 没有 :=: 这种写法。"]},
{id:"assign-5",skill:"赋值",type:"同类强化",kind:"input",title:"运行后 points 的最终值是多少？",code:"points = 10\npoints = 3\nprint(points)",answer:"3",explain:"后一次赋值会替换变量原先保存的值，因此 points 最终是 3。"},

{id:"type-1",skill:"数据类型",type:"多项选择",kind:"multi",title:"哪些值属于字符串（str）？",options:['"42"',"42",'"Python"',"True"],answer:[0,2],explain:"字符串必须被引号包围。即使内容看起来像数字，只要有引号，仍然是字符串。"},
{id:"type-2",skill:"数据类型",type:"同类强化",kind:"choice",title:"值 3.14 属于哪一种数据类型？",options:["str 字符串","int 整数","float 浮点数","bool 布尔值"],answer:2,explain:"带小数点的数字通常属于 float（浮点数）类型。",optionNotes:["它没有引号，不是字符串。","int 是没有小数部分的整数。","","bool 只有 True 和 False 两个值。"]},
{id:"type-3",skill:"数据类型",type:"同类强化",kind:"choice",title:"下面哪个值是整数（int）？",options:['"8"',"8","8.0","False"],answer:1,explain:"8 没有引号也没有小数点，是整数；\"8\" 是字符串，8.0 是浮点数。",optionNotes:["有引号，所以是字符串。","","有小数点，所以是 float。","False 是布尔值。"]},
{id:"type-4",skill:"数据类型",type:"判断输出",kind:"input",title:"下面代码会输出什么数据类型名称？",code:'value = "12"\nprint(type(value).__name__)',answer:"str",explain:"12 被引号包围，因此 value 保存的是字符串，类型名称为 str。"},
{id:"type-5",skill:"数据类型",type:"多项选择",kind:"multi",title:"选出所有布尔值（bool）。",options:["True","False",'"True"',"0"],answer:[0,1],explain:"Python 的布尔值只有 True 和 False，而且首字母必须大写；带引号的 \"True\" 是字符串。"},

{id:"output-1",skill:"输出",type:"判断输出",kind:"input",title:"运行下面的代码，会输出什么？",code:'city = "杭州"\nyear = 2026\nprint(city, year)',answer:"杭州 2026",explain:"print() 接收多个值时，默认在值之间加入一个空格。"},
{id:"output-2",skill:"输出",type:"同类强化",kind:"input",title:"运行下面代码，完整输出是什么？",code:'name = "小雨"\nlessons = 4\nprint(name, "完成了", lessons, "课")',answer:"小雨 完成了 4 课",explain:"print() 中的四个值按顺序输出，彼此之间默认用一个空格分隔。"},
{id:"output-3",skill:"输出",type:"代码填空",kind:"input",title:"让程序输出“我学了 5 课”。填写缺少的变量名。",code:'lessons = 5\nprint("我学了", ___, "课")',answer:"lessons",explain:"变量 lessons 保存了数字 5，把它传给 print() 就能输出对应的值。"},
{id:"output-4",skill:"输出",type:"找出错误",kind:"choice",title:"想输出变量 name 的值，哪种写法正确？",options:['print("name")',"print(name)","output(name)","print = name"],answer:1,explain:"print(name) 会读取变量的值；print(\"name\") 输出的只是文字 name。",optionNotes:['引号会让 name 变成普通字符串。',"","Python 没有内置的 output() 函数。","这会尝试给 print 赋值，不是在调用函数。"]},
{id:"output-5",skill:"输出",type:"同类强化",kind:"input",title:"下面代码输出什么？",code:'word = "Py"\nprint(word, word)',answer:"Py Py",explain:"同一个变量可以多次传给 print()；两个输出值之间有一个空格。"},

{id:"bool-1",skill:"布尔值",type:"找出错误",kind:"choice",title:"这段代码为什么会报错？",code:"is_fun = true\nprint(is_fun)",options:["变量名太短","true 应写成 True","print 不能输出变量","= 应写成 =="],answer:1,explain:"Python 的布尔值是 True 和 False，首字母必须大写。小写 true 会被当成一个未定义的变量名。",optionNotes:["is_fun 是清楚且合法的变量名。","","print 可以正常输出布尔变量。","这里是在赋值，应当使用 =。"]},
{id:"bool-2",skill:"布尔值",type:"同类强化",kind:"input",title:"下面代码会输出什么？",code:"is_ready = False\nprint(is_ready)",answer:"False",explain:"变量 is_ready 保存了布尔值 False，print() 会原样输出 False。"},
{id:"bool-3",skill:"布尔值",type:"同类强化",kind:"choice",title:"表示“课程已经完成”，哪一行最合适？",options:['finished = "yes"',"is_finished = True","finished = 1.0","True = finished"],answer:1,explain:"is_finished 清楚表达真假状态，True 是标准布尔值。",optionNotes:["字符串 yes 可以保存信息，但不如布尔值直接。","","1.0 是浮点数。","True 是值，不能放在赋值号左边。"]},
{id:"bool-4",skill:"布尔值",type:"多项选择",kind:"multi",title:"哪些写法创建了布尔变量？",options:["has_ticket = True","is_open = False",'ready = "True"',"done = 0"],answer:[0,1],explain:"只有没有引号的 True 和 False 是布尔值；\"True\" 是字符串，0 是整数。"}
];

var byId={};bank.forEach(function(q){byId[q.id]=q});
var starter=["name-1","assign-1","output-1","type-1","bool-1","output-3","name-4","type-2"];
var key="py-step-adaptive-v2",old={};
try{old=JSON.parse(localStorage.getItem("py-step-state")||"{}")}catch(e){}
var base={version:2,queue:starter.slice(),pos:0,solved:[],attempts:{},wrong:{},xp:old.xp||0,streak:old.streak||1,challenge:old.challenge||false};
var state;
try{state=Object.assign({},base,JSON.parse(localStorage.getItem(key)||"{}"))}catch(e){state=Object.assign({},base)}
if(state.version!==2||!Array.isArray(state.queue)){state=Object.assign({},base)}
var selected=[],checked=false;

function el(s){return document.querySelector(s)}
function els(s){return Array.from(document.querySelectorAll(s))}
function safe(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function save(){localStorage.setItem(key,JSON.stringify(state));updateStats()}
function toast(s){var t=el("#toast");t.textContent=s;t.classList.add("show");setTimeout(function(){t.classList.remove("show")},1800)}
function currentQ(){return byId[state.queue[state.pos]]||byId[starter[0]]}
function switchTab(id){els(".tab,.tab-panel").forEach(function(x){x.classList.remove("active")});el('[data-tab="'+id+'"]').classList.add("active");el("#"+id).classList.add("active")}
function answerText(q){
 var a=Array.isArray(q.answer)?q.answer:[q.answer];
 if(q.kind==="input")return String(q.answer);
 return a.map(function(i){return String.fromCharCode(65+i)+". "+q.options[i]}).join("、");
}
function userAnswerText(q){
 if(q.kind==="input")return (el("#answerInput").value||"").trim();
 return selected.map(function(i){return String.fromCharCode(65+i)+". "+q.options[i]}).join("、");
}
function pendingReview(){return state.queue.slice(state.pos+1).filter(function(id){return (state.attempts[id]||0)>0}).length}
function ensureAdaptiveNote(){
 if(el("#adaptiveNote"))return;
 var n=document.createElement("div");n.id="adaptiveNote";n.className="adaptive-note";
 el("#practice .qtop").insertAdjacentElement("afterend",n);
}
function render(){
 ensureAdaptiveNote();
 var q=currentQ(),html="<h2>"+q.title+"</h2>";checked=false;selected=[];
 if(q.code)html+="<pre>"+safe(q.code)+"</pre>";
 if(q.kind==="choice"||q.kind==="multi")html+='<div class="choices">'+q.options.map(function(o,i){return '<button class="choice" data-i="'+i+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+safe(o)+"</span></button>"}).join("")+"</div>";
 else html+='<input class="answer" id="answerInput" autocomplete="off" placeholder="在这里输入答案">';
 el("#questionBox").innerHTML=html;
 el("#qType").textContent=q.type+" · "+q.skill;
 el("#qIndex").textContent=(state.pos+1)+" / "+state.queue.length+(state.attempts[q.id]?" · 再练一次":"");
 el("#adaptiveNote").innerHTML=state.attempts[q.id]?'<b>强化练习</b> 这道题来自你的错题记录，答对后才算真正掌握。':'答错后会自动加入同知识点变式题，并在稍后重现原题。';
 el("#feedback").className="feedback";el("#feedback").innerHTML="";
 el("#checkBtn").style.display="inline-block";el("#nextBtn").style.display="none";el("#nextBtn").textContent="下一题 →";el("#prevBtn").disabled=state.pos===0;
 els(".choice").forEach(function(b){b.onclick=function(){if(checked)return;var i=Number(b.dataset.i);if(q.kind==="choice"){selected=[i];els(".choice").forEach(function(x){x.classList.toggle("selected",x===b)})}else{if(selected.indexOf(i)>-1)selected=selected.filter(function(x){return x!==i});else selected.push(i);b.classList.toggle("selected")}}});
 if(el("#answerInput"))el("#answerInput").onkeydown=function(e){if(e.key==="Enter")check()};
 updateStats();
}
function scheduleReview(q){
 var future=state.queue.slice(state.pos+1);
 var candidates=bank.filter(function(x){return x.skill===q.skill&&x.id!==q.id&&future.indexOf(x.id)===-1&&state.solved.indexOf(x.id)===-1});
 var variant=null;
 if(candidates.length)variant=candidates[((state.wrong[q.skill]||1)-1)%candidates.length];
 if(variant)state.queue.splice(Math.min(state.pos+2,state.queue.length),0,variant.id);
 if(state.queue.slice(state.pos+1).indexOf(q.id)===-1)state.queue.splice(Math.min(state.pos+4,state.queue.length),0,q.id);
}
function mistakeNote(q){
 if(q.kind==="input")return "你填写的是“"+safe(userAnswerText(q))+"”。请结合上面的赋值方向、数据类型或输出顺序再检查一次。";
 var answers=Array.isArray(q.answer)?q.answer:[q.answer];
 var wrongSelected=selected.filter(function(i){return answers.indexOf(i)===-1});
 if(q.optionNotes&&wrongSelected.length)return wrongSelected.map(function(i){return "<b>"+String.fromCharCode(65+i)+"：</b>"+q.optionNotes[i]}).join("<br>");
 if(q.kind==="multi")return "多选题必须选中所有正确项，并且不能多选错误项。";
 return "把题干中的规则与每个选项逐一核对，再判断答案。";
}
function check(){
 var q=currentQ(),ok=false,input=el("#answerInput");
 if(q.kind==="choice")ok=selected[0]===q.answer;
 else if(q.kind==="multi")ok=selected.slice().sort().join(",")===q.answer.slice().sort().join(",");
 else ok=(input.value||"").trim().replace(/\s+/g," ")===String(q.answer);
 if((q.kind==="choice"||q.kind==="multi")&&!selected.length){toast("先选择答案吧");return}
 if(q.kind==="input"&&!input.value.trim()){toast("先写下答案吧");return}
 checked=true;
 if(q.kind!=="input")els(".choice").forEach(function(b){var i=Number(b.dataset.i),answers=Array.isArray(q.answer)?q.answer:[q.answer];if(answers.indexOf(i)>-1)b.classList.add("correct");else if(selected.indexOf(i)>-1)b.classList.add("wrong")});
 var f=el("#feedback");
 if(ok){
   var first=state.solved.indexOf(q.id)===-1;if(first){state.solved.push(q.id);state.xp+=20}
   f.className="feedback show good";
   f.innerHTML='<div class="feedback-title">'+(state.attempts[q.id]?"这次答对了，已经掌握！":"答对了！")+(first?" +20 XP":"")+'</div><div class="explain-row"><b>讲解：</b>'+q.explain+"</div>";
 }else{
   state.attempts[q.id]=(state.attempts[q.id]||0)+1;state.wrong[q.skill]=(state.wrong[q.skill]||0)+1;
   scheduleReview(q);
   f.className="feedback show bad";
   f.innerHTML='<div class="feedback-title">这次没答对，先把思路弄清楚</div><div class="answer-key"><b>正确答案：</b>'+safe(answerText(q))+'</div><div class="explain-row"><b>讲解：</b>'+q.explain+'</div><div class="mistake-row"><b>针对你的答案：</b><br>'+mistakeNote(q)+'</div><div class="retry-note">已加入 1 道“'+q.skill+'”变式题；这道原题也会在间隔几题后再次出现。</div>';
 }
 save();el("#checkBtn").style.display="none";el("#nextBtn").style.display="inline-block";
 if(state.pos>=state.queue.length-1)el("#nextBtn").textContent="进入综合挑战 →";
}
function updateStats(){
 var n=Math.min(state.solved.length,starter.length),p=Math.round(n/starter.length*100);
 el("#xp").textContent=state.xp+" XP";el("#streak").textContent=(state.streak||1)+" 天";
 el("#scoreText").textContent=n+" / "+starter.length+" · 待强化 "+pendingReview();
 el("#ring").style.setProperty("--p",p);el("#ringPercent").textContent=p+"%";el("#sidePercent").textContent=p+"%";el("#sideBar").style.width=p+"%";
 el("#masterTitle").textContent=p===100?"基础目标达成":p>=60?"渐入佳境":p>0?"正在进步":"刚刚开始";
 el("#masterCopy").textContent=p===100?"继续完成错题强化，知识才会真正稳固。":pendingReview()?"队列里还有 "+pendingReview()+" 道错题或变式题。":"答错后系统会自动安排同类强化题。";
}
function unlock(){if(el('[data-stage="1"] .lock'))el('[data-stage="1"] .lock').textContent="→"}
els(".tab").forEach(function(b){b.onclick=function(){switchTab(b.dataset.tab)}});
el("#startPractice").onclick=function(){switchTab("practice");render()};
el("#checkBtn").onclick=check;
el("#prevBtn").onclick=function(){if(state.pos>0){state.pos--;save();render()}};
el("#nextBtn").onclick=function(){if(state.pos<state.queue.length-1){state.pos++;save();render()}else switchTab("challenge")};
el("#dailyBtn").onclick=function(){var d=new Date().toDateString();if(localStorage.getItem("py-step-daily-v2")!==d){localStorage.setItem("py-step-daily-v2",d);state.xp+=10;save();toast("今日打卡成功，+10 XP")}else toast("今天已经打过卡啦")};
el("#checkChallenge").onclick=function(){var code=el("#challengeCode").value,hits=[/\bname\s*=/.test(code),/\bdays\s*=/.test(code),/\bgoal\s*=/.test(code),/print\s*\(/.test(code)],n=hits.filter(Boolean).length,f=el("#challengeFeedback");f.className="feedback show "+(n===4?"good":"bad");f.innerHTML=n===4?"<b>结构完整，作品通过！+50 XP</b><br>你创建了 3 个变量，也用 print() 完成了输出。":"<b>已经完成 "+n+"/4 个要求</b><br>检查 name、days、goal 三个变量和 print()。";if(n===4&&!state.challenge){state.challenge=true;state.xp+=50;save();unlock();toast("恭喜通关！下一阶段已点亮")}};
if(state.challenge)unlock();
render();updateStats();
})();
