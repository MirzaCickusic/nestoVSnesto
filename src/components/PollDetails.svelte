<script>
    import Card from "../shared/Card.svelte";
    import {createEventDispatcher} from "svelte"
    import PollStore from "../stores/PoolStore";
    import {tweened} from "svelte/motion";
    import firebase from 'firebase/app';
    import {db} from "../firebase";


    const dispatch = createEventDispatcher()
    export let poll

    //reactive values
    $: totalVotes = poll.votesA + poll.votesB;
    $: percentA = Math.floor(100 / totalVotes * poll.votesA || 0)
    $: percentB = Math.floor(100 / totalVotes * poll.votesB || 0)

    const tweenedA = tweened(0)
    const tweenedB = tweened(0)
    $: tweenedA.set(percentA)
    $: tweenedB.set(percentB)

    function createCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    const handleVote = (option, id) => {


        if (readCookie(id) === "a" || readCookie(id) === "b") {
            window.alert("😅 VEĆ STE GLASALI NA TO PITANJE! 😅");
            return
        }

        if (option === "a") {
            db.collection('questions').doc(id).update({
                votesA: firebase.firestore.FieldValue.increment(1)
            })


        }
        if (option === "b") {
            db.collection('questions').doc(id).update({
                votesB: firebase.firestore.FieldValue.increment(1)
            });
        }
        createCookie(id, option)

    }

    const handleDelete = (id) => {
        PollStore.update(currentPolls => {
            return currentPolls.filter(poll => poll.id != id)
        })
        db.collection('questions').doc(id).delete();

    }
</script>

<Card>
    <div class="poll">
        <h3>{poll.question}</h3>
        <p>Ukupno glasova: {totalVotes}</p>
        <div class="answer" on:click={ () => {
            handleVote("a", poll.id)
        }}>
            <div class="percentage percentage-a" style="width: {$tweenedA}%;"></div>
            <span>{poll.answerA} ({poll.votesA})</span>
        </div>
        <div class="answer" on:click={() => {
            handleVote("b", poll.id)
        }}>
            <div class="percentage percentage-b" style="width: {$tweenedB}%;"></div>
            <span>{poll.answerB} ({poll.votesB})</span>
        </div>
        <!--        <div class="delete">-->
        <!--            <Button flat={true} on:click={()=>handleDelete(poll.id)}>Izbriši</Button>-->
        <!--        </div>-->
    </div>
</Card>

<style>
    h3 {
        margin: 0 auto;
        color: #555;
    }

    p {
        margin-top: 6px;
        font-size: 14px;
        color: #aaa;
        margin-bottom: 30px;
    }

    .answer {
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }

    .answer:hover {
        opacity: 0.6;
    }

    span {
        display: inline-block;
        padding: 10px 20px;
    }

    .percentage {
        height: 100%;
        position: absolute;
        box-sizing: border-box;

    }

    .percentage-a {
        background: rgba(217, 27, 66, 0.2);
        border-left: 4px solid #d91b42;
    }

    .percentage-b {
        background: rgba(69, 196, 150, 0.2);
        border-left: 4px solid #45c496;
    }

    .delete {
        margin-top: 30px;
        text-align: center;
    }

</style>