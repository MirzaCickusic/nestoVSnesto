<script>
    import Footer from "./components/Footer.svelte";
    import Header from "./components/Header.svelte";
    import Tabs from "./shared/Tabs.svelte";
    import CreatePollForm from "./components/CreatePollForm.svelte";
    import PollList from "./components/PollList.svelte";


    let items = ["Lista Anketa", "Dodaj Anketu"]
    let itemActive = "Lista Anketa"

    const tabChange = (e) => {
        itemActive = e.detail
    }

    const handleAddPoll = (e) => {
        itemActive = "Lista Anketa"
    }

</script>

<Header/>
<main>
    <Tabs {items} {itemActive} on:tabChange={tabChange}/>
    {#if itemActive === "Lista Anketa"}
        <PollList/>
    {:else if itemActive === "Dodaj Anketu"}
        <CreatePollForm on:addPoll={handleAddPoll}/>
    {/if}
</main>
<Footer/>

<style>

    @media only screen and (max-width: 600px) {
        main {
            width: 90%!important;
        }
    }

    main {
        width: 980px;
        margin: 40px auto;
    }

</style>