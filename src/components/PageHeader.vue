<template>
  <div class="pb-4">
    <h1 class="text-6xl font-weight-bold">{{ title }}</h1>
    <p class="opacity-50">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
  },
};
</script>
