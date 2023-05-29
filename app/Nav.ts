import { navigate } from 'svelte-native'
import { writable } from 'svelte/store'
import { Trace } from '@nativescript/core'

export let current_page = writable(null);

let nav_frame:any;


export function goto(view:any, props:any)  {
  current_page.set(view);

  navigate({
    page: view,
    props: props,
    clearHistory: true,
    frame: nav_frame
 });
}

