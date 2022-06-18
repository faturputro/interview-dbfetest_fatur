<template>
  <el-collapse accordion>
    <el-collapse-item v-for="route in items" :key="route.path" class="mb-8" name="1">
      <template #title>
        <span role="button" class="sidebar-link__item px-4 w-full">
          <span class="flex items-center justify-between font-semibold w-full">
            <span class="flex items-center">
              <vue-feather :type="route.icon" stroke="#ffffff" size="20" class="inline-block mr-6"></vue-feather> {{ route.label }}
            </span>
            <vue-feather type="chevron-down" stroke="#ffffff" size="20"></vue-feather>
          </span>
        </span>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    items: Array,
  },
};
</script>
