<script>

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
      <iu-button type="submit" disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </iu-button>
      <iu-button type="reset" variant="secondary">Clear</iu-button>
      <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
      <iu-button variant="ghost" size="sm" onclick={() => (result = "Ghost clicked")}>Ghost</iu-button>
    </div>
  </form>

  {#if result}
    <p>{result}</p>
  {/if}
</main>
