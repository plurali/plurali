<template>
    <div v-if="!!notifications && notifications.length >= 1" class="inline-flex flex-col gap-4 w-full mb-12">
        <Notification v-for="notification of notifications" :color="notification.color">
            <Sanitized :value="notification.message" />
        </Notification>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getNotifications } from '../api/notification';
import { notifications } from "../store";
import { useVisibilityChange } from '../composables/tabVisibility';
import Notification from './Notification.vue';
import Sanitized from './global/Sanitized.vue';

const loading = ref(false);

const fetchNotifications = async () => {
    if (loading.value) {
        return;
    }

    loading.value = true;

    try {
        const apiNotifications = (await getNotifications()).data ?? { success: false };

        if (apiNotifications.success && apiNotifications.data?.length >= 1) {
            notifications.value = apiNotifications.data.map((n) => ({
                color: n.color,
                message: n.content,
            })) ?? [];
        }
    } catch (e) {
        console.warn("failed to fetch notifications", { e });
    }

    loading.value = false;
}

onMounted(() => {
    fetchNotifications();
})

useVisibilityChange((visible) => {
    if (visible) {
        fetchNotifications();
    }
})
</script>