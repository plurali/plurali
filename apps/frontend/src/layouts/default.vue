<template>
  <div id="plurali" class="relative w-screen min-h-screen bg-cover bg-no-repeat bg-center flex">
    <Transition
      enter-active-class="duration-300 ease-in-out"
      enter-from-class="transition opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-300 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="transition opacity-0"
      :duration="{ enter: 300, leave: 300 }"
    >
      <svg
        v-if="typeof bg !== 'string'"
        id="visual"
        class="absolute w-screen h-screen h-full top-0 object-cover object-center -z-10 transition-all"
        viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
        @load="onLoad"
        preserveAspectRatio="none"
        version="1.1"
      >
        <path
          d="M0 25L8.8 26C17.7 27 35.3 29 53 32C70.7 35 88.3 39 106 38C123.7 37 141.3 31 159 28C176.7 25 194.3 25 212 28C229.7 31 247.3 37 265 38C282.7 39 300.3 35 318 32C335.7 29 353.3 27 371 29C388.7 31 406.3 37 423.8 40C441.3 43 458.7 43 476.2 41C493.7 39 511.3 35 529 32C546.7 29 564.3 27 582 26C599.7 25 617.3 25 635 26C652.7 27 670.3 29 688 30C705.7 31 723.3 31 741 33C758.7 35 776.3 39 794 39C811.7 39 829.3 35 847 34C864.7 33 882.3 35 891.2 36L900 37L900 0L891.2 0C882.3 0 864.7 0 847 0C829.3 0 811.7 0 794 0C776.3 0 758.7 0 741 0C723.3 0 705.7 0 688 0C670.3 0 652.7 0 635 0C617.3 0 599.7 0 582 0C564.3 0 546.7 0 529 0C511.3 0 493.7 0 476.2 0C458.7 0 441.3 0 423.8 0C406.3 0 388.7 0 371 0C353.3 0 335.7 0 318 0C300.3 0 282.7 0 265 0C247.3 0 229.7 0 212 0C194.3 0 176.7 0 159 0C141.3 0 123.7 0 106 0C88.3 0 70.7 0 53 0C35.3 0 17.7 0 8.8 0L0 0Z"
          :fill="bg[0]"
        ></path>
        <path
          d="M0 73L8.8 72C17.7 71 35.3 69 53 70C70.7 71 88.3 75 106 75C123.7 75 141.3 71 159 68C176.7 65 194.3 63 212 66C229.7 69 247.3 77 265 78C282.7 79 300.3 73 318 69C335.7 65 353.3 63 371 66C388.7 69 406.3 77 423.8 79C441.3 81 458.7 77 476.2 73C493.7 69 511.3 65 529 63C546.7 61 564.3 61 582 60C599.7 59 617.3 57 635 60C652.7 63 670.3 71 688 73C705.7 75 723.3 71 741 70C758.7 69 776.3 71 794 72C811.7 73 829.3 73 847 74C864.7 75 882.3 77 891.2 78L900 79L900 35L891.2 34C882.3 33 864.7 31 847 32C829.3 33 811.7 37 794 37C776.3 37 758.7 33 741 31C723.3 29 705.7 29 688 28C670.3 27 652.7 25 635 24C617.3 23 599.7 23 582 24C564.3 25 546.7 27 529 30C511.3 33 493.7 37 476.2 39C458.7 41 441.3 41 423.8 38C406.3 35 388.7 29 371 27C353.3 25 335.7 27 318 30C300.3 33 282.7 37 265 36C247.3 35 229.7 29 212 26C194.3 23 176.7 23 159 26C141.3 29 123.7 35 106 36C88.3 37 70.7 33 53 30C35.3 27 17.7 25 8.8 24L0 23Z"
          :fill="bg[1]"
        ></path>
        <path
          d="M0 115L8.8 114C17.7 113 35.3 111 53 111C70.7 111 88.3 113 106 115C123.7 117 141.3 119 159 116C176.7 113 194.3 105 212 107C229.7 109 247.3 121 265 124C282.7 127 300.3 121 318 117C335.7 113 353.3 111 371 115C388.7 119 406.3 129 423.8 129C441.3 129 458.7 119 476.2 118C493.7 117 511.3 125 529 125C546.7 125 564.3 117 582 110C599.7 103 617.3 97 635 100C652.7 103 670.3 115 688 122C705.7 129 723.3 131 741 130C758.7 129 776.3 125 794 123C811.7 121 829.3 121 847 121C864.7 121 882.3 121 891.2 121L900 121L900 77L891.2 76C882.3 75 864.7 73 847 72C829.3 71 811.7 71 794 70C776.3 69 758.7 67 741 68C723.3 69 705.7 73 688 71C670.3 69 652.7 61 635 58C617.3 55 599.7 57 582 58C564.3 59 546.7 59 529 61C511.3 63 493.7 67 476.2 71C458.7 75 441.3 79 423.8 77C406.3 75 388.7 67 371 64C353.3 61 335.7 63 318 67C300.3 71 282.7 77 265 76C247.3 75 229.7 67 212 64C194.3 61 176.7 63 159 66C141.3 69 123.7 73 106 73C88.3 73 70.7 69 53 68C35.3 67 17.7 69 8.8 70L0 71Z"
          :fill="bg[2]"
        ></path>
        <path
          d="M0 217L8.8 224C17.7 231 35.3 245 53 251C70.7 257 88.3 255 106 251C123.7 247 141.3 241 159 236C176.7 231 194.3 227 212 228C229.7 229 247.3 235 265 240C282.7 245 300.3 249 318 251C335.7 253 353.3 253 371 249C388.7 245 406.3 237 423.8 236C441.3 235 458.7 241 476.2 249C493.7 257 511.3 267 529 267C546.7 267 564.3 257 582 243C599.7 229 617.3 211 635 206C652.7 201 670.3 209 688 225C705.7 241 723.3 265 741 266C758.7 267 776.3 245 794 238C811.7 231 829.3 239 847 243C864.7 247 882.3 247 891.2 247L900 247L900 119L891.2 119C882.3 119 864.7 119 847 119C829.3 119 811.7 119 794 121C776.3 123 758.7 127 741 128C723.3 129 705.7 127 688 120C670.3 113 652.7 101 635 98C617.3 95 599.7 101 582 108C564.3 115 546.7 123 529 123C511.3 123 493.7 115 476.2 116C458.7 117 441.3 127 423.8 127C406.3 127 388.7 117 371 113C353.3 109 335.7 111 318 115C300.3 119 282.7 125 265 122C247.3 119 229.7 107 212 105C194.3 103 176.7 111 159 114C141.3 117 123.7 115 106 113C88.3 111 70.7 109 53 109C35.3 109 17.7 111 8.8 112L0 113Z"
          :fill="bg[3]"
        ></path>
        <path
          d="M0 289L8.8 295C17.7 301 35.3 313 53 319C70.7 325 88.3 325 106 319C123.7 313 141.3 301 159 295C176.7 289 194.3 289 212 292C229.7 295 247.3 301 265 308C282.7 315 300.3 323 318 323C335.7 323 353.3 315 371 310C388.7 305 406.3 303 423.8 303C441.3 303 458.7 305 476.2 309C493.7 313 511.3 319 529 318C546.7 317 564.3 309 582 296C599.7 283 617.3 265 635 262C652.7 259 670.3 271 688 289C705.7 307 723.3 331 741 332C758.7 333 776.3 311 794 301C811.7 291 829.3 293 847 296C864.7 299 882.3 303 891.2 305L900 307L900 245L891.2 245C882.3 245 864.7 245 847 241C829.3 237 811.7 229 794 236C776.3 243 758.7 265 741 264C723.3 263 705.7 239 688 223C670.3 207 652.7 199 635 204C617.3 209 599.7 227 582 241C564.3 255 546.7 265 529 265C511.3 265 493.7 255 476.2 247C458.7 239 441.3 233 423.8 234C406.3 235 388.7 243 371 247C353.3 251 335.7 251 318 249C300.3 247 282.7 243 265 238C247.3 233 229.7 227 212 226C194.3 225 176.7 229 159 234C141.3 239 123.7 245 106 249C88.3 253 70.7 255 53 249C35.3 243 17.7 229 8.8 222L0 215Z"
          :fill="bg[4]"
        ></path>
        <path
          d="M0 319L8.8 325C17.7 331 35.3 343 53 349C70.7 355 88.3 355 106 349C123.7 343 141.3 331 159 327C176.7 323 194.3 327 212 331C229.7 335 247.3 339 265 343C282.7 347 300.3 351 318 349C335.7 347 353.3 339 371 336C388.7 333 406.3 335 423.8 338C441.3 341 458.7 345 476.2 347C493.7 349 511.3 349 529 345C546.7 341 564.3 333 582 321C599.7 309 617.3 293 635 290C652.7 287 670.3 297 688 316C705.7 335 723.3 363 741 366C758.7 369 776.3 347 794 335C811.7 323 829.3 321 847 322C864.7 323 882.3 327 891.2 329L900 331L900 305L891.2 303C882.3 301 864.7 297 847 294C829.3 291 811.7 289 794 299C776.3 309 758.7 331 741 330C723.3 329 705.7 305 688 287C670.3 269 652.7 257 635 260C617.3 263 599.7 281 582 294C564.3 307 546.7 315 529 316C511.3 317 493.7 311 476.2 307C458.7 303 441.3 301 423.8 301C406.3 301 388.7 303 371 308C353.3 313 335.7 321 318 321C300.3 321 282.7 313 265 306C247.3 299 229.7 293 212 290C194.3 287 176.7 287 159 293C141.3 299 123.7 311 106 317C88.3 323 70.7 323 53 317C35.3 311 17.7 299 8.8 293L0 287Z"
          :fill="bg[5]"
        ></path>
        <path
          d="M0 487L8.8 489C17.7 491 35.3 495 53 498C70.7 501 88.3 503 106 497C123.7 491 141.3 477 159 468C176.7 459 194.3 455 212 456C229.7 457 247.3 463 265 465C282.7 467 300.3 465 318 462C335.7 459 353.3 455 371 462C388.7 469 406.3 487 423.8 493C441.3 499 458.7 493 476.2 485C493.7 477 511.3 467 529 460C546.7 453 564.3 449 582 451C599.7 453 617.3 461 635 467C652.7 473 670.3 477 688 484C705.7 491 723.3 501 741 504C758.7 507 776.3 503 794 496C811.7 489 829.3 479 847 475C864.7 471 882.3 473 891.2 474L900 475L900 329L891.2 327C882.3 325 864.7 321 847 320C829.3 319 811.7 321 794 333C776.3 345 758.7 367 741 364C723.3 361 705.7 333 688 314C670.3 295 652.7 285 635 288C617.3 291 599.7 307 582 319C564.3 331 546.7 339 529 343C511.3 347 493.7 347 476.2 345C458.7 343 441.3 339 423.8 336C406.3 333 388.7 331 371 334C353.3 337 335.7 345 318 347C300.3 349 282.7 345 265 341C247.3 337 229.7 333 212 329C194.3 325 176.7 321 159 325C141.3 329 123.7 341 106 347C88.3 353 70.7 353 53 347C35.3 341 17.7 329 8.8 323L0 317Z"
          :fill="bg[6]"
        ></path>
        <path
          d="M0 523L8.8 526C17.7 529 35.3 535 53 538C70.7 541 88.3 541 106 533C123.7 525 141.3 509 159 501C176.7 493 194.3 493 212 496C229.7 499 247.3 505 265 509C282.7 513 300.3 515 318 512C335.7 509 353.3 501 371 505C388.7 509 406.3 525 423.8 530C441.3 535 458.7 529 476.2 521C493.7 513 511.3 503 529 500C546.7 497 564.3 501 582 505C599.7 509 617.3 513 635 515C652.7 517 670.3 517 688 521C705.7 525 723.3 533 741 537C758.7 541 776.3 541 794 536C811.7 531 829.3 521 847 516C864.7 511 882.3 511 891.2 511L900 511L900 473L891.2 472C882.3 471 864.7 469 847 473C829.3 477 811.7 487 794 494C776.3 501 758.7 505 741 502C723.3 499 705.7 489 688 482C670.3 475 652.7 471 635 465C617.3 459 599.7 451 582 449C564.3 447 546.7 451 529 458C511.3 465 493.7 475 476.2 483C458.7 491 441.3 497 423.8 491C406.3 485 388.7 467 371 460C353.3 453 335.7 457 318 460C300.3 463 282.7 465 265 463C247.3 461 229.7 455 212 454C194.3 453 176.7 457 159 466C141.3 475 123.7 489 106 495C88.3 501 70.7 499 53 496C35.3 493 17.7 489 8.8 487L0 485Z"
          :fill="bg[7]"
        ></path>
        <path
          d="M0 601L8.8 601C17.7 601 35.3 601 53 601C70.7 601 88.3 601 106 601C123.7 601 141.3 601 159 601C176.7 601 194.3 601 212 601C229.7 601 247.3 601 265 601C282.7 601 300.3 601 318 601C335.7 601 353.3 601 371 601C388.7 601 406.3 601 423.8 601C441.3 601 458.7 601 476.2 601C493.7 601 511.3 601 529 601C546.7 601 564.3 601 582 601C599.7 601 617.3 601 635 601C652.7 601 670.3 601 688 601C705.7 601 723.3 601 741 601C758.7 601 776.3 601 794 601C811.7 601 829.3 601 847 601C864.7 601 882.3 601 891.2 601L900 601L900 509L891.2 509C882.3 509 864.7 509 847 514C829.3 519 811.7 529 794 534C776.3 539 758.7 539 741 535C723.3 531 705.7 523 688 519C670.3 515 652.7 515 635 513C617.3 511 599.7 507 582 503C564.3 499 546.7 495 529 498C511.3 501 493.7 511 476.2 519C458.7 527 441.3 533 423.8 528C406.3 523 388.7 507 371 503C353.3 499 335.7 507 318 510C300.3 513 282.7 511 265 507C247.3 503 229.7 497 212 494C194.3 491 176.7 491 159 499C141.3 507 123.7 523 106 531C88.3 539 70.7 539 53 536C35.3 533 17.7 527 8.8 524L0 521Z"
          :fill="bg[8]"
        ></path>
      </svg>
      <img
        v-else
        :class="!imageLoaded && 'opacity-0'"
        @load="onLoad"
        :src="bg"
        class="absolute w-screen top-0 object-cover -z-10 transition-all duration-300 h-full"
      />
    </Transition>
    <div class="container max-w-7xl mx-auto">
      <div class="py-16 md:py-24 px-4">
        <div class="inline-flex flex-col gap-0.5 w-full">
          <RequiredPluralKey v-if="user && !user.pluralKey"/>
          <NoEmailAssigned v-if="user && !user.email"/>
          <EmailNotVerified v-if="user && user.email && !user.verified" />
          <Flash v-for="flash of flashes" :color="flash.color">
            <Sanitized :value="flash.message"/>
          </Flash>
        </div>
        <div class="bg-white rounded-2xl shadow-2xl p-8" :class="typeof bg === 'string' && 'bg-opacity-60'">
          <NotificationRenderer />
          <div v-if="goBack" class="mb-5 inline-flex w-full justify-start items-center">
            <router-link :to="goBack" class="text-gray-500 hover:text-black transition">← Go back</router-link>
          </div>

          <router-view />

          <div class="pt-5 mt-5 inline-flex w-full justify-start items-center font-normal text-gray-700 border-t">
            <p>
              <router-link to="/" class="text-violet-700 font-medium">Plurali <b v-if="isPubDev"><u>Public Beta</u></b></router-link>
              by
              <a
                href="https://github.com/lilianalillyy"
                target="_blank"
                rel="noreferrer noopener"
                class="text-violet-700 font-medium"
                >Liliana</a
              >
              <br />
              <span
                >
                Plurali is in a early beta, things <s>may</s> <s>will</s> did break. Feel free to
                <a href="https://github.com/plurali/Plurali/issues" target="_blank" rel="noreferrer noopener"
                  ><u>report them</u></a
                >.
              </span>
              <span v-if="isPubDev"><br />This is a public <b>beta instance</b> and uses data from the <b>Simply Plural Beta</b>.<br /></span>
              <span class="text-sm text-gray-500"
                >Not affiliated with Apparyllis/Simply Plural |
                <a
                  href="https://github.com/plurali/Plurali/blob/dev/DATA.md"
                  target="_blank"
                  rel="noreferrer noopener"
                  class="text-violet-500"
                  >Data Transparency</a
                ></span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import { background, flashes, goBack, notifications, user } from '../store';
