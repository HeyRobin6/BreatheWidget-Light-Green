const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const btnContainer = document.querySelector(".btn-container");

const counterTxt = document.querySelector("#counter")

const inhaleTxt = document.querySelector(".inhale-exhale-txt");
const fadeInTxt = document.querySelector(".fade-in")

const reminder = document.querySelector(".reminder");

const semicircle = document.querySelector("#semicircle");

let growing = true;

const totalCycleNumber = 6;
const totalDuration = 60000
const cycleDuration = 60000 / totalCycleNumber; // total duration of 1 cycle
const semiCycleDuration = cycleDuration / 2; //total duration of the half of 1 cycle
const functionTime = semiCycleDuration / 100 //interval duration, it should play the same amount of times it is divided by (according to the height of the semicircle as it increases by one) 


startBtn.addEventListener("click", () => {

    reminder.classList.add("d-none")
    btnContainer.style.bottom= "-12%"; //move start button down

    setTimeout(() => {
        counterTxt.style.opacity = "1";
        stopBtn.classList.remove("d-none");
        startBtn.classList.add("d-none");
        updateSemicircleProgress()
    }, 1000);

})

stopBtn.addEventListener("click", () => {
    location.reload();
})

function updateSemicircleProgress() {
    let i = 0
    let growing = true;
    let width = 0 //innitial value
    let height = 0 //innitial value
    semicircle.style.width = `${width}px` //set innitial value
    semicircle.style.height = `${height}px` //set innitial value
    let intervalId;

    function updateInterval() {
        width = 0
        height = 0
        growing = true
        inhaleTxt.style.visibility = "visible"
        changeText("Inhale");
        counterTxt.textContent = `${i}/${totalCycleNumber}`
        if (i == 0) {
            clearInterval(intervalId); //clear previous interval
        }
        intervalId = setInterval(() => {
            let values;
            if (growing) {
                values = growSemicircle(width, height)
            } else {
                values = shrinkSemicircle(width, height)
            }
            width = values.width;
            height = values.height;

            if (growing && height == 100) {
                growing = false
                changeText("Exhale");

            } else if (!growing && height == 0) {
                clearInterval(intervalId)
                i++ //innitiate another cycle
                if (i < totalCycleNumber) {
                    updateInterval();//If total cycles not done, update interval to repeat cycle
                }
                else {
                    location.reload();
                }
            }
        }, functionTime);
    }
    updateInterval() //start

}

function growSemicircle(w, h) {
    w = w + 2
    h++
    semicircle.style.width = `${w}px`
    semicircle.style.height = `${h}px`
    return {
        width: w,
        height: h
    };
}

function shrinkSemicircle(w, h) {
    w = w - 2
    h--
    semicircle.style.width = `${w}px`
    semicircle.style.height = `${h}px`
    return {
        width: w,
        height: h
    };
}

function changeText(newText) {
    inhaleTxt.textContent = newText;
    inhaleTxt.classList.remove("fade-in");
    void inhaleTxt.offsetWidth; // Trigger reflow to apply class removal
    inhaleTxt.classList.add("fade-in");
}

