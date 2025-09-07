document.addEventListener('DOMContentLoaded', function() {
    // select 박스 생성
    var selectElement = document.createElement("select");
    selectElement.id = "bible-select-2";
    selectElement.className = "select-dropdown";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "주제별";
    selectElement.appendChild(defaultOption);

    var options = [
        { value: "1-5", text: "1-5문 (5) : 창조와 하나님의 영광" },
        { value: "6-13", text: "6-13문 (8) : 하나님" },
        { value: "14-15", text: "14-15문 (2) : 성경" },
        { value: "16-21", text: "16-21문 (6) : 인간의 창조" },
        { value: "22-27", text: "22-27문 (6) : 행위언약·아담과 하나님" },
        { value: "28-37", text: "28-37문 (10) : 죄와 죄의 결과" },
        { value: "38-42", text: "38-42문 (5) : 중생" },
        { value: "43-45", text: "43-45문 (3) : 은혜언약·그리스도와 하나님" },
        { value: "46-55", text: "46-55문 (10) : 속죄와 구원" },
        { value: "56-59", text: "56-59문 (4) : 회개와 믿음" },
        { value: "60-63", text: "60-63문 (4) : 구약시대의 구원과 믿음" },
        { value: "64-71", text: "64-71문 (8) : 그리스도의 세 가지 직분" },
        { value: "72-79", text: "72-79문 (8) : 십계명의 요점" },
        { value: "80-90", text: "80-90문 (11) : 1-4계명" },
        { value: "91-102", text: "91-102문 (12) : 5-10계명" },
        { value: "103-104", text: "103-104문 (2) : 십계명의 필요" },
        { value: "105-106", text: "105-106문 (2) : 기도" },
        { value: "107-121", text: "107-121문 (15) : 주기도" },
        { value: "122-125", text: "122-125문 (4) : 성례" },
        { value: "126-132", text: "126-132문 (7) : 세례" },
        { value: "133-136", text: "133-136문 (4) : 성찬" },
        { value: "137-139", text: "137-139문 (3) : 그리스도의 부활, 승천, 재림" },
        { value: "140-145", text: "140-145문 (6) : 종말" }
    ];

    // 옵션 추가
    options.forEach(function(optionData) {
        var option = document.createElement("option");
        var range = optionData.value.split('-').map(Number);
        var numbers = [];
        for (var i = range[0]; i <= range[1]; i++) {
            numbers.push(i);
        }
        option.value = numbers.join(',');
        option.text = optionData.text;
        selectElement.appendChild(option);
    });

    selectElement.onchange = function () {
        // 다른 드롭다운의 선택을 해제
        var otherSelect = document.getElementById('bible-select');
        if (otherSelect) {
            otherSelect.selectedIndex = 0;
        }
        
        var selectedValue = this.value;
        if (!selectedValue) {
            selectedBibleArray = [];
            clearTables();
            if (typeof updateNavButtons === 'function') {
                updateNavButtons();
            }
            return;
        }

        selectedBibleArray = selectedValue.split(',').map(Number).filter(n => !isNaN(n));
        
        const activeDifficultyButton = document.querySelector('.difficulty-button.active');
        const difficulty = activeDifficultyButton ? activeDifficultyButton.id.split('-')[1] : 0;
        displayCatechism(difficulty);
        
        // 첫번째 드롭다운의 버튼 상태 업데이트 함수를 호출 (만약 존재한다면)
        if (typeof updateNavButtons === 'function') {
            updateNavButtons();
        }
        closeMobileNav();
    }

    // HTML에 컨트롤 추가
    const navGroup = document.getElementById('nav-group-right');
    if (navGroup) {
        navGroup.appendChild(selectElement);
    }

    // 기존 드롭다운의 onchange를 수정하여 이 드롭다운을 초기화하도록 함
    var otherSelect = document.getElementById('bible-select');
    if (otherSelect) {
        const originalOnChange = otherSelect.onchange;
        otherSelect.onchange = function() {
            // 새로 추가된 드롭다운의 선택을 해제
            selectElement.selectedIndex = 0;
            // 원래 onchange 함수 호출
            originalOnChange.apply(this, arguments);
        }
    }
});
