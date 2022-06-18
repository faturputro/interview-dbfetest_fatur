<template>
  <div class="h-full-screen w-screen flex items-center justify-center flex-col">
    <div>
      <h1 class="text-center text-9xl">404</h1>
      <h1 class="text-center">Not Found</h1>
    </div>
    <el-button type="primary" class="block mt-10" @click="$router.go(-1)">Go Back</el-button>
  </div>
</template>
