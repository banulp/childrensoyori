// select 박스 생성
var selectElement = document.createElement("select");
selectElement.id = "bible-select";

var defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "--암송할 문답을 선택하세요.--";
selectElement.appendChild(defaultOption);

var options = [
    { value: "1,2,3", text: "1~3문답" },
    { value: "4,5", text: "4~5문답" },
    { value: "6,7,8", text: "6~8문답" },
    { value: "9,10,11", text: "9~11문답" },
    { value: "12,13", text: "12~13문답" },
    { value: "14,15", text: "14~15문답" },
    { value: "TOTAL", text: "TOTAL" },
];

var selectedBibleArray = [];
selectElement.onchange = function () {
    clearTables();
   var selectedValue = this.value;
   selectedBibleArray = selectedValue.split(',').map(Number);

   for(var idx = 0; idx < selectedBibleArray.length; idx++){
      createTable(textJsonQArray[selectedBibleArray[idx]-1], "txttableQ"+idx, 0);
      createTable(textJsonAArray[selectedBibleArray[idx]-1], "txttableA"+idx, 0);
   };

};

// 옵션 추가
options.forEach(function(optionData) {
    var option = document.createElement("option");
    option.value = optionData.value;
    option.text = optionData.text;
    selectElement.appendChild(option);
});

// 예쁜 버튼 생성 함수
function createStyledButton(label, targetIndex) {
    var button = document.createElement("button");
    button.textContent = label;

    // 버튼 스타일
    button.style.backgroundColor = "#4a90e2";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "20px";
    button.style.padding = "5px 5px";
    button.style.margin = "5px 5px";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    // 호버 효과
    button.onmouseover = function () {
        if (!button.disabled) button.style.backgroundColor = "#357ABD";
    };
    button.onmouseout = function () {
        if (!button.disabled) button.style.backgroundColor = "#4a90e2";
    };

    // 유효하지 않으면 비활성화
    if (targetIndex >= 0 && targetIndex < options.length) {
    } else {
        button.disabled = true;
        button.style.backgroundColor = "#ccc";
        button.style.cursor = "default";
    }

    return button;
}

// "이전" 버튼
var prevBtn = createStyledButton("← 이전", selectElement.selectedIndex);
prevBtn.onclick = function () {
    var currentIndex = selectElement.selectedIndex;
    if (currentIndex > 1) { // 0은 기본 안내 옵션
        selectElement.selectedIndex = currentIndex - 1;
        selectElement.onchange();
    }
};

// "다음" 버튼
var nextBtn = createStyledButton("다음 →", selectElement.selectedIndex);
nextBtn.onclick = function () {
    var currentIndex = selectElement.selectedIndex;
    if (currentIndex < selectElement.options.length - 1) {
        selectElement.selectedIndex = currentIndex + 1;
        selectElement.onchange();
    }
};

// wrapper div로 버튼과 select 정렬
var navWrapper = document.createElement("div");
navWrapper.style.display = "flex";
navWrapper.style.alignItems = "center";
navWrapper.style.gap = "10px";
navWrapper.style.flexWrap = "wrap";
navWrapper.style.marginTop = "10px";

navWrapper.appendChild(prevBtn);
navWrapper.appendChild(selectElement);
navWrapper.appendChild(nextBtn);

// 기존 요소에 삽입
document.getElementById("biblemenu").prepend(navWrapper);
