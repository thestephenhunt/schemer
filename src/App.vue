<script setup>
import { computed } from 'vue'
import ColorPickerBox from './components/ColorPickerBox.vue'
import ColorStrings from './components/ColorStrings.vue'
import ColorShades from './components/ColorShades.vue'
import ColorPalette from './components/ColorPalette.vue'
import { store } from './store/store.js'
import { relLum } from './utils/convert.js'

const relativeLum = computed(() => {
  let lumVal = relLum(store.color.r, store.color.g, store.color.b)
  return lumVal
})
</script>

<template>
  <header>
    <h2>Schemed</h2>
    <p>Relative luminance: {{ relativeLum.toFixed(2) }}</p>
  </header>

  <main>
    <section id="color-variations">
      <ColorShades />
    </section>
    <section id="color-pick">
      <ColorPickerBox />
    </section>
    <section id="color-strings">
      <ColorStrings />
    </section>
    <section id="color-palette">
      <ColorPalette />
    </section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

main {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas:
    "color-variations color-pick color-strings"
    "color-palette color-palette color-palette"; 
  gap: 1rem;
  min-width: 60vw;
}

#color-pick {
  grid-area: color-pick;
}

#color-variations {
  height: 100%;
  grid-area: color-variations;
}
#color-palette {
  grid-area: color-palette;
}
#color-strings {
  grid-area: color-strings;
}
</style>
