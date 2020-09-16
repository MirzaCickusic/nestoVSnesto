<script>
    import Button from "../shared/Button.svelte";
    import {createEventDispatcher} from "svelte"
    import PollStore from "../stores/PoolStore";
    import {db} from "../firebase"

    let dispatch = createEventDispatcher()

    let fields = {question: "", answerA: "", answerB: ""}
    let errors = {question: "", answerA: "", answerB: ""}
    let valid = false

    const submitHandler = () => {
        valid = true

        if (fields.question.trim().length < 5) {
            valid = false;
            errors.question = "Pitanje mora biti dugo najmanje 5 karaktera";
        } else {
            errors.question = ""
        }

        if (fields.answerA.trim().length < 2) {
            valid = false;
            errors.answerA = "Pitanje A ne može biti prazno";
        } else {
            errors.answerA = ""
        }

        if (fields.answerB.trim().length < 2) {
            valid = false;
            errors.answerB = "Pitanje B ne može biti prazno";
        } else {
            errors.answerB = ""
        }

        if (valid) {
            let poll = {
                ...fields, votesA: 0, votesB: 0
            }
            //save poll to store
            PollStore.update(currentPolls => {
                return [poll, ...currentPolls]
            })
            dispatch("addPoll", poll)

            db.collection("questions").add(poll).then(() => console.log("Question added"))

        }
    }
</script>


<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Pitanje:</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div class="form-field">
        <label for="answer-a">Odgovor A:</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>
    <div class="form-field">
        <label for="answer-b">Odgovor B:</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <Button type="secondary" flat={true}>Dodaj Anketu</Button>
</form>

<style>

    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    @media only screen and (max-width: 600px) {
        form {
            width: 90%;
            margin: 0 auto;
            text-align: center;
        }
    }

    .form-field {
        margin: 18px auto;
    }

    input {
        width: 100%;
        border-radius: 6px;
    }

    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }

</style>