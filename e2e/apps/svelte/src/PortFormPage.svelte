<script>
import { Button } from '@intuition-ui/svelte';

let name = $state("");
let email = $state("");
let message = $state("");
let sending = $state(false);
let result = $state("");

async function handleSubmit(event) {
	event.preventDefault();
	sending = true;
	result = "";
	await new Promise((resolve) => setTimeout(resolve, 600));
	result = `Sent: ${name} <${email}>: ${message}`;
	sending = false;
}

function handleReset() {
	name = "";
	email = "";
	message = "";
	result = "";
}
</script>


<main>
  <h1>Intuition UI in Svelte</h1>
  <p>Test page for iu-button inside a native form.</p>

  <form onsubmit={handleSubmit} onreset={handleReset}>
    <label>
      Name
      <input name="name" bind:value={name} required />
    </label>
    <label>
      E-mail
      <input name="email" type="email" bind:value={email} required />
    </label>
    <label>
      Message
      <textarea name="message" rows="4" bind:value={message}></textarea>
    </label>

    <div>
      <Button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </Button>
      <Button type="reset" variant="secondary">Clear</Button>
      <Button variant="ghost" size="sm" onclick={() => (result = "Ghost clicked")}>Ghost</Button>
    </div>
  </form>

  {#if result}
    <p>{result}</p>
  {/if}
</main>
