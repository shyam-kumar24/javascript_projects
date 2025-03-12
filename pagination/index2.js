const buttonsDiv = document.querySelector(".buttons");
const pageContent = document.querySelector(".page-content");
const pageNoDiv = document.querySelector(".page-number-div");

let currentActiveBtn = 1;

function createPageNo() {
  pageNoDiv.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    let pageBtn = document.createElement("button");
    pageBtn.classList.add("pageBtn");
    pageBtn.textContent = `${i}`;
    pageBtn.dataset.buttonNo = i;
    if (i === 1) {
      pageBtn.classList.add("active");
    }
    pageNoDiv.appendChild(pageBtn);
  }
}

createPageNo();

function generateContentDiv(activePage) {
  pageContent.innerHTML = "";

  let start = (activePage - 1) * 10 + 1;
  let end = start + 9;

  for (let i = start; i <= end; i++) {
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("content-div");
    contentDiv.textContent = `Card ${i}`;
    pageContent.appendChild(contentDiv);
  }
}

generateContentDiv(currentActiveBtn);

console.log(pageNoDiv);

pageNoDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("pageBtn")) {
    document.querySelectorAll(".pageBtn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");
    currentActiveBtn = Number(event.target.dataset.buttonNo);
    generateContentDiv(currentActiveBtn);

    if (
      Number(event.target.dataset.buttonNo) !== 1 &&
      Number(event.target.dataset.buttonNo) !== 10
    ) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }
  }
});

const prevBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");

prevBtn.addEventListener("click", () => {
  if (currentActiveBtn > 1) {
    currentActiveBtn -= 1;
    generateContentDiv(currentActiveBtn);
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  } else {
    prevBtn.disabled = true;
  }

  document.querySelectorAll(".pageBtn").forEach((btn) => {
    if (Number(btn.dataset.buttonNo) === currentActiveBtn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
});

nextBtn.addEventListener("click", () => {
  if (currentActiveBtn <= 9) {
    currentActiveBtn += 1;
    generateContentDiv(currentActiveBtn);
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }

  document.querySelectorAll(".pageBtn").forEach((btn) => {
    if (Number(btn.dataset.buttonNo) === currentActiveBtn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
});
