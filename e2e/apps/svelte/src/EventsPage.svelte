<script>
let counts = $state({ hyphen: 0, lower: 0, camel: 0, pascal: 0 });
</script>

<main>
  <h1>Event naming in Svelte</h1>
  <iu-event-probe
    oniu-press={() => counts.hyphen++}
    oniupress={() => counts.lower++}
    oniuPress={() => counts.camel++}
    onIuPress={() => counts.pascal++}
  ></iu-event-probe>
  <ul>
    <li>oniu-press: <span data-testid="hyphen">{counts.hyphen}</span></li>
    <li>oniupress: <span data-testid="lower">{counts.lower}</span></li>
    <li>oniuPress: <span data-testid="camel">{counts.camel}</span></li>
    <li>onIuPress: <span data-testid="pascal">{counts.pascal}</span></li>
  </ul>
</main>
