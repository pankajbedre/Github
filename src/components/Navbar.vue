<template>
    <div class="navbar-box d-flex align-items-center position-fixed px-3 py-2 w-100">
        <img class="logo" src="../assets/github.png" alt=""> 
        <p class="mb-0 mx-2">Github</p>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
.navbar-box {
    z-index: 50;
    top: 0;
    left: 0;
    background-color: #fff;
}
.logo {
    width: 2em;
    height: 2em;
}
</style>