import { reactive, watch } from "vue";

export const SETTINGS = reactive({
    muteSounds: false,
    skipCutscenes: false,
    hero: [9, ""],
    partner: [18, ""],

})

export const hasLocalStorage = () => {
    try {
        if (localStorage) return true
        else return false
    }
    catch { return false }
}

if (hasLocalStorage()) {
    let loadedSettings = JSON.parse(localStorage.getItem("sd_settings")!)
    if (loadedSettings) {
        for (const key in SETTINGS) {
            let getSavedValue = loadedSettings[key]
            if (getSavedValue)
                (SETTINGS as any)[key] = getSavedValue
        }
    }
}

watch(SETTINGS, () => {
    if (hasLocalStorage())
        localStorage.setItem("sd_settings", JSON.stringify(SETTINGS))
})