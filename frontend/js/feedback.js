async function submitFeedback()
{
    let feedback =
        document.getElementById("feedback").value;

    if(feedback === "")
    {
        alert("Enter Feedback");
        return;
    }

    try
    {
        const response =
            await fetch(
                "http://localhost:5000/feedback",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify({
                        feedback: feedback
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        document.getElementById("feedback").value = "";
    }
    catch(error)
    {
        console.error(error);
        alert("Error Saving Feedback");
    }
}