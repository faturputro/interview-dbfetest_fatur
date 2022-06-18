<template>
  <div class="flex items-center">
    <Sidebar />
    <div class="app-container">
      <div class="py-4 flex items-center justify-between">
        <div class="flex items-center">
          <button type="button" style="width: 24px; height: 24px" class="mr-4">
            <vue-feather type="menu" stroke="#0e0f19"></vue-feather>
          </button>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
}
</script>
