<template>
  <div class="outer px-3 py-4 row m-0 justify-content-center">
    <div class="my-5 py-1 col-lg-10 col-12 p-0">
      <!-- Loader -->
      <Loader v-if="!user" />

      <div v-else class="inner w-100 row m-0">
        <!-- profile-info-box -->
        <div
          class="
            col-lg-3 col-12
            p-0
            pb-2
            profile-box
            d-flex
            align-items-center
            row
            m-0
            mb-4
            border-bottom
          "
        >
          <img
            class="
              profile-pic
              border border-light
              rounded-circle
              shadow
              p-0
              col-lg-12 col-4
            "
            :src="user.avatar_url"
            alt="Profile picture"
          />
          <div class="profile-info px-0 py-2 pb-0 col-lg-12 col-7">
            <h3 class="text-dark mt-3">{{ user.name }}</h3>
            <h5 class="text-muted">{{ user.login }}</h5>
          </div>
          <button class="col-12 py-1 my-3 btn btn-outline-dark rounded w-100">
            Follow
          </button>
          <small class="p-0">{{ user.bio }}</small>
          <!-- followers -->
          <div class="follower-box p-0 d-flex align-items-center my-3">
            <img class="icon" src="../assets/followers.png" alt="followers" />
            <small class="mx-2 m-0">
              <b>{{ user.followers }}</b> followers.
              <b>{{ user.following }}</b> following
            </small>
          </div>
          <!-- Social link -->
          <div class="p-0 social my-2">
            <div v-if="user.location" class="d-flex align-items-center">
              <img class="icon" src="../assets/pin.png" alt="Pin" />
              <span class="mx-2">{{ user.location }}</span>
            </div>
            <div v-if="user.email" class="d-flex align-items-center">
              <img class="icon" src="../assets/mail.png" alt="Pin" />
              <span class="mx-2">{{ user.email }}</span>
            </div>
            <div v-if="user.blog" class="d-flex align-items-center">
              <img class="icon" src="../assets/link.png" alt="Pin" />
              <span class="mx-2">{{ user.blog }}</span>
            </div>
            <div v-if="user.blog" class="d-flex align-items-center">
              <img class="icon" src="../assets/twitter.png" alt="Pin" />
              <span class="mx-2">{{ user.twitter_username }}</span>
            </div>
          </div>
        </div>
        <!-- profile-info box -->

        <!-- repos -->
        <div class="col-lg-9 col-12 p-0">
            <Repos :user="user.login" />
        </div>
        <!-- repos -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import Repos from "@/components/Repos.vue"
 
export default {
  name: "Profile",
  components: {
    Loader,
    Repos
  },
  data() {
    return {
      user: null,
      error: 0,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      let user = this.$route.params.username;
      this.error = 0;
      axios
        .get("https://api.github.com/users/" + user)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.error = 1;
          this.user = null;
        });
    },
  },
};
</script>

<style scoped>
.profile-box {
  display: flex;
}
.profile-pic {
  width: 7em;
  margin-right: 1em;
}
.profile-info {
  display: inline-block;
  padding: 0 1em;
}
.icon {
  width: 1.2em;
}
@media only screen and (min-width: 600px) {
  .profile-box {
    display: block !important;
  }
  .profile-pic {
    width: 100%;
  }
  .profile-info {
    display: block;
  }
}
</style>