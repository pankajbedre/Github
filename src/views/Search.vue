<template>
  <div class="Search-page">
    <input v-model="searchValue" type="text" />
    <div class="mt-5">
        <div  v-for="user in searchResults" :key="user.login">
            <small>{{user.login}}</small>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      searchValue: undefined,
      searchResults: null
    };
  },
  watch: {
    searchValue() {
      this.search();
    },
  },
  methods: {
    search() {
    //   let api = "https://api.github.com/search/users?q=" + this.searchValue;
    //   axios.get(api)
    //    .then(function (response) {
    //        this.results = response.data
    //     // console.log(results);
    //   });
    axios.get("https://api.github.com/search/users?q=" + this.searchValue)
      .then(response => (this.searchResults = response.data.items))
      
    },
  },
};
</script>