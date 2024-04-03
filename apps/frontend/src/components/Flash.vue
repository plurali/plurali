  <template>
  <div :style="containerStyle" :class="['px-8 py-2.5 mb-4 font-medium rounded-2xl w-full', containerClass]">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isHex } from '../utils';
import { FlashType } from '../store';

const flashTypeToClass = {
  [FlashType.Primary]: 'bg-purple-700 text-white',
  [FlashType.Danger]: 'bg-red-700 text-white',
  [FlashType.Warning]: 'bg-yellow-600 text-white',
  [FlashType.Success]: 'bg-green-700 text-white',
  [FlashType.Info]: 'bg-blue-700 text-white',
}

export default defineComponent({
  props: {
    color: {
      type: String,
    },
  },
  setup({ color }) {
    const containerStyle = computed(() => (color?.startsWith("#") && isHex(color)) ? { backgroundColor: color, color: "#fff" } : {});
    const containerClass = computed(() => (color && Object.keys(FlashType).includes(color)) ? flashTypeToClass[color as FlashType] : "");

    return {
      containerStyle,
      containerClass,
    }
  }
});
</script>