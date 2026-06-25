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

let expenses =
JSON.parse(
localStorage.getItem("expenses")
) || [];

const expenseList =
document.getElementById("expenseList");

function renderExpenses(){

    expenseList.innerHTML="";

    expenses.forEach(expense=>{

        const li =
        document.createElement("li");

        li.textContent =
        `${expense.name} - Rs.${expense.amount}`;

        expenseList.appendChild(li);
    });
}

document
.getElementById("addExpenseBtn")
.addEventListener("click",()=>{

    const name =
    document.getElementById("expenseName").value;

    const amount =
    document.getElementById("expenseAmount").value;

    const category =
    document.getElementById("expenseCategory").value;

    if(name === "" || amount === "")
    return;

    expenses.push({

        name,
        amount,
        category

    });

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();
});

renderExpenses();