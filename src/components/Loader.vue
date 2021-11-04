<template>
  <div class="w-100 d-flex justify-content-center">
      <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader {
  border: 4px solid #e7e7e7;
  border-radius: 50%;
  border-top: 4px solid #292929;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>