<template>
  <div>
    <img class="icon" src="../assets/bookmark.png" alt="" />
    <h6 class="mb-3 d-inline-block mx-1">Repositories</h6>
  </div>
  <!-- Search bar -->
  <div class="search-box w-100 row m-0">
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
          placeholder="Search Repositories"
          v-model="searchValue"
          type="text"
        />
      </div>
    </div>
  </div>
  <!-- Search bar -->

  <!-- Search results -->
  <div
    v-if="searchResults"
    class="search-results position-absolute p-3 bg-white shadow rounded mt-4"
  >
    <Loader v-if="!searchResults && searchValue" />
    <div class="mb-3" v-for="search in searchResults" :key="search.id">
      <a :href="search.html_url">
        <p class="m-0">{{ search.name }}</p>
        <small class="text-muted">{{search.description}}</small>
      </a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
export default {
  name: "RepoSearch",
  props: ["user"],
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
        .get(
          "https://api.github.com/search/repositories?q=" +
            value +
            "user:" +
            this.user
        )
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
.search-results {
  min-width: 80%;
}
@media only screen and (min-width: 600px) {
  .search-results {
    min-width: 50%;
  }
}
</style>