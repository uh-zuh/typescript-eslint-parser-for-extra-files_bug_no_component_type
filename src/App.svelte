<script lang="ts">
  import TestComponent from './lib/TestComponent.svelte';

  let test: TestComponent;

  function mainFunc() {
    test.testFunc();
  }
</script>

<main>
  <TestComponent bind:this={test} />
  <button type="button" onclick={() => mainFunc()}>click</button>
</main>
