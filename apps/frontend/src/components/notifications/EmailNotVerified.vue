<template>
    <Flash :color="FlashType.Warning" class="flex justify-between items-center gap-4">
        Your email is not verified. Please check your inbox.
    </Flash>
</template>

<script setup lang="ts">
import Flash from "../Flash.vue";
import { FlashType } from "../../store";
</script>