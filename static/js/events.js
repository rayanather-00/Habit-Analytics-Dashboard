function toggleSidebar() {

    const sidebar =
    document.getElementById("sidebar");

    const overlay =
    document.getElementById("overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

document
.getElementById("overlay")
.addEventListener("click",()=>{

    document
    .getElementById("sidebar")
    .classList.remove("active");

    document
    .getElementById("overlay")
    .classList.remove("active");
});

let events =
JSON.parse(
localStorage.getItem("events")
) || [];

const upcomingList =
document.getElementById(
"upcomingList"
);

const overdueList =
document.getElementById(
"overdueList"
);

function renderEvents(){

    upcomingList.innerHTML="";
    overdueList.innerHTML="";

    const today =
    new Date();

    let upcomingCount = 0;
    let overdueCount = 0;

    events.forEach(event=>{

        const eventDate =
        new Date(event.date);

        const li =
        document.createElement("li");

        li.classList.add(
            event.priority.toLowerCase()
        );

        li.textContent =
        `${event.title}
        (${event.date})`;

        if(eventDate >= today){

            upcomingList.appendChild(li);
            upcomingCount++;

        }
        else{

            overdueList.appendChild(li);
            overdueCount++;

        }

    });

    document.getElementById(
    "totalEvents"
    ).textContent =
    events.length;

    document.getElementById(
    "upcomingEvents"
    ).textContent =
    upcomingCount;

    document.getElementById(
    "overdueEvents"
    ).textContent =
    overdueCount;

    updateNextEvent();
}

function updateNextEvent(){

    if(events.length===0)
    return;

    const upcoming =
    events.filter(event=>
        new Date(event.date)
        >=
        new Date()
    );

    if(upcoming.length===0)
    return;

    upcoming.sort(
        (a,b)=>
        new Date(a.date)
        -
        new Date(b.date)
    );

    const next =
    upcoming[0];

    document.getElementById(
    "nextEventTitle"
    ).textContent =
    next.title;

    document.getElementById(
    "nextEventDate"
    ).textContent =
    next.date;

    const days =
    Math.ceil(
    (
    new Date(next.date)
    -
    new Date()
    )
    /
    (1000*60*60*24)
    );

    document.getElementById(
    "daysLeft"
    ).textContent =
    `${days} Days Left`;
}

document
.getElementById(
"addEventBtn"
)
.addEventListener(
"click",
()=>{

    const title =
    document.getElementById(
    "eventTitle"
    ).value;

    const date =
    document.getElementById(
    "eventDate"
    ).value;

    const time =
    document.getElementById(
    "eventTime"
    ).value;

    const priority =
    document.getElementById(
    "eventPriority"
    ).value;

    if(title===""||date==="")
    return;

    events.push({

        title,
        date,
        time,
        priority

    });

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    renderEvents();
});

renderEvents();