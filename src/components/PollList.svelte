<script>
    import PollDetails from "./PollDetails.svelte";
    import {flip} from "svelte/animate"
    import {fade, slide, scale} from "svelte/transition"
    import PollStore from "../stores/PoolStore.js";
    import {onDestroy, onMount} from "svelte";
    import {db} from "../firebase";
    import {collectionData} from 'rxfire/firestore';
    import {startWith} from 'rxjs/operators';


    `export let polls = []

    const unsub = PollStore.subscribe(data => {
        polls = data
    })

    onDestroy(() => {
        unsub()
    })`

    const query = db.collection('questions')
    let polls = collectionData(query, "id").pipe(startWith([]));

</script>


<div class="poll-list">
    {#each $polls as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{duration: 500}}>
            <PollDetails {poll}/>
        </div>

    {/each}
</div>

<style>

    @media only screen and (max-width: 600px) {
        .poll-list {
            display: grid;
            grid-template-columns: 1fr!important;
            grid-gap: 20px;
            text-align: center!important;
        }
    }

    .poll-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

</style>