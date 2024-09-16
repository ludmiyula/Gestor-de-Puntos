const calendar = document.querySelector(".calendar"),
   date =document.querySelector(".date"),
   daysContainer = document.querySelector(".days"),
   prev = document.querySelector(".prev");
(next = document.querySelector(".next"));
   (todayBtn = document.querySelector(".today-btn"));
   (gotoBtn = document.querySelector(".goto-btn"));
   (dateInput = document.querySelector(".date-Input"));

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

// Agregamos la funcion para dias
function initCalendar() {  //para obtener los días del mes anterior y el mes actual todos los días y los días del mes siguiente
    const firstDay = new Date(year, month, 1);
    const lastDay = new  Date(year, month +1, 0);
    const prevlastDay = new Date(year, month, 0);
    const prevDays = prevlastDay.getDate();
    const lastDate = lastDay.getDate();
    const day =firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() -1;


// actualizar la fecha en la parte superior del calendario
    date.innerHTML + months[month] + " " + year;

    //sumando los dias hasta domingo
    let days = "";

    // dia del mes anterior
    for(let x = days; x > 0; x--){
        days = <div class="day prev-date"> ${prevDays - x + 1}</div>;
    }

    
    //dia del mes actual
    for ( let i = 1; i <= lastDate; i++) {
        //si el día es hoy agrega clase hoy
        if(
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getfullMonth()
    ){
        days += <div class= "day today" > ${i} </div>;
    }
    //agregar el reto tal como esta
    else{
        days += <div class="day"> ${i} </div>;
    }
    }
    //dia del proximo mes
        for(let j = 1; j < nextDays; j++){
            days += <div class="day next-date">${j}</div>;
        }
        daysContainer.innerHTML = days;
}

initCalendar();

// mes anterior
function prevMonth() {
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}
//mes siguiente
function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

//agregar lista de eventos anterior y posterior

prev.addEventListener("click", prevMonth);
prev.addEventListener("click", nextMonth);

//nuestro calendario está listo, agreguemos la funcionalidad ir a fecha y ir a hoy

todayBtn.addEventListener("click",() =>{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("keyup",(e) =>{
    dateInput.value
} )