<template>
  <div class="search-outer row m-0 justify-content-center">
    <div class="Search-page px-3 py-2 mt-5 col-lg-6 col-md-8 col-12">

      <!-- Search bar -->
      <div
        class="
          search-box
          p-3
          position-fixed
          w-100
          row
          m-0
          justify-content-center
        "
      >
        <div class="w-100 row m-0 justify-content-center m-0 mb-2">
          <label class="col-lg-6 col-md-8 col-12 p-0 m-0" for="search"
            >Search</label
          >
        </div>
        <div
          class="
            row
            m-0
            align-items-center
            shadow
            rounded-pill
            p-2
            col-lg-6 col-md-8 col-12
          "
        >
          <img class="col-2 p-0 icon" src="../assets/search.png" alt="" />
          <div class="col-10 p-0">
            <input
              id="search"
              class="form-control p-0 px-2 shadow-none"
              placeholder="Search user"
              v-model="searchValue"
              type="text"
            />
          </div>
        </div>
      </div>

      <!-- Search bar -->

      <!-- error -->
      <div v-if="error" class="error my-5 py-5">
        <h4>Opps!!</h4>
        <p>Something went wrong</p>
        <small>Please try again</small>
      </div>

      <!-- empty state -->
      <div
        v-if="!searchValue"
        class="w-100 d-flex justify-content-center mt-5 p-5"
      >
        <img
          class="background-logo my-5 p-5"
          src="../assets/github.png"
          alt=""
        />
      </div>

      <!-- Loader -->
      <div v-if="!error && !searchResults && searchValue" class="my-5 py-5">
        <Loader class="my-5 py-5" />
      </div>

      <!-- Search results -->
      <div v-else class="my-5 py-5">
        <div class="my-3" v-for="user in searchResults" :key="user.id">
          <router-link :to="'/profile/' + user.login">
            <img
              class="rounded-circle profile-img shadow"
              :src="user.avatar_url"
              alt=""
            />
            <small class="mx-2">{{ user.login }}</small>
          </router-link>
        </div>
      </div>
      <!-- search results -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";

export default {
  name: "Search",
  components: {
    Loader,
  },
  data() {
    return {
      searchValue: null,
      searchResults: null,
      error: 0,
    };
  },
  watch: {
    searchValue() {
      if (this.searchValue) {
        this.search();
      } else {
        this.searchResults = null;
      }
    },
  },
  methods: {
    search() {
      this.error = 0;
      let value = this.searchValue.split(" ").join("");
      axios
        .get("https://api.github.com/search/users?q=" + value + "&per_page=40")
        .then((response) => {
          this.searchResults = response.data.items;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.searchResults = null;
        });
    },
  },
};
</script>

<style scoped>
.search-box {
  top: 2.7em;
  left: 0;
  background-color: #fff;
  z-index: 40;
}
.icon {
  width: 1.5em;
  height: 1.5em;
}
.form-control {
  border: none;
}
input:focus {
  outline: none;
}
.profile-img {
  width: 2em;
  height: 2em;
}
.background-logo {
  opacity: 0.2;
}
</style>