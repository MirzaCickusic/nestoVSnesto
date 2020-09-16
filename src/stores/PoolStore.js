import {writable} from "svelte/store";

const PollStore = writable([
    {
        id: 1,
        question: "Pajton ili Javaskript?",
        answerA: "Pajton",
        answerB: "Javascript",
        votesA: 9,
        votesB: 14
    }
])

export default PollStore

