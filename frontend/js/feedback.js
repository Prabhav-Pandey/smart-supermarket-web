const params =
    new URLSearchParams(
        window.location.search
    );

if(params.get("admin") === "true")
{
    document.getElementById(
        "adminView"
    ).style.display = "block";

    document.getElementById(
        "customerView"
    ).style.display = "none";

    let feedbacks =
        JSON.parse(
            localStorage.getItem(
                "feedbacks"
            )
        ) || [];

    let html = "";

    feedbacks.forEach(f =>
    {
        html +=
            "<p>• " +
            f +
            "</p>";
    });

    document.getElementById(
        "feedbackList"
    ).innerHTML =
        html || "No Feedback Available";
}

function submitFeedback()
{
    let feedback =
        document.getElementById(
            "feedback"
        ).value;

    if(feedback === "")
    {
        alert("Enter Feedback");
        return;
    }

    let feedbacks =
        JSON.parse(
            localStorage.getItem(
                "feedbacks"
            )
        ) || [];

    feedbacks.push(feedback);

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(
            feedbacks
        )
    );

    alert(
        "Feedback Submitted"
    );

    document.getElementById(
        "feedback"
    ).value = "";
}