<template>
  <main>
    <h1>Intuition UI in Vue</h1>
    <p>Test page for iu-button inside a native form.</p>

    <form @submit.prevent="handleSubmit" @reset="handleReset">
      <label>
        Name
        <input v-model="name" name="name" required />
      </label>
      <label>
        E-mail
        <input v-model="email" name="email" type="email" required />
      </label>
      <label>
        Message
        <textarea v-model="message" name="message" rows="4"></textarea>
      </label>

      <div>
        <iu-button type="submit" :disabled="sending">
          {{ sending ? 'Sending...' : 'Send' }}
        </iu-button>
        <iu-button type="reset" variant="secondary">Clear</iu-button>
        <iu-button variant="ghost" size="sm" @click="result = 'Ghost clicked'">Ghost</iu-button>
      </div>
    </form>

    <p v-if="result">{{ result }}</p>
  </main>
</template>

<script setup>
import { IuButton } from '@intuition-ui/vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const result = ref('')

async function handleSubmit() {
  sending.value = true
  result.value = ''
  await new Promise((resolve) => setTimeout(resolve, 600))
  result.value = `Sent: ${name.value} <${email.value}>: ${message.value}`
  sending.value = false
}

function handleReset() {
  name.value = ''
  email.value = ''
  message.value = ''
  result.value = ''
}
</script>
