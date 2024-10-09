const calendar = document.querySelector(".calendar"),
   date = document.querySelector(".date"),
   daysContainer = document.querySelector(".days"),
   prev = document.querySelector(".prev"),
   next = document.querySelector(".next"),
   todayBtn = document.querySelector(".today-btn"),
   gotoBtn = document.querySelector(".goto-btn"),
   dateInput = document.querySelector(".date-Input"),
   eventDay = document.querySelector(".event-day"),
   eventDate = document.querySelector(".event-date");


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
//EVENTOS PREDETERMINADOS
const eventsArr = [
    {
        day: 27,
        month: 11,
        year:2024,
        events: [
            {
                title: "Event 1 lorem ipsum dolar sit genfa",
                Time: "10:00 AM",
            },
            {
                title:"Event 2",
                Time:"12:00 PM",
            },
        ],
    },
    {
        day: 18,
        month: 11,
        year: 2024,
        events: [
            {
                title: "Event 1 lorem ipsum dolar sit genfa",
                Time: "10:00 AM",
            },
            {
                title: "Event 2",
                Time: "12:00 PM",
            },
        ],
    },
];

// Agregamos la funcion para dias
function initCalendar() {  //para obtener los días del mes anterior y el mes actual todos los días y los días del mes siguiente
    const firstDay = new Date(year, month, 1);
    const lastDay = new  Date(year, month + 1, 0);
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
    for(let x = day; x > 0; x--){
        days = `<div class="day prev-date"> ${prevDays - x + 1}</div>`;
    }

    
    //dia del mes actual
    for ( let i = 1; i <= lastDate; i++) {
        //COMPROBAR SI evento presente en el día actual
let event = false
eventsArr.forEach((eventObj)=>{
    if(eventObj.day === i && eventObj.month === month && eventObj.year === year){
        event = true;
    }
})
 
    //si el día es hoy agrega clase hoy
    if(
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
    ) {

        activeDay = i;
        getActiveDay(i);
        // si se encuentra el evento, agregue también la clase de evento
        // agregar activo hoy al inicio
        if (event) {
        days += `<div class= "day today  active event" > ${i} </div>`;
     } else{
        days += `<div class= "day today active" > ${i} </div>`;
     }
    }
    //agregar el resto tal como esta
    else{
        if (event){
        days += `<div class="day event"> ${i} </div>`;
        } else{
            days += `<div class="day"> ${i} </div>`;
        }
      }
    }
    //dia del proximo mes
        for(let j = 1; j <= nextDays; j++){
            days += `<div class="day next-date">${j}</div>`;
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
next.addEventListener("click", nextMonth);

//nuestro calendario está listo, agreguemos la funcionalidad ir a fecha y ir a hoy

todayBtn.addEventListener("click",() => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input",(e) => {
    //permitir solo números eliminar nada más
    dateInput.value = dateInput.value.replace(/[^0-9]/g, "");
    if (dateInput.value.lenght == 2){
        //agregue barra diagonal si ingresan demasiados números
        dateInput.value += "/";
    }

    if (dateInput.value.lenght > 7) {

    // no permitir mas de 7 caracteres
    dateInput.value = dateInput.value.slice(0, 7);
    }
    //si eliminamos hasta que la barra no se elimine

    if (e.inputType == "deleteContentBackward") {
        if (dateInput.value.lenght == 3){
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
} );

gotoBtn.addEventListener("click", gotoDate);
//función para ir a la fecha ingresada
function gotoDate() {
    const dateArr = dateInput.value.split("/");
  //validar alguna fecha  
    if(dateArr.lenght == 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].lenght == 4){
            month = dateArr[0] -1;
            year = dateArr[1];
            initCalendar();
            return;
        }

    }
    alert("invalid date");
}
const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

  addEventBtn.addEventListener("click", ()=> {
    addEventContainer.classList.toggle("active");
  });
addEventCloseBtn.addEventLisetner("click", () => {
    addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e) => {
    //se hace click fuera de lado
    if (e.target == addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove("active");
    }
});
//ponemos solo 50 carateres en el titulo
addEventTitle.addEventListner("input", (e) =>{
    addEventTitle.value = addEventTitle.value.slice(0, 50);
})

//formato de hora en desde y hasta la hora
addEventFrom.addEventListner("input", (e)=>{
    //removercualquier numero
    addEventFrom.value = addEventFrom.value.replace([0 - 9]/g, "");
    //si se ingresan dos números, se agrega automáticamente
    if(addEventFrom.value.lenght == 2){
        addEventFrom.value += ":";
    }
    //No dejes que el usuario ingrese más de 5 caracteres.
    if (addEventFrom.value.lenght > 5) {
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
});
// lo mismo con to time
addEventTo.addEventListener("input", (e) => {
    //removercualquier numero
    addEventTo.value = addEventTo.value.replace([0 - 9] / g, "");
    //si se ingresan dos números, se agrega automáticamente
    if (addEventTo.value.lenght == 2) {
        addEventTo.value += ":";
    }
    //No dejes que el usuario ingrese más de 5 caracteres.
    if (addEventTo.value.lenght > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});
//vamos a crear una función para agregar listner en los días posteriores a la renderización
function addLister(){
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            activeDay = Number(e.target.innerHTML);
            //llamada activa día después del clic
            getActiveDay(e.target.innerHTML);

            days.forEach((day) => {
                day.classList.remove("active");
            });

            if(e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");

                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML == e.target.innerHTML
                        ) {
                           day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains(next-date)) {
                nextMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") && 
                            day.innerHTML == e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                //días restantes del mes recurrente
                e.target.classList.add("active");
            }
        });
    });
}
//permite mostrar los eventos del día activo y agregar la fecha en la parte superior

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}
// function  to show events of that day
function updateEvents(date) {
    let event = "";
    eventsArr.forEach((event) =>{
        //get events of active day only
        if (
            date == event.day && 
            month + 1 == event.month &&
            year == event.year
        ){
            //then show event on document
            event.events.forEach((event) => {
                event +=  `<div class= "event">
                <div class= "title">
                <i class= "fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                 <span class="event-time">${event.Time}</span>
                </div>
             </div> `;
            });
        }
    });
    //if nothing found
    if (events =""){
        event = ` `
    }
}









