<script>
  import { goBack } from 'svelte-native';
  import * as nav from "../Nav"
    import Home from './Home.svelte';

  function goBackToHome() {
   nav.goto(Home)
  }
</script>

<page>
  <actionBar title="Pagina 2" backgroundColor="green" color="white" />
  <stackLayout>
  <button text="Volver" on:tap={goBackToHome} />
  <datePicker date="2023-05-28" />
  </stackLayout>
</page>
