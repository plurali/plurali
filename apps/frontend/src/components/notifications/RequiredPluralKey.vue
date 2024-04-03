<template>
    <Flash v-if="$route.name !== 'dashboard:user'" :color="FlashType.Primary">
        A Simply Plural API key is required before accessing the system dashboard.
        <span>You can set it up <router-link to="/dashboard/user" class="border-b-2 border-white">here</router-link>.</span>
    </Flash>
</template>

<script setup lang="ts">
import Flash from "../Flash.vue";
import { FlashType } from "../../store";
</script>