import { mount } from 'svelte'
import '../../../shared/event-probe.js'
import EventsPage from './EventsPage.svelte'

mount(EventsPage, { target: document.getElementById('app') })
