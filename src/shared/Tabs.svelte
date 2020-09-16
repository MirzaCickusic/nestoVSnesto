<script>
    import { createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    export let items;
    export let itemActive;

</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <li on:click={() => dispatch('tabChange', item)}>
                <div class:active={item === itemActive}>{item}</div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .active {
        color: #d91b42;
        border-bottom: 2px solid #d91b42;
        padding-bottom: 8px;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }

    li{
        margin: 0 16px;
        font-size: 18px;
        color: #555;
        cursor: pointer;
    }

    .tabs {
        margin-bottom: 40px;}




</style>