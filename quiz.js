document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const startBtn = document.getElementById("start-btn");
    const submitBtn = document.getElementById("submit-btn");
    const restartBtn = document.getElementById("restart-btn");
    const timerDisplay = document.getElementById("timer");
    const questionContainer = document.getElementById("question-container");
    const scoreDisplay = document.getElementById("score");
    const answersDisplay = document.getElementById("answers");

    let selectedQuestions = [];
    let userAnswers = {};
    let timeLeft = 0;
    let timerInterval;
  
    let quiz = {
      id: "quiz",
      questions: [
        { id: 1, text: "'box-shadow' ใช้ทำอะไร?", choices: ["กำหนดเงา", "กำหนดสีพื้นหลัง", "กำหนดขนาด", "กำหนดระยะห่าง"], correct: "กำหนดเงา" },
        { id: 2, text: "แท็ก table ใช้ทำอะไร?", choices: ["สร้างฟอร์ม", "สร้างตาราง", "สร้างลิงก์", "สร้างส่วนเว็บ"], correct: "สร้างตาราง" },
        { id: 3, text: "JavaScript เป็นภาษาแบบใด?", choices: ["Compiled", "Interpreted", "Markup", "Styling"], correct: "Interpreted" },
        { id: 4, text: "แสดงผลใน Console ใช้คำสั่ง?", choices: ["print()", "console.log()", "display()", "log()"], correct: "console.log()" },
        { id: 5, text: "CSS ย่อมาจากอะไร?", choices: ["Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"], correct: "Cascading Style Sheets" },
        { id: 6, text: "แท็ก a ใช้ทำอะไร?", choices: ["สร้างลิงก์", "สร้างฟอร์ม", "สร้างตาราง", "สร้างส่วนเว็บ"], correct: "สร้างลิงก์" },
        { id: 7, text: "'let' และ 'const' ต่างกันอย่างไร?", choices: ["let เปลี่ยนค่าได้, const เปลี่ยนค่าไม่ได้", "const เปลี่ยนค่าได้, let เปลี่ยนค่าไม่ได้", "เหมือนกัน", "let ใช้กับฟังก์ชัน, const ใช้กับตัวแปร"], correct: "let เปลี่ยนค่าได้, const เปลี่ยนค่าไม่ได้" },
        { id: 8, text: "JavaScript ใช้ทำอะไร?", choices: ["สร้างเว็บไซต์", "สร้างแอปพลิเคชันมือถือ", "สร้างเกม", "ทั้งหมดที่กล่าวมา"], correct: "ทั้งหมดที่กล่าวมา" },
        { id: 9, text: "'setTimeout' ใช้ทำอะไร?", choices: ["รันโค้ดทันที", "รันโค้ดตามเวลา", "หยุดโค้ดชั่วคราว", "ลบโค้ดตามเวลา"], correct: "รันโค้ดตามเวลา" },
        { id: 10, text: "แท็ก div ใช้ทำอะไร?", choices: ["สร้างตาราง", "สร้างฟอร์ม", "สร้างส่วนเว็บ", "สร้างลิงก์"], correct: "สร้างส่วนเว็บ" },
        { id: 11, text: "'margin' ใช้ทำอะไร?", choices: ["ระยะห่างภายใน", "ระยะห่างภายนอก", "สีพื้นหลัง", "ขนาดองค์ประกอบ"], correct: "ระยะห่างภายนอก" },
        { id: 12, text: "ตัวดำเนินการ '&&' และ '||' ใน JavaScript มีหน้าที่อะไร?", choices: ["'&&' ใช้ตรวจสอบค่าจริง, '||' ใช้ตรวจสอบค่าปลอม", "'&&' ใช้กับเงื่อนไขหลายตัว, '||' ใช้รวมเงื่อนไข", "เหมือนกัน", "'&&' ใช้สำหรับบวกเลข, '||' ใช้สำหรับลบเลข"], correct: "'&&' ใช้กับเงื่อนไขหลายตัว, '||' ใช้รวมเงื่อนไข" },
        { id: 13, text: "แท็ก ul ใช้ทำอะไร?", choices: ["รายการเรียงลำดับ", "รายการไม่เรียงลำดับ", "สร้างตาราง", "สร้างลิงก์"], correct: "รายการไม่เรียงลำดับ" },
        { id: 14, text: "'flexbox' ใช้ทำอะไร?", choices: ["จัดวางแบบตาราง", "จัดวางแบบ Flexible", "กำหนดสีพื้นหลัง", "กำหนดขนาด"], correct: "จัดวางแบบ Flexible" },
        { id: 15, text: "'map()' ใช้ทำอะไร?", choices: ["สร้างอาร์เรย์ใหม่", "ลบองค์ประกอบ", "เรียงอาร์เรย์", "รวมอาร์เรย์"], correct: "สร้างอาร์เรย์ใหม่" },
        { id: 16, text: "แท็ก form ใช้ทำอะไร?", choices: ["สร้างตาราง", "สร้างฟอร์ม", "สร้างลิงก์", "สร้างส่วนเว็บ"], correct: "สร้างฟอร์ม" },
        { id: 17, text: "'position: absolute' ใช้ทำอะไร?", choices: ["จัดวางปกติ", "จัดวางตามองค์ประกอบแม่", "จัดกลางหน้าจอ", "อยู่ล่างสุด"], correct: "จัดวางตามองค์ประกอบแม่" },
        { id: 18, text: "'filter()' ใช้ทำอะไร?", choices: ["กรองอาร์เรย์", "ลบองค์ประกอบ", "เรียงอาร์เรย์", "รวมอาร์เรย์"], correct: "กรองอาร์เรย์" },
        { id: 19, text: "แท็ก img ใช้ทำอะไร?", choices: ["สร้างลิงก์", "แทรกรูปภาพ", "สร้างตาราง", "สร้างฟอร์ม"], correct: "แทรกรูปภาพ" },
        { id: 20, text: "'z-index' ใช้ทำอะไร?", choices: ["ขนาดองค์ประกอบ", "ลำดับการซ้อน", "สีพื้นหลัง", "ระยะห่าง"], correct: "ลำดับการซ้อน" },
      ],
      timeLimit: 60,
      passingScore: 60,
    }; 
    saveToLocalStorage(quiz);
    quiz = getFromLocalStorage(quiz); 

    // ฟังก์ชันหลัก
  function startQuiz() {
    selectedQuestions = getRandomQuestions(quiz.questions, 5); // สุ่มเลือกคำถาม 5 ข้อ
    userAnswers = {};
    timeLeft = quiz.timeLimit;
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    startTimer();
    displayQuestions();
  }

  function submitQuiz() { // ส่งคำตอบ
    clearInterval(timerInterval); 
    selectedQuestions.forEach((question) => {
      const selectedAnswer = document.querySelector(
        `input[name="question${question.id}"]:checked`
      );
      userAnswers[question.id] = selectedAnswer ? selectedAnswer.value : null;
    });
    const score = calculateScore(); // คำนวณคะแนน
    showResults(score);
    saveToLocalStorage(quiz); 
  }

  function calculateScore() {
    let correctAnswers = 0; 
    selectedQuestions.forEach((question) => {
      if (userAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    return (correctAnswers / selectedQuestions.length) * 100; // คะแนนเต็ม 100
  }

  function showResults(score) { // แสดงผล
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `คะแนนของคุณ: ${score.toFixed(2)}%`;
    answersDisplay.innerHTML = selectedQuestions
      .map((question) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correct;
        const answerClass = isCorrect ? "text-green-500" : "text-red-500"; // สี ถูก ผิด
        return `
          <div class="mb-4">
            <p class="font-medium">${question.text}</p>
            <p class="${answerClass}">คำตอบที่เลือก: ${userAnswer || "ไม่ได้ตอบ"}</p>
            <p>คำตอบที่ถูกต้อง: ${question.correct}</p>
          </div>
        `;
      })
      .join("");
  }

  function getRandomQuestions(questions, count) {
    const shuffled = questions.sort(() => 0.5 - Math.random()); // สุ่มคำถาม เท่ากับ5หรือน้อยกว่า
    return shuffled.slice(0, count);
    //shuffle สลับ
  }

  function getRandomQuestions(questions, count) {
    try {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      return shuffledQuestions.slice(0, count);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสุ่มคำถาม", error);
      return [];
    }
  }

  function displayQuestions() {
    questionContainer.innerHTML = "";
    selectedQuestions.forEach((question, index) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("mb-5"); 
      questionElement.innerHTML = `
                <p class="font-semibold">${index + 1}. ${question.text}</p>
                ${question.choices
                  .map(
                    (choice) => `
                    <label class="block mt-2">
                        <input type="radio" name="question${question.id}" value="${choice}" class="mr-2">
                        ${choice}
                    </label>
                `
                  )
                  .join("")}
            `;
      questionContainer.appendChild(questionElement);
    });
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `เวลาที่เหลือ: ${timeLeft} วินาที`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }

  function saveToLocalStorage(quiz) { // บันทึกข้อมูล
    try {
      localStorage.setItem("quiz", JSON.stringify(quiz));
      console.log("บันทึกข้อมูลควิซลง localStorage สำเร็จ");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูลลง localStorage", error);
      return null;
    }
  }
  
  function getFromLocalStorage(quiz) { // ดึงข้อมูลจาก localStorage
    try {
      const quizData = localStorage.getItem("quiz");
      return quizData ? JSON.parse(quizData) : quiz;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก localStorage", error);
      return quiz;
    }
  }

  // เริ่มต้นทำงานจริงๆตรงนี้
  startBtn.addEventListener("click", startQuiz); // ปุ่มเริ่ม
  submitBtn.addEventListener("click", submitQuiz); // ปุ่มส่งคำตอบ
  restartBtn.addEventListener("click", () => { // เริ่มใหม่
    resultContainer.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });
});