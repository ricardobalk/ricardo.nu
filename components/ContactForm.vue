<template>
  <form class="contact-form" @submit="submitForm">
    <span class="form-field">
      <label for="pname">Your name:</label>
      <input type="text" name="pname" placeholder="John Doe" v-model="formDetails.name"/>
    </span>

    <span class="form-field">
      <label for="email">Your email address or phone number:</label>
      <input name="email" type="text" placeholder="john.doe@example.com" v-model="formDetails.email"/>
    </span>

    <span class="form-field">
      <label for="message">Your message:</label>
      <textarea name="message" rows="6" placeholder="Your Message" v-model="formDetails.message" />
    </span>

    <span class="form-submit mt-2">
      <button type="submit" :class="sendButtonClasses" :disabled="sendButtonDisabled">
        {{ buttonText }}
      </button>
    </span>
  </form>
</template>

<style lang="postcss">
  .contact-form {
    @apply w-full relative flex flex-col gap-4;
    .form-field {
      label {
        @apply inline-block w-full text-xs text-left text-emerald-500 mb-3;
      }
    }

    input[type="text"],
    input[type="email"],
    textarea,
    button {
      @apply w-full bg-transparent rounded py-3 px-4 text-sm placeholder-emerald-700 border border-emerald-700 outline-none focus-visible:shadow-none focus:border-emerald-200 focus:placeholder-emerald-200;
    }

    button {
      @apply text-emerald-400;
      &:hover {
        @apply text-emerald-200 border-emerald-200
      }
      &:disabled {
        @apply text-emerald-700 border-emerald-700 cursor-not-allowed;
      }
      &.error {
        @apply text-red-200 border-red-400;
      }
    }
  }
</style>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import * as Cryptography from '@/utils/cryptography';

const formDetails = ref({
  name: '',
  email: '',
  message: '',
});

const formStatus = ref('idle');

const buttonText = computed(() => {
  switch (formStatus.value) {
    case 'idle':
      return 'Encrypt & Send';
    case 'fetching':
      return 'Fetching key...';
    case 'encrypting':
      return 'Encrypting...';
    case 'sending':
      return 'Sending...';
    case 'sent':
      return 'Sent!';
    case 'error':
      return 'Error';
    default:
      return 'Encrypt & Send';
  };
});

const sendButtonClasses = computed(() => {
  return {
    error: formStatus.value === 'error',
  }
});

const sendButtonDisabled = computed(() => {
  if (formStatus.value !== 'idle')       return true;
  if (formDetails.value.name === '')     return true;
  if (formDetails.value.email === '')    return true;
  if (formDetails.value.message === '')  return true;

  return false;
});

type FormStatus = 'idle' | 'fetching' | 'encrypting' | 'sending' | 'sent' | 'error';

/**
 * Sets the status of the form, and resets the form when the status is 'idle' after 'sent'.
 * @param {object} options
 * @param {string} options.value - The status to set.
 * @returns {object} The old and new values.
 * @example
 * setStatus({ value: 'fetching'   });    // => { oldValue: 'idle',       newValue: 'fetching'   }
 * setStatus({ value: 'encrypting' });    // => { oldValue: 'fetching'    newValue: 'encrypting' }
 * setStatus({ value: 'sending'    });    // => { oldValue: 'encrypting', newValue: 'sending'    }
 * setStatus({ value: 'sent'       });    // => { oldValue: 'sending',    newValue: 'sent'       }
 * setStatus({ value: 'error'      });    // => { oldValue: 'encrypting', newValue: 'error'      }
 * setStatus({ value: 'idle'       });    // => { oldValue: 'sent',       newValue: 'idle'       }
 */
const setStatus = ({ value }: { value: FormStatus }) => {
  const oldValue = formStatus.value;
  const newValue = value;

  formStatus.value = newValue;

  if (oldValue === 'sent' && newValue === 'idle') {
    formDetails.value = {
      name: '',
      email: '',
      message: '',
    };
  }

  return { oldValue, newValue };
};

const submitForm = async (event: Event) => {
  event.preventDefault();

  if(formStatus.value !== 'idle') return; // Prevents multiple submissions.

  try {
    const message = `Name: ${formDetails.value.name}\nEmail: ${formDetails.value.email}\nMessage: ${formDetails.value.message}`
    let publicKey : string = '';
    let encryptedMessage : string = '';

    // Get the public key.
    try {
      setStatus({ value: 'fetching' });
      publicKey = await Cryptography.fetchPublicKey({ source: 'remote', useFallback: false });
    } catch (error) {
      throw (`Error obtaining public key: ${error}`);
    }

    // Encrypt the message.
    try {
      setStatus({ value: 'encrypting' });
      encryptedMessage = await Cryptography.encryptMessage({ message, publicKey });
    } catch (error) {
      throw (`Error encrypting message: ${error}`);
    }

    // Send the message.
    try {
      setStatus({ value: 'sending' });
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: encryptedMessage }, null, 2),
       });

      if (response.status === 200) {
        setStatus({ value: 'sent' });
      } else {
        throw (`Response status not 200, but ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      throw (`Error sending message: ${error}`);
    }

  } catch (error) {
    setStatus({ value: 'error' });
    console.error(error);
  } finally {
    setTimeout(() => {
      setStatus({ value: 'idle' });
    }, 5000);
  }
};
</script>