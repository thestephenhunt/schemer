import { reactive } from 'vue'

export const store = reactive({
    color: { r: 255, g: 255, b: 255 },
    palette: [],
    selected: null
})