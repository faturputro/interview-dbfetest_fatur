<template>
  <div class="app-sidebar">
    <div class="app-sidebar__header px-4">
      <div class="w-1/3 mx-auto mt-6 mb-10">
        <img src="../assets/logo.png" alt="articl" />
      </div>
    </div>
    <ul class="sidebar-links">
      <li v-for="route in routes" :key="route.path" class="mb-8">
        <router-link
          v-if="!route.children"
          :to="`/dashboard/${route.path}`"
          class="sidebar-link__item px-4 w-full"
        >
          <span class="flex items-center font-semibold">
            <vue-feather :type="route.icon" stroke="#fff" size="20" class="inline-block mr-6"></vue-feather> {{ route.label }}
          </span>
        </router-link>
        <template v-else>
          <span role="button" class="sidebar-link__item w-full" @click="route.expand = !route.expand">
            <span class="flex items-center justify-between font-semibold px-4">
              <div class="flex items-center">
                <vue-feather :type="route.icon" stroke="#fff" size="20" class="inline-block mr-6"></vue-feather> {{ route.label }}
              </div>
              <vue-feather
                type="chevron-down"
                stroke="#fff"
                size="20"
                class="inline-block transition-all duration-200 ease-in-out"
                :class="route.expand && 'rotate-180'"
              ></vue-feather>
            </span>
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from '../routes/dashboard';

export default {
  data() {
    return {
      routes: routes.map((v) => ({
        ...v,
        label: v.meta.title,
        path: v.path,
        name: v.name,
        icon: v.meta.icon,
        expand: false,
      })),
    }
  },
}
</script>