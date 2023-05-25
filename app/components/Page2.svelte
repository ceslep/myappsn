<script>
  import { goBack } from 'svelte-native';


  function goBackToHome() {
   goBack();
  }
</script>

<page>
  <actionBar title="Localización" backgroundColor="green" color="white" />
  <stackLayout>
  <button text="Volver" on:tap={goBackToHome} />
  </stackLayout>
</page>
