<template>
    <Flash v-if="$route.name !== 'dashboard:user'" :color="FlashType.Warning">
        There is no email assigned to your user account yet.
        <span>Set one <router-link to="/dashboard/user" class="border-b-2 border-white">here</router-link> to prevent losing your account.</span>
    </Flash>
</template>

<script setup lang="ts">
import Flash from "../Flash.vue";
import { FlashType } from "../../store";
</script>