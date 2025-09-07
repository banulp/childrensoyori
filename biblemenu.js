document.addEventListener('DOMContentLoaded', function() {
    // select 박스 생성
    var selectElement = document.createElement("select");
    selectElement.id = "bible-select";
    selectElement.className = "select-dropdown";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "-- 문답 선택 --";
    selectElement.appendChild(defaultOption);

    var options = [
        { value: "1,2,3", text: "1~3문답" },
        { value: "4,5", text: "4~5문답" },
        { value: "6,7,8", text: "6~8문답" },
        { value: "9,10,11", text: "9~11문답" },
        { value: "12,13", text: "12~13문답" },
        { value: "14,15", text: "14~15문답" },
        { value: "16,17", text: "16~17문답" },
        { value: "18,19", text: "18~19문답" },
        { value: "20,21,22,23,24", text: "20~24문답" }
    ];

    // 옵션 추가
    options.forEach(function(optionData) {
        var option = document.createElement("option");
        option.value = optionData.value;
        option.text = optionData.text;
        selectElement.appendChild(option);
    });

    selectElement.onchange = function () {
        var otherSelect = document.getElementById('bible-select-2');
        if (otherSelect) {
            otherSelect.selectedIndex = 0;
        }
        var selectedValue = this.value;
        if (!selectedValue) {
            selectedBibleArray = [];
            clearTables();
            updateNavButtons(); // Ensure buttons are disabled when nothing is selected
            return;
        }

        selectedBibleArray = selectedValue.split(',').map(Number).filter(n => !isNaN(n));
        
        const activeDifficultyButton = document.querySelector('.difficulty-button.active');
        const difficulty = activeDifficultyButton ? activeDifficultyButton.id.split('-')[1] : 0;
        displayCatechism(difficulty);
        updateNavButtons();
    };

    // 버튼 생성 함수
    function createNavButton(label, isDisabled) {
        var button = document.createElement("button");
        button.textContent = label;
        button.className = "nav-button";
        button.disabled = isDisabled;
        return button;
    }

    // "이전" 버튼
    var prevBtn = createNavButton("← 이전", true);
    prevBtn.onclick = function () {
        if (selectElement.selectedIndex > 1) { // 0은 기본 안내 옵션
            selectElement.selectedIndex = selectElement.selectedIndex - 1;
            selectElement.onchange();
        }
        updateNavButtons();
    };

    // "다음" 버튼
    var nextBtn = createNavButton("다음 →", true);
    nextBtn.onclick = function () {
        if (selectElement.selectedIndex < selectElement.options.length - 1) {
            selectElement.selectedIndex = selectElement.selectedIndex + 1;
            selectElement.onchange();
        }
        updateNavButtons();
    };

    // "전체 보기" 버튼
    var totalBtn = createNavButton("전체 보기", false);
    totalBtn.onclick = function () {
        selectElement.selectedIndex = 0; // 드롭다운 선택 해제
        var otherSelect = document.getElementById('bible-select-2');
        if (otherSelect) {
            otherSelect.selectedIndex = 0;
        }
        selectedBibleArray = Array.from({length: catechism.length}, (_, i) => i + 1);
        
        const activeDifficultyButton = document.querySelector('.difficulty-button.active');
        const difficulty = activeDifficultyButton ? activeDifficultyButton.id.split('-')[1] : 0;
        displayCatechism(difficulty);
        updateNavButtons(); // 이전/다음 버튼 비활성화
    };

    function updateNavButtons() {
        const currentIndex = selectElement.selectedIndex;
        const totalOptions = selectElement.options.length;
        prevBtn.disabled = currentIndex <= 1;
        nextBtn.disabled = currentIndex >= totalOptions - 1 || currentIndex === 0;
    }

    // HTML에 컨트롤 추가
    const navGroup = document.getElementById('nav-group-left');
    if (navGroup) {
        navGroup.appendChild(prevBtn);
        navGroup.appendChild(selectElement);
        navGroup.appendChild(nextBtn);
        navGroup.appendChild(totalBtn);
    }

    // 초기 버튼 상태 설정
    updateNavButtons();
});