import Flash from '../components/Flash.vue';
import { isUrl, generateShades } from '../utils';
import Sanitized from '../components/global/Sanitized.vue';
import Notification from '../components/Notification.vue';
import { isPubDev } from "../api";
import RequiredPluralKey from '../components/notifications/RequiredPluralKey.vue';
import NoEmailAssigned from '../components/notifications/NoEmailAssigned.vue';
import EmailNotVerified from '../components/notifications/EmailNotVerified.vue';
import NotificationRenderer from '../components/NotificationRenderer.vue';

export default defineComponent({
  setup() {
    const bg = computed(() => {
      let val: string[] | string | null = background.value;

      if (!val) {
        val = ['#3b0764', '#4b1876', '#5b2788', '#6b369a', '#7c45ad', '#8d54c0', '#9e64d4', '#af74e8', '#c084fc'];
      } else if (!isUrl(val)) {
        val = generateShades(val);
      }

      const bodyColor = Array.isArray(val) ? val[val.length - 1] : "#fff";
      document.body.style.backgroundColor = bodyColor;

      return val;
    });

    const imageLoaded = ref(false);

    const stop = watch(bg, (curr, prev) => {
      if (curr !== prev && typeof curr === 'string') {
        imageLoaded.value = false;
      }
    });

    onBeforeUnmount(() => stop());

    const onLoad = () => {
      imageLoaded.value = true;
    };

    return {
      flashes,
      bg,
      goBack,
      onLoad,
      imageLoaded,
      arr: (...arrays: any[]) => arrays.find(val => Array.isArray(val)),
      notifications,
      user,
      isPubDev,
    };
  },
  components: { Flash, Sanitized, Notification, RequiredPluralKey, EmailNotVerified, NotificationRenderer, NoEmailAssigned },
});
</script>
