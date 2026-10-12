<template>
  <main>
    <h1>Event naming in Vue</h1>
    <iu-event-probe
      @iu-press="counts.hyphen++"
      @iupress="counts.lower++"
      @iuPress="counts.camel++"
      @IuPress="counts.pascal++"
    ></iu-event-probe>
    <ul>
      <li>@iu-press: <span data-testid="hyphen">{{ counts.hyphen }}</span></li>
      <li>@iupress: <span data-testid="lower">{{ counts.lower }}</span></li>
      <li>@iuPress: <span data-testid="camel">{{ counts.camel }}</span></li>
      <li>@IuPress: <span data-testid="pascal">{{ counts.pascal }}</span></li>
    </ul>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

const counts = reactive({ hyphen: 0, lower: 0, camel: 0, pascal: 0 })
</script>
