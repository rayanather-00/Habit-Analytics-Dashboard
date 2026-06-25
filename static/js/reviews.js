/////////////////////////////////////////////////
// STORAGE
/////////////////////////////////////////////////

let reviews =
    JSON.parse(
        localStorage.getItem("reviews")
    ) || [];

renderReviews();
updateOverallRating();

/////////////////////////////////////////////////
// INPUTS
/////////////////////////////////////////////////

const inputs = [
    document.getElementById("designRating"),
    document.getElementById("featureRating"),
    document.getElementById("performanceRating"),
    document.getElementById("easeRating")
];

/////////////////////////////////////////////////
// VALIDATION
/////////////////////////////////////////////////

inputs.forEach(input => {

    input.addEventListener(
        "input",
        () => {

            let value =
                Number(input.value);

            if (isNaN(value)) {
                input.value = "";
                return;
            }

            if (value < 0) {
                input.value = 0;
            }

            if (value > 5) {
                input.value = 5;
            }

            updateYourRating();
        }
    );

});

/////////////////////////////////////////////////
// YOUR RATING
/////////////////////////////////////////////////

function updateYourRating() {

    let total = 0;

    inputs.forEach(input => {
        total += Number(input.value) || 0;
    });

    let rating =
        (total / 4)
        .toFixed(1);

    document.getElementById(
        "yourRating"
    ).textContent = rating;

    document.getElementById(
        "yourStars"
    ).textContent =
        getStars(rating);
}

/////////////////////////////////////////////////
// STARS
/////////////////////////////////////////////////

function getStars(rating) {

    let full =
        Math.round(rating);

    let stars = "";

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        if (i < full) {
            stars += "⭐";
        }
        else {
            stars += "☆";
        }

    }

    return stars;
}

/////////////////////////////////////////////////
// SUBMIT REVIEW
/////////////////////////////////////////////////

document
    .getElementById(
        "submitReviewBtn"
    )
    .addEventListener(
        "click",
        submitReview
    );

function submitReview() {

    let name =
        document
        .getElementById(
            "reviewerName"
        )
        .value
        .trim();

    let comment =
        document
        .getElementById(
            "reviewComment"
        )
        .value
        .trim();

    if (!name) {
        alert(
            "Please enter your name."
        );
        return;
    }

    if (!comment) {
        alert(
            "Please enter a comment."
        );
        return;
    }

    let design =
        Number(
            document.getElementById(
                "designRating"
            ).value
        ) || 0;

    let feature =
        Number(
            document.getElementById(
                "featureRating"
            ).value
        ) || 0;

    let performance =
        Number(
            document.getElementById(
                "performanceRating"
            ).value
        ) || 0;

    let ease =
        Number(
            document.getElementById(
                "easeRating"
            ).value
        ) || 0;

    let overall =
        (
            (design +
            feature +
            performance +
            ease) / 4
        ).toFixed(1);

    reviews.push({

        name,
        comment,

        design,
        feature,
        performance,
        ease,

        overall

    });

    saveReviews();
    renderReviews();
    updateOverallRating();
    clearForm();
}

/////////////////////////////////////////////////
// SAVE
/////////////////////////////////////////////////

function saveReviews() {

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

}

/////////////////////////////////////////////////
// CLEAR FORM
/////////////////////////////////////////////////

function clearForm() {

    document.getElementById(
        "reviewerName"
    ).value = "";

    document.getElementById(
        "reviewComment"
    ).value = "";

    inputs.forEach(input => {
        input.value = "";
    });

    document.getElementById(
        "yourRating"
    ).textContent = "0.0";

    document.getElementById(
        "yourStars"
    ).textContent = "☆☆☆☆☆";
}

/////////////////////////////////////////////////
// WEBSITE OVERALL RATING
/////////////////////////////////////////////////

function updateOverallRating() {

    if (reviews.length === 0) {

        document.getElementById(
            "overallRating"
        ).textContent = "0.0";

        document.getElementById(
            "overallStars"
        ).textContent =
            "☆☆☆☆☆";

        document.getElementById(
            "totalReviews"
        ).textContent =
            "0 Reviews";

        return;
    }

    let total = 0;

    reviews.forEach(review => {
        total +=
            Number(
                review.overall
            );
    });

    let overall =
        (
            total /
            reviews.length
        ).toFixed(1);

    document.getElementById(
        "overallRating"
    ).textContent = overall;

    document.getElementById(
        "overallStars"
    ).textContent =
        getStars(overall);

    document.getElementById(
        "totalReviews"
    ).textContent =
        reviews.length +
        " Reviews";
}

/////////////////////////////////////////////////
// RENDER REVIEWS
/////////////////////////////////////////////////

function renderReviews() {

    let container =
        document.getElementById(
            "reviewsContainer"
        );

    container.innerHTML = "";

    reviews.forEach(
        (review, index) => {

        let card =
            document.createElement(
                "div"
            );

        card.className =
            "review-card";

        card.innerHTML = `
            <h3>
                👤 ${review.name}
            </h3>

            <div class="rating">
                ${getStars(
                    review.overall
                )}
            </div>

            <p>
                Overall:
                ${review.overall}/5
            </p>

            <p>
                Design:
                ${review.design}/5
            </p>

            <p>
                Features:
                ${review.feature}/5
            </p>

            <p>
                Performance:
                ${review.performance}/5
            </p>

            <p>
                Ease of Use:
                ${review.ease}/5
            </p>

            <p>
                "${review.comment}"
            </p>

            <button
                onclick=
                "deleteReview(${index})">
                Delete
            </button>
        `;

        container.appendChild(
            card
        );
    });
}

/////////////////////////////////////////////////
// DELETE
/////////////////////////////////////////////////

function deleteReview(index) {

    if (
        !confirm(
            "Delete review?"
        )
    ) return;

    reviews.splice(index, 1);

    saveReviews();
    renderReviews();
    updateOverallRating();
}
function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("active");

    document
        .getElementById("overlay")
        .classList.toggle("active");
}

document
    .getElementById("overlay")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("sidebar")
                .classList.remove("active");

            document
                .getElementById("overlay")
                .classList.remove("active");
        }
    );