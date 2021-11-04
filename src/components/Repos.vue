<template>
  <div class="repo-outer-box">
    <Search :user="user" />

    <!-- user repos -->
    <div class="repos mt-4">
      <Loader v-if="!repos" />
      <div class="repo my-3 border-bottom py-2" v-for="repo in repos" :key="repo.id">
        <a :href="repo.html_url"
          ><h5 class="d-inline-block mb-2">{{ repo.name }}</h5>
          <small class="px-3 border mx-3 rounded-pill" v-if="!repo.private">Public</small>
          <small class="px-3 border mx-3 rounded-pill" v-else>Private</small>
        </a>
        <p class="mb-2">{{ repo.description }}</p>
        <small><div class="dot d-inline-block rounded-circle"></div><span class="mx-2">{{repo.language}}</span></small>
      </div>
    </div>
    <button v-if="!all" class="btn btn-outline-dark rounded-pill btn-block" @click="getRepos(1000); all=1">View All</button>
    <!-- user repos -->
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Search from "@/components/RepoSearch.vue"
export default {
  name: "Repos",
  props: ["user"],
  components: {
    Loader,
    Search
  },
  data() {
    return {
      repos: null,
      all: 0
    };
  },
  created() {
    this.getRepos(5);
  },
  methods: {
    getRepos(no) {
      this.error = 0;
      axios
        .get("https://api.github.com/users/" + this.user + "/repos?per_page=" + no)
        .then((response) => {
          this.repos = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.repos = null;
        });
    },
  },
};
</script>

<style scoped>
.dot {
    width: .7em;
    height: .7em;
    background-color: #262626;
}
@media only screen and (min-width: 600px) {
  .repo-outer-box {
    padding: 0 4em;
  }
}
</style>