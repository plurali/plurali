import { onBeforeUnmount, onMounted } from "vue"

export const useVisibilityChange = (handler: (visible: boolean) => void) => {
    const handleVisibilityChange = () => {
        handler(!document.hidden);
    } 

    onMounted(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange)
    })

    onBeforeUnmount(() => {
        document.removeEventListener("visibilitychange", handleVisibilityChange)
    })
}