const hexagramNames = [
  "乾","坤","屯","蒙","需","讼","师","比",
  "小畜","履","泰","否","同人","大有","谦","豫",
  "随","蛊","临","观","噬嗑","贲","剥","复",
  "无妄","大畜","颐","大过","坎","离","咸","恒",
  "遁","大壮","晋","明夷","家人","睽","蹇","解",
  "损","益","夬","姤","萃","升","困","井",
  "革","鼎","震","艮","渐","归妹","丰","旅",
  "巽","兑","涣","节","中孚","小过","既济","未济"
];

// 铜钱法：6、7、8、9
function tossCoins() {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += Math.random() > 0.5 ? 3 : 2;
  }
  return sum;
}

function getLine(value) {
  if (value === 6) return {yang:false, changing:true};
  if (value === 7) return {yang:true, changing:false};
  if (value === 8) return {yang:false, changing:false};
  if (value === 9) return {yang:true, changing:true};
}

function drawLine(line) {
  return line.yang ? "━━━" : "━ ━";
}

function startDivination() {
  let lines = [];
  let changed = [];

  for (let i = 0; i < 6; i++) {
    let v = tossCoins();
    let line = getLine(v);
    lines.push(line);

    if (line.changing) {
      changed.push(i + 1);
    }
  }

  let original = lines.map(drawLine).reverse().join("<br>");
  let changedLines = lines.map(l => {
    if (l.changing) return l.yang ? "━ ━" : "━━━";
    return drawLine(l);
  }).reverse().join("<br>");

  let hex1 = hexagramNames[Math.floor(Math.random()*64)];
  let hex2 = hexagramNames[Math.floor(Math.random()*64)];

  let question = document.getElementById("question").value || "（未输入问题）";

  let interpretation = generateInterpretation(question);

  document.getElementById("result").innerHTML = `
    <p>🧠 问题：${question}</p>
    <hr>
    <p>本卦：${hex1}</p>
    <div>${original}</div>
    <p>变卦：${hex2}</p>
    <div>${changedLines}</div>
    <p>动爻：${changed.length ? changed.join(",") : "无"}</p>
    <hr>
    <p>📜 解读：</p>
    <p>${interpretation}</p>
  `;
}

function generateInterpretation(q) {
  const texts = [
    "此卦象征时机未成熟，宜静不宜动。",
    "当前局势有变，顺势而为可得吉。",
    "事情有反复，不可急进。",
    "贵在坚持，后期有转机。",
    "情感方面需多沟通，避免误解。",
    "事业上有机会，但需谨慎决策。"
  ];
  return texts[Math.floor(Math.random()*texts.length)];
}